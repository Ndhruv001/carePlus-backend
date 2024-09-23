import { getDoctorProfileQuery } from "../../queries/patient/doctorQueries.js";
import { calculateAge } from "../../utils/formatDateAndTime.js";

async function getDoctorProfile(req, res) {
  const { doctorId } = req.params;
  try {
    const response = await getDoctorProfileQuery({ doctorId });
    const formatedResponse = {
      ...response,
      age: calculateAge(response.age),
    };

    return res.status(200).json({ success: true, data: formatedResponse });
  } catch (error) {
    console.log("🚀 ~ getDoctorProfile ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

export { getDoctorProfile };
