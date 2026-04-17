import dbConnection from "../helpers/dbConnection.js";
import { serialize } from "cookie";
import { z } from "zod";
import createDOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const bodySchema = z.object({
  email: z
    .string()
    .regex(
      /^(?!.*\.\.)(?!.*__)(?!.*--)(?![._-])[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
    ),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_.,@?-])[a-zA-Z0-9!_.,@?-]{4,50}$/,
    ),
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  let { email, password } = req.body;
  email = DOMPurify.sanitize(email);
  password = DOMPurify.sanitize(password);
  if (!bodySchema.safeParse({ email, password }).success) {
    return res.status(400).json({ message: "Bad request" });
  }
  try {
    const connection = await dbConnection();
    const fetchQuery = `SELECT hashed_password, first_name FROM accounts WHERE email = ? LIMIT 1`;
    const [hashed_password] = await connection.query(fetchQuery, [email]);
    if (!hashed_password.length) {
      return res.status(401).json({ message: "Bad Credentials" });
    }

    const match = bcrypt.compare(password, hashed_password[0].hashed_password);
    if (!match) {
      return res.status(401).json({ message: "Bad Credentials" });
    }
    const token = jwt.sign(
      { email, firstName: hashed_password[0].first_name },
      process.env.SECRET_KEY,
      {
        expiresIn: "3h",
      },
    );
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 3,
    });
    res.setHeader("Set-Cookie", cookie);
    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
