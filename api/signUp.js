import { z } from "zod";
import createDOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";
import dbConnection from "../backendHelpers/dbConnection.js";
import bcrypt from "bcrypt";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const bodySchema = z.object({
  email: z
    .string()
    .regex(
      /^(?!.*\.\.)(?!.*__)(?!.*--)(?![._-])[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/
    ),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_.,@?-])[a-zA-Z0-9!_.,@?-]{4,50}$/
    ),
  firstName: z.string().min(1).max(40),
  lastName: z.string().min(1).max(40),
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  let { email, password, firstName, lastName } = req.body;
  email = DOMPurify.sanitize(email);
  password = DOMPurify.sanitize(password);
  firstName = DOMPurify.sanitize(firstName);
  lastName = DOMPurify.sanitize(lastName);
  if (!bodySchema.safeParse({ email, password, firstName, lastName }).success) {
    return res.status(400).json({ message: "Bad Format" });
  }

  try {
    const connection = await dbConnection();
    const hashed_password = await bcrypt.hash(password, 10);

    const fetchQuery = `SELECT * FROM accounts WHERE email = ?`;
    const [fetchResults] = await connection.query(fetchQuery, [email]);
    if (fetchResults.length) {
      return res.status(401).json({ message: "Email already exists" });
    }
    const insertQuery = `INSERT INTO accounts (email, hashed_password, first_name, last_name) VALUES (?, ?, ?, ?)`;
    const [results] = await connection.query(insertQuery, [
      email,
      hashed_password,
      firstName,
      lastName,
    ]);
    if (!results.affectedRows) {
      throw new Error("Database Query Incomplete");
    }
    return res.status(200).json({ message: "Account Created Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
