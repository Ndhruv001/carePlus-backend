import {
  getNotificationsListQuery,
  markNotificationAsReadQuery,
} from "../../queries/admin/notificationQueries.js";
import { formatDateForClient } from "../../utils/formatDateAndTime.js";

async function getNotificationsList(req, res) {
  const { id, type } = req.user;

  try {
    const response = await getNotificationsListQuery({ id, type });

    const formatedNotifications = response.map((notification) => ({
      ...notification,
      date: formatDateForClient(notification.date),
    }));
    return res.status(200).json({ success: true, data: formatedNotifications });
  } catch (error) {
    console.log("🚀 ~ getNotificationsList ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errors: error,
    });
  }
}

async function markNotificationAsRead(req, res) {
  const { notificationId } = req.body;
  try {
    await markNotificationAsReadQuery({ notificationId });
    return res
      .status(201)
      .json({
        success: true,
        message: "Notification mark as read successfully",
      });
  } catch (error) {
    console.log("🚀 ~ markNotificationAsRead ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errors: error,
    });
  }
}

export { getNotificationsList, markNotificationAsRead };
