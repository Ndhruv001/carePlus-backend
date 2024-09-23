import {
  getAppointmentsListQuery,
  getAppointmentsCountQuery,
  getAppointmentsStatusCountQuery,
} from "../../queries/admin/appointmentQueries.js";
import {
  formatDateForClient,
  formatTimeForClient,
} from "../../utils/formatDateAndTime.js";

async function getAppointmentsList(_, res) {
  try {
    const response = await getAppointmentsListQuery();

    const formatedResponse = response.map((item) => {
      return {
        ...item,
        appointment_date: formatDateForClient(item.appointment_date),
        appointment_time: formatTimeForClient(item.appointment_time),
      };
    });

    return res
      .status(200)
      .json({
        success: true,
        data: formatedResponse,
        message: "Get appointments successfully!",
      });
  } catch (error) {
    console.log("🚀 ~ getAppointmentsList ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}
async function getAppointmentsCount(_, res) {
  try {
    const response = await getAppointmentsCountQuery();

    return res
      .status(200)
      .json({
        success: true,
        data: response,
        message: "Get total appointments count successfully!",
      });
  } catch (error) {
    console.log("🚀 ~ getAppointmentsCount ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}
async function getAppointmentsStatusCount(_, res) {
  try {
    const response = await getAppointmentsStatusCountQuery();

    return res
      .status(200)
      .json({
        success: true,
        data: response,
        message: "Get  appointments status count successfully!",
      });
  } catch (error) {
    console.log("🚀 ~ getAppointmentsStatusCount ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

export {
  getAppointmentsList,
  getAppointmentsCount,
  getAppointmentsStatusCount,
};
