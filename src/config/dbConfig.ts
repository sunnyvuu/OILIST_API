import pg from "pg";
const { Pool } = pg;

import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: "localhost",
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  max: 20,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000,
});
