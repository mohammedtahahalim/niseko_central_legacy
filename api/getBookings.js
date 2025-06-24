import dbConnection from "../backendHelpers/dbConnection.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed ..." });
  }
  try {
    const connection = await dbConnection();
    const fetchQuery = `SELECT * FROM bookings ORDER BY RAND()`;
    const results = await connection.query(fetchQuery);
    if (!results[0])
      return res.status(404).json({ message: "Found No Bookings ..." });
    return res.status(200).json({ bookings: results[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
