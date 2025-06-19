import { z } from "zod";
import createDOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";
import useTranslate from "../backendHelpers/useTranslate.js";
import dbConnection from "../backendHelpers/dbConnection.js";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const articleSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  content: z.string().min(1),
  bannerIMG: z.string().min(1),
  lang: z.enum(["en", "jp"]),
});

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const parse = articleSchema.safeParse(req.body);
  if (!parse.success)
    return res
      .status(400)
      .json({ error: parse.error.errors.map((e) => e.message) });
  try {
    const { title, category, content, bannerIMG, lang } = parse.data;

    const cleanContent = DOMPurify.sanitize(content);

    const [
      en_title,
      en_category,
      en_content,
      jp_title,
      jp_category,
      jp_content,
    ] = await Promise.all([
      lang === "en" ? title : useTranslate(title, "ja", "en-US"),
      lang === "en" ? category : useTranslate(category, "ja", "en-US"),
      lang === "en" ? cleanContent : useTranslate(cleanContent, "ja", "en-US"),
      lang === "jp" ? title : useTranslate(title, "en", "ja"),
      lang === "jp" ? category : useTranslate(category, "en", "ja"),
      lang === "jp" ? cleanContent : useTranslate(cleanContent, "en", "ja"),
    ]);

    const date = new Date().toLocaleDateString();

    const connection = await dbConnection();
    const results = await connection.query(
      "INSERT INTO articles (en_title, en_category, en_content, jp_title, jp_category, jp_content, banner_img, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        en_title,
        en_category,
        en_content,
        jp_title,
        jp_category,
        jp_content,
        bannerIMG,
        date,
      ]
    );

    if (!results[0]) {
      return res.status(406).json({ message: "Failed to create article" });
    }

    res.status(201).json({ message: "Article created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
