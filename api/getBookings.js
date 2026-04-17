import dbConnection from "../helpers/dbConnection.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed ..." });
  }
  try {
    const connection = await dbConnection();
    const fetchQuery = `SELECT * FROM bookings ORDER BY RAND()`;
    let [results] = await connection.query(fetchQuery);
    if (!results.length)
      return res.status(404).json({ message: "Found No Bookings ..." });
    results = results.map((property) => {
      return {
        ...property,
        images: JSON.parse(property.images || "[]"),
        amenities: JSON.parse(property.amenities || "[]"),
        jp_amenities: JSON.parse(property.jp_amenities || "[]"),
        available: Boolean(property.available),
        village_distance: Number(property.village_distance),
      };
    });
    return res.status(200).json({ results });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
