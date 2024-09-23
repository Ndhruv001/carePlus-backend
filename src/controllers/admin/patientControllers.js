import { getPatientsCountQuery } from "../../queries/admin/patientQueries.js";

async function getPatientsCount(_, res) {
  try {
    const response = await getPatientsCountQuery();

    return res
      .status(200)
      .json({
        success: true,
        data: response,
        message: "Get total patient count successfully!",
      });
  } catch (error) {
    console.log("🚀 ~ getPatientsCount ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

export { getPatientsCount };
