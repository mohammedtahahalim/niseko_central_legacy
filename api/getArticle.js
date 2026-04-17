import dbConnection from "../helpers/dbConnection.js";
import { z } from "zod";
import createDOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);
const titleSchema = z.string().min(5).max(255);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed ..." });
  }
  try {
    let { title } = req.query;
    if (!titleSchema.safeParse(title).success) {
      return res.status(403).json({ message: "Bad format" });
    }
    title = DOMPurify.sanitize(decodeURIComponent(title));
    const connection = await dbConnection();
    const fetchQuery = `SELECT * FROM articles WHERE en_title = ?`;
    const [results] = await connection.query(fetchQuery, [title]);
    if (!results.length) {
      return res.status(404).json({ message: "Article Not Found ..." });
    }
    return res.status(200).json({ article: results[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
