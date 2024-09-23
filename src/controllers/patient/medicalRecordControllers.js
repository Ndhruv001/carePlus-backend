import { getMedicalRecordsListQuery } from "../../queries/patient/medicalRecordQueries.js";
import { formatDateForClient } from "../../utils/formatDateAndTime.js";

async function getMedicalRecordsList(req, res) {
  const { id } = req.user;

  try {
    const response = await getMedicalRecordsListQuery({ id });

    const formattedMedicalRecords = response.map((medicalRecord) => ({
      ...medicalRecord,
      date: formatDateForClient(medicalRecord.date),
    }));
    return res
      .status(200)
      .json({ success: true, data: formattedMedicalRecords });
  } catch (error) {
    console.log("🚀 ~ getMedicalRecordsList ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errors: error,
    });
  }
}

export { getMedicalRecordsList };
