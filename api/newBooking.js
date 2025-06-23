import blurrifyImages from "../backendHelpers/blurrifyImages.js";
import useTranslate from "../backendHelpers/useTranslate.js";
import dbConnection from "../backendHelpers/dbConnection.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  for (let key in req.body) {
    if (!req.body[key] && key !== "view") {
      return res.status(401).json({ message: "Bad request" });
    }
  }
  const {
    lang,
    title,
    category,
    type_one,
    type_two,
    floorSize,
    lifts,
    villageDistance,
    view,
    rawImages,
    maxPax,
    amenities,
    desc,
    pricePerNight,
  } = req.body;

  try {
    const connection = await dbConnection();

    if (!connection) {
      return res.status(500).json({ message: "Internal server error ..." });
    }

    const images = JSON.stringify(await blurrifyImages(rawImages));

    const en_title =
      lang === "en" ? title : await useTranslate(title, "ja", "en-US");
    const en_category =
      lang === "en" ? category : await useTranslate(category, "ja", "en-US");
    const en_type_one =
      lang === "en" ? type_one : await useTranslate(type_one, "ja", "en-US");
    const en_type_two =
      lang === "en" ? type_two : await useTranslate(type_two, "ja", "en-US");
    const en_desc =
      lang === "en" ? desc : await useTranslate(desc, "ja", "en-US");
    const en_amenities =
      lang === "en"
        ? amenities
        : await useTranslate(amenities.join(","), "ja", "en-US");
    const en_view =
      lang === "en" ? view : await useTranslate(view, "ja", "en-US");
    const jp_title =
      lang === "jp" ? title : await useTranslate(title, "en", "ja");
    const jp_category =
      lang === "jp" ? category : await useTranslate(category, "en", "ja");
    const jp_type_one =
      lang === "jp" ? type_one : await useTranslate(type_one, "en", "ja");
    const jp_type_two =
      lang === "jp" ? type_two : await useTranslate(type_two, "en", "ja");
    const jp_desc = lang === "jp" ? desc : await useTranslate(desc, "en", "ja");
    const jp_amenities =
      lang === "jp"
        ? amenities
        : await useTranslate(amenities.join(","), "en", "ja");
    const jp_view = lang === "jp" ? view : await useTranslate(view, "en", "ja");

    const insertQuery = `INSERT INTO bookings (en_title, jp_title, en_category, jp_category, en_type_one, jp_type_one, en_type_two, jp_type_two, floor_size, lifts, village_distance, view, images, max_pax, amenities, short_desc, price_per_night, jp_view, jp_short_desc, jp_amenities) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const results = await connection.query(insertQuery, [
      en_title,
      jp_title,
      en_category,
      jp_category,
      en_type_one,
      jp_type_one,
      en_type_two,
      jp_type_two,
      floorSize,
      lifts,
      villageDistance,
      en_view,
      images,
      maxPax,
      JSON.stringify(en_amenities),
      en_desc,
      pricePerNight,
      jp_view,
      jp_desc,
      JSON.stringify(jp_amenities),
    ]);
    if (!results[0]) {
      return res.status(406).json({ message: "Failed to create booking" });
    }
    return res.status(201).json({ message: "Booking created" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Failed to add article, Try again later" });
  }
}
