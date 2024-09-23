import { getPerscriptionsListQuery } from "../../queries/patient/prescriptionQueries.js";

async function getPerscriptionsList(req, res) {
  const { id } = req.user;

  try {
    const response = await getPerscriptionsListQuery({ id });
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log("🚀 ~ getPerscriptionsList ~ error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        errors: error,
      });
  }
}

export { getPerscriptionsList };
