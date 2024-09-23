import {
  getApprovalListQuery,
  approveRegistrationQuery,
  rejectRegistrationQuery,
} from "../../queries/admin/managementQueries.js";

async function getApprovalList(_, res) {
  try {
    const response = await getApprovalListQuery();
    return res.status(200).json({
      success: true,
      data: response,
      message: "Get approval list successfully!",
    });
  } catch (error) {
    console.log("🚀 ~ getApprovalList ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

async function approveRegistration(req, res) {
  const { registrationId } = req.body;
  try {
    await approveRegistrationQuery({ registrationId });
    return res
      .status(200)
      .json({ success: true, message: "Approve registration successfully!" });
  } catch (error) {
    console.log("🚀 ~ approveRegistration ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

async function rejectRegistration(req, res) {
  const { registrationId } = req.body;
  try {
    await rejectRegistrationQuery({ registrationId });
    return res.status(200).json({
      success: true,
      message: "Reject registration successfully!",
    });
  } catch (error) {
    console.log("🚀 ~ rejectRegistration ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

export { getApprovalList, approveRegistration, rejectRegistration };
