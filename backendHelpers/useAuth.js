import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { parse } from "cookie";

dotenv.config();

export default function useAuth(req) {
  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.token || "";
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyToken) throw new Error("Token mismatch");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
