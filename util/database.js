import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const db = pool.promise();

async function initDB() {
  try {
    // =========================================================================

    await db.query(
      `CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo TEXT NOT NULL, 
    completed BOOLEAN DEFAULT FALSE )`
    );

    console.log("Table ready");
  } catch (err) {
    console.error("Error initializing DB:", err);
    throw err;
  }
}

export { db, initDB };
