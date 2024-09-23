import pool from "../../db/connectDB.js";

async function getPatientsCountQuery() {
  try {
    const [result] = await pool.execute(
      `select count(*) as count from patients;`
    );
    return result[0];
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

export { getPatientsCountQuery };
