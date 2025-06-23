import dbConnection from "../backendHelpers/dbConnection.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(401).json({ message: "Method Not Allowed ..." });
  }
  const { k } = req.query;
  try {
    const fetchQuery = `SELECT * FROM articles ORDER BY count LIMIT ?`;
    const connection = await dbConnection();
    const results = await connection.query(fetchQuery, [Number(k)]);
    if (!results) {
      return res.status(404).json({ message: "Found No Blogs" });
    }
    return res.status(200).json({ articles: results[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
