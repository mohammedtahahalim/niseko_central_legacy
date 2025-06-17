import getDBConnection from "./helpers/getDBConnection.js";
import useTranslate from "./helpers/useTranslate.js";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status("405").json({ message: "Method Not Allowed ..." });
  }
  const connection = await getDBConnection();
  if (!connection) {
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
  const { title, banner_IMG, category, content, lang } = req.body;
  const newArticleRequest = `INSERT INTO articles (en_title, jp_title, banner_img, en_category, jp_category, date, en_content, jp_content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const date = new Date().toDateString();

  const en_title = lang === "en" ? title : await useTranslate(title, "ja");
  const en_category =
    lang === "en" ? category : await useTranslate(category, "ja");
  const en_content =
    lang === "en" ? content : await useTranslate(content, "ja");

  const jp_title = lang === "jp" ? title : await useTranslate(title, "en");
  const jp_category =
    lang === "jp" ? category : await useTranslate(category, "en");
  const jp_content =
    lang === "jp" ? content : await useTranslate(content, "en");

  const results = await connection.query(newArticleRequest, [
    en_title,
    jp_title,
    banner_IMG,
    en_category,
    jp_category,
    date,
    en_content,
    jp_content,
  ]);
  if (!results[0]) {
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
  return res.status(200).json({ message: "Success ..." });
}
