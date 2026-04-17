import dbConnection from "../helpers/dbConnection.js";
import { z } from "zod";

const querySchema = z.object({
  k: z.number().min(1).max(16),
  category: z.string().min(4).max(30).or(z.literal("")),
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  let { k = 6, category = "" } = req.query;
  k = Number(k);
  if (!querySchema.safeParse({ k, category }).success) {
    return res.status(403).json({ message: "Bad format" });
  }
  if (category.toLowerCase() === "mori houses") {
    category = "mori";
  }
  const fetchQuery = category
    ? `SELECT * FROM bookings WHERE en_category = ? ORDER BY RAND() LIMIT ?`
    : `SELECT * FROM bookings ORDER BY RAND() LIMIT ?`;
  try {
    const connection = await dbConnection();
    const params = category ? [category, Number(k)] : [Number(k)];
    const results = await connection.query(fetchQuery, params);
    if (!results[0]) {
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({
      suggestions: results[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
