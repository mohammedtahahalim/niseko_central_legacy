import dbConnection from "../backendHelpers/dbConnection.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(401).json({ message: "Method Not Allowed ..." });
  }
  const { title } = req.query;
  const queryTitle = decodeURIComponent(title);
  try {
    const connection = await dbConnection();
    const fetchQuery = `SELECT * FROM articles WHERE en_title = ?`;
    const results = await connection.query(fetchQuery, [queryTitle]);
    if (!results) {
      return res.status(404).json({ message: "Article Not Found ..." });
    }
    console.log(results);
    return res.status(200).json({ article: results[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
