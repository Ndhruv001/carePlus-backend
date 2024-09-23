import {
  getMedicalRecordsListQuery,
  getMedicalRecordsListByPatientIdQuery,
  addMedicalRecordQuery,
} from "../../queries/doctor/medicalRecordQueries.js";
import { formatDateForClient } from "../../utils/formatDateAndTime.js";

async function getMedicalRecordsList(req, res) {
  const { id } = req.user;
  try {
    const response = await getMedicalRecordsListQuery({ id });
    const formatedResponse = response.map((record) => {
      return {
        ...record,
        last_visit: formatDateForClient(record.last_visit),
      };
    });

    return res.status(200).json({ success: true, data: formatedResponse });
  } catch (error) {
    console.log("🚀 ~ getMedicalRecordsList ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
      errors: error,
    });
  }
}
async function getMedicalRecordsListByPatientId(req, res) {
  const { patientId } = req.params;
  const { id } = req.user;
  try {
    const response = await getMedicalRecordsListByPatientIdQuery({
      doctor_id: id,
      patient_id: patientId,
    });
    const formatedResponse = response.map((record) => {
      return {
        ...record,
        date: formatDateForClient(record.date),
      };
    });

    return res.status(200).json({ success: true, data: formatedResponse });
  } catch (error) {
    console.log("🚀 ~ getMedicalRecordsListByPatientId ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
      errors: error,
    });
  }
}

async function addMedicalRecord(req, res) {
  const {
    appointment_id,
    patient_id,
    medication_name,
    dosage,
    medical_record,
  } = req.body;
  const { id } = req.user;

  try {
    await addMedicalRecordQuery({
      appointment_id,
      patient_id,
      medication_name,
      dosage,
      medical_record,
      doctor_id: id,
    });
    return res
      .status(201)
      .json({ success: true, message: "Add medical record successfully." });
  } catch (error) {
    console.log("🚀 ~ addMedicalRecord ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

export {
  getMedicalRecordsList,
  getMedicalRecordsListByPatientId,
  addMedicalRecord,
};
