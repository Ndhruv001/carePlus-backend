import {
  getDoctorsCountQuery,
  getPopularDoctorsListQuery,
  getDoctorProfileQuery,
} from "../../queries/admin/doctorQueries.js";
import { calculateAge } from "../../utils/formatDateAndTime.js";

async function getDoctorsCount(_, res) {
  try {
    const response = await getDoctorsCountQuery();

    return res
      .status(200)
      .json({
        success: true,
        data: response,
        message: "Get total doctors count successfully!",
      });
  } catch (error) {
    console.log("🚀 ~ getDoctorsCount ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

async function getPopularDoctorsList(req, res) {
  const limit = req.query.limit;
  try {
    const response = await getPopularDoctorsListQuery({ limit });

    return res
      .status(200)
      .json({
        success: true,
        data: response,
        message: "Get popular doctors successfully!",
      });
  } catch (error) {
    console.log("🚀 ~ getPopularDoctorsList ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

async function getDoctorProfile(req, res) {
  const { doctorId } = req.params;
  try {
    const response = await getDoctorProfileQuery({ doctorId });
    const formatedResponse = {
      ...response,
      age: calculateAge(response?.age),
    };

    return res.status(200).json({ success: true, data: formatedResponse });
  } catch (error) {
    console.log("🚀 ~ getDoctorProfile ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

export { getDoctorsCount, getPopularDoctorsList, getDoctorProfile };
