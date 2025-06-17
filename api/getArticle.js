import getDBConnection from "../api/helpers/getDBConnection.js";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(401).json({ message: "Method Not Allowed" });
  }
  const { title } = req.query;

  const getArticleQuery = `SELECT * FROM articles WHERE en_title = ?`;
  const dbConnection = await getDBConnection();

  const results = await dbConnection.query(getArticleQuery, [title]);
  if (results) {
    return res.status(200).json(results[0]);
  }
  return res.status(200).json({ message: "Success ..." });
}
