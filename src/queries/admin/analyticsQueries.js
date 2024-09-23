import pool from "../../db/connectDB.js";

async function getRegistrationsCountQuery({ userType, timeHorizon }) {
  let table = userType === "doctor" ? "doctors" : "patients";
  let query = "";

  // Handle time horizons
  if (timeHorizon === "daily") {
    query = `
        SELECT DATE(created_at) AS date, COUNT(*) AS count
        FROM ${table}
        WHERE created_at >= CURDATE() - INTERVAL 1 MONTH
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at) DESC;
      `;
  } else if (timeHorizon === "monthly") {
    query = `
        SELECT DATE_FORMAT(created_at, '%Y-%m') AS date, COUNT(*) AS count
        FROM ${table}
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
        GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ORDER BY DATE_FORMAT(created_at, '%Y-%m') DESC;
      `;
  } else if (timeHorizon === "yearly") {
    query = `
        SELECT YEAR(created_at) AS date, COUNT(*) AS count
        FROM ${table}
        GROUP BY YEAR(created_at)
        ORDER BY YEAR(created_at) DESC;
      `;
  }

  try {
    const [rows] = await pool.execute(query);
    return rows;
  } catch (error) {
    throw new Error("Database query error: " + error.message);
  }
}

export { getRegistrationsCountQuery };
