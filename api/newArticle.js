import useTranslate from "../backendHelpers/useTranslate.js";
import dbConnection from "../backendHelpers/dbConnection.js";

import createDOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed ..." });
  }

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ message: "Bad Format ..." });
  }

  const { title, category, content, bannerIMG, lang } = req.body;
  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    typeof category !== "string" ||
    category.trim() === "" ||
    typeof content !== "string" ||
    content.trim() === "" ||
    typeof bannerIMG !== "string" ||
    bannerIMG.trim() === "" ||
    (lang !== "en" && lang !== "jp")
  ) {
    return res.status(400).json({ message: "Missing Fields In Request ..." });
  }

  const date = new Date().toLocaleDateString();

  try {
    const connection = await dbConnection();

    const en_title =
      lang === "en" ? title : await useTranslate(title, "ja", "en-US");
    const en_category =
      lang === "en" ? category : await useTranslate(category, "ja", "en-US");
    const en_content =
      lang === "en" ? content : await useTranslate(content, "ja", "en-US");
    const jp_title =
      lang === "jp" ? title : await useTranslate(title, "en-US", "ja");
    const jp_category =
      lang === "jp" ? category : await useTranslate(category, "en-US", "ja");
    const jp_content =
      lang === "jp" ? content : await useTranslate(content, "en-US", "ja");

    const checkQuery = `SELECT * FROM articles WHERE en_title = ?`;
    const duplicates = await connection.query(checkQuery, [en_title]);
    console.log(duplicates);
    if (duplicates[0].length > 0) {
      return res.status(409).json({ message: "Article Already Exists ..." });
    }

    const INSERQuery = `INSERT INTO articles (en_title, en_category, en_content, banner_img, date, jp_title, jp_category, jp_content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [results] = await connection.query(INSERQuery, [
      en_title,
      en_category,
      DOMPurify.sanitize(en_content),
      bannerIMG,
      date,
      jp_title,
      jp_category,
      DOMPurify.sanitize(jp_content),
    ]);
    if (results.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to insert article ..." });
    }

    return res.status(200).json({ message: "Successfuly Added Article ..." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
