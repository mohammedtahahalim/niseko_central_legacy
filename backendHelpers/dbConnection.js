import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export default async function dbConnection() {
  return mysql.createPool({
    host: process.env.HOST,
    database: process.env.NAME,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASS,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}
