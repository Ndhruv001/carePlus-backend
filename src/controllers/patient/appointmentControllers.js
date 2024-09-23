import {
  insertAppointment,
  getAppointmentsListQuery,
  cancelAppointmentQuery,
  rescheduleAppointmentQuery,
} from "../../queries/patient/appointmentQueries.js";
import {
  formatDateForMySQL,
  formatTimeForMySQL,
  formatDateForClient,
  formatTimeForClient,
} from "../../utils/formatDateAndTime.js";

async function bookAppointment(req, res) {
  const { doctorId, date, time, purpose } = req.body;
  const { id } = req.user;

  const formatedDate = formatDateForMySQL(date);
  const formatedTime = formatTimeForMySQL(time);

  try {
    const result = await insertAppointment({
      patient_id: id,
      doctor_id: doctorId,
      appointment_date: formatedDate,
      appointment_time: formatedTime,
      purpose,
    });

    return res
      .status(201)
      .json({ success: true, appointmentId: result.insertId });
  } catch (error) {
    console.log("🚀 ~ bookAppointment ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

async function rescheduleAppointment(req, res) {
  const { id, appointment_date, appointment_time } = req.body;

  const formatedDate = formatDateForMySQL(appointment_date);
  const formatedTime = formatTimeForMySQL(appointment_time);

  try {
    await rescheduleAppointmentQuery({
      id: id,
      appointment_date: formatedDate,
      appointment_time: formatedTime,
    });

    return res
      .status(201)
      .json({ success: true, message: "Appointment rescheduled successfully" });
  } catch (error) {
    console.log("🚀 ~ rescheduleAppointment ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

async function getAppointmentsList(req, res) {
  const { id } = req.user;
  try {
    const response = await getAppointmentsListQuery({ id });

    const formattedAppointments = response.map((appointment) => ({
      ...appointment,
      appointment_date: formatDateForClient(appointment.appointment_date),
      appointment_time: formatTimeForClient(appointment.appointment_time),
    }));

    return res.status(200).json({ success: true, data: formattedAppointments });
  } catch (error) {
    console.log("🚀 ~ getAppointmentsList ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

async function cancelAppointment(req, res) {
  const { id } = req.body;

  try {
    await cancelAppointmentQuery({ id });
    return res
      .status(200)
      .json({ success: true, message: "Cancelled appointment successfully" });
  } catch (error) {
    console.log("🚀 ~ cancelAppointment ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export {
  bookAppointment,
  getAppointmentsList,
  cancelAppointment,
  rescheduleAppointment,
};
