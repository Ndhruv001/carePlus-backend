import { getPatientsListQuery } from "../../queries/doctor/patientQueries.js";
import { calculateAge } from "../../utils/formatDateAndTime.js";

async function getPatientsList(req, res) {
  const { id } = req.user;
  try {
    const response = await getPatientsListQuery({ id });
    const formatedResponse = response.map((patient) => {
      return {
        ...patient,
        patient_age: calculateAge(patient.patient_age),
      };
    });

    return res.status(200).json({ success: true, data: formatedResponse });
  } catch (error) {
    console.log("🚀 ~ getPatientsList ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
      errors: error,
    });
  }
}

export { getPatientsList };
