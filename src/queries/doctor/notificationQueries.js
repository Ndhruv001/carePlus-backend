import pool from "../../db/connectDB.js";

async function getNotificationsListQuery({ id, type }) {
  try {
    const [result] = await pool.execute(
      `select 
      id, 
      message, 
      title, 
      is_read, 
      created_at as date 
      from notifications 
      where recipient_id = ? and recipient_type = ?
      order by created_at DESC`,
      [id, type]
    );
    return result;
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

async function markNotificationAsReadQuery({ id }) {
  try {
    const [result] = await pool.execute(
      `UPDATE notifications
      SET is_read = TRUE
      WHERE id = ?;`,
      [id]
    );
    return result;
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

export { getNotificationsListQuery, markNotificationAsReadQuery };
