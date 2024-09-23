import { getRegistrationsCountQuery } from "../../queries/admin/analyticsQueries.js";
import {
  extractDay,
  extractMonth,
  extractYear,
} from "../../utils/formatDateAndTime.js";

async function getRegistrationsCount(req, res) {
  const { userType, timeHorizon } = req.params;

  let formatDate = () => {};

  if (timeHorizon === "daily") formatDate = extractDay;
  else if (timeHorizon === "monthly") formatDate = extractMonth;
  else if (timeHorizon === "yearly") formatDate = extractYear;

  try {
    const response = await getRegistrationsCountQuery({
      userType,
      timeHorizon,
    });

    const formatedResponse = response.map((item) => {
      return {
        ...item,
        date: formatDate(item.date),
      };
    });
    return res.status(200).json({
      success: true,
      data: formatedResponse,
      message: "Get  appointments status count successfully!",
    });
  } catch (error) {
    console.log("🚀 ~ getRegistrationsCount ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

export { getRegistrationsCount };
