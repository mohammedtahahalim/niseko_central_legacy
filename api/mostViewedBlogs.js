import dbConnection from "../backendHelpers/dbConnection.js";
import blurrifyImages from "../backendHelpers/blurrifyImages.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed ..." });
  }
  const { k } = req.query;
  try {
    const fetchQuery = `SELECT * FROM articles ORDER BY count LIMIT ?`;
    const connection = await dbConnection();
    const results = await connection.query(fetchQuery, [Number(k)]);
    if (!results) {
      return res.status(404).json({ message: "Found No Blogs" });
    }
    const articles = await Promise.all(
      results[0].map(async (eleme) => {
        return {
          ...eleme,
          banner_img: {
            image: eleme.banner_img,
            blur: (await blurrifyImages([eleme.banner_img]))[0].blur,
          },
        };
      })
    );
    return res.status(200).json({ articles });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}
