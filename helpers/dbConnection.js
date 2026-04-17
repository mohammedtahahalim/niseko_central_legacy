import mysql from "mysql2/promise";
import dotenv from "../config/dotenv.js";

let pool;

export default async function dbConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.HOST,
      database: process.env.NAME,
      port: process.env.PORT,
      user: process.env.DB_USER,
      password: process.env.PASS,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}
