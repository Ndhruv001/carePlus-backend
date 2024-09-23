import pool from "../../db/connectDB.js";

async function insertUserQuery({ name, email, message }) {
  try {
    const [result] = await pool.execute(
      `INSERT INTO user_queries (name, email, message) VALUES (?, ?, ?)`,
      [name, email, message]
    );

    return result;
  } catch (error) {
    throw new Error(`Database Error: ${error.message}`);
  }
}

export { insertUserQuery };
