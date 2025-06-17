import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export default async function getDBConnection() {
  const dbConnection = await mysql.createConnection({
    host: process.env.HOST,
    database: process.env.NAME,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASS,
  });
  return dbConnection;
}
