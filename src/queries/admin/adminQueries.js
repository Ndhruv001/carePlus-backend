import pool from "../../db/connectDB.js";

async function findAdminByEmail(email) {
  try {
    const [result] = await pool.execute(
      `
        select * from admin where email = ?
      `,
      [email]
    );
    return result[0];
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

async function addNewAdminQuery({ name, email, password }) {
  try {
    await pool.execute(
      `
        INSERT INTO admin (name, email, password)
        VALUES (?, ?, ?)
      `,
      [name, email, password]
    );
    return;
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

export { addNewAdminQuery, findAdminByEmail };
