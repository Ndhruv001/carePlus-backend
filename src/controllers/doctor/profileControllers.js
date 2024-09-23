import { getProfileQuery } from "../../queries/doctor/profileQueries.js";
import { calculateAge } from "../../utils/formatDateAndTime.js";

async function getProfile(req, res) {
  const { id } = req.user;

  try {
    const response = await getProfileQuery({ id });
    const formatedResponse = {
      ...response,
      age: calculateAge(response.age),
    };

    return res.status(200).json({ success: true, data: formatedResponse });
  } catch (error) {
    console.log("🚀 ~ getProfile ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

export { getProfile };
