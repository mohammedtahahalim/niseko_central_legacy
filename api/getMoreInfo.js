import dbConnection from "../backendHelpers/dbConnection.js";
import { z } from "zod";
import createDOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const titleSchema = z.string().min(4).max(30);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(403).json({ message: "Method not allowed" });
  }
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Missing title parameter" });
    }

    const cleanTitle = DOMPurify.sanitize(title);
    if (!titleSchema.safeParse(cleanTitle).success) {
      return res.status(401).json({ message: "Bad format" });
    }

    const connection = await dbConnection();
    const fetchQuery = `SELECT * FROM locations WHERE en_title = ? LIMIT 1`;

    const results = await connection.query(fetchQuery, [
      cleanTitle.split("-").join(" "),
    ]);
    if (!results[0].length) {
      return res
        .status(404)
        .json({ message: "Property Not found, Redirect client" });
    }

    return res.status(200).json({
      property: {
        en: {
          title: results[0][0].en_title,
          description: results[0][0].en_description,
          feedbacks: JSON.parse(results[0][0].en_feedbacks),
        },
        jp: {
          title: results[0][0].jp_title,
          description: results[0][0].jp_description,
          feedbacks: JSON.parse(results[0][0].jp_feedbacks),
        },
        banner_img: results[0][0].banner_img,
        location: JSON.parse(results[0][0].location),
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
