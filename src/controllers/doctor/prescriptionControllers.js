import {
  getPrescriptionsListQuery,
  markPrescriptionAsCompleteQuery,
  addPrescriptionQuery,
  editPrescriptionQuery,
} from "../../queries/doctor/prescriptionQueries.js";

async function getPrescriptionsList(req, res) {
  const { id } = req.user;
  try {
    const response = await getPrescriptionsListQuery({ id });
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log("🚀 ~ getPrescriptionsList ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
      errors: error,
    });
  }
}

async function markPrescriptionAsComplete(req, res) {
  const { id } = req.body;
  try {
    await markPrescriptionAsCompleteQuery({ id });
    return res
      .status(201)
      .json({
        success: true,
        message: "Mark as complete prescription successfully.",
      });
  } catch (error) {
    console.log("🚀 ~ markPrescriptionAsComplete ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

async function addPrescription(req, res) {
  const { patient_id, medication_name, dosage } = req.body;
  const { id } = req.user;
  try {
    await addPrescriptionQuery({
      doctor_id: id,
      patient_id,
      medication_name,
      dosage,
    });
    return res
      .status(201)
      .json({ success: true, message: "Added prescription successfully." });
  } catch (error) {
    console.log("🚀 ~ addPrescription ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

async function editPrescription(req, res) {
  const { id, medication_name, dosage } = req.body;

  try {
    await editPrescriptionQuery({ id, medication_name, dosage });
    return res
      .status(200)
      .json({ success: true, message: "Edit prescription successfully" });
  } catch (error) {
    console.log("🚀 ~ editPrescription ~ error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        errors: error,
      });
  }
}

export {
  getPrescriptionsList,
  markPrescriptionAsComplete,
  addPrescription,
  editPrescription,
};
