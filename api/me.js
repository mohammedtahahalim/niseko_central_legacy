import { parse } from "cookie";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    if (!verify) {
      return res.status(401).json({ message: "Not authorized" });
    }
    return res.status(200).json({ user: verify.firstName });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
