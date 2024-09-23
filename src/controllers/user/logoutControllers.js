import httpOnlyOptions from "../../utils/httpOnlyOptions.js";

function logout(_, res) {
  try {
    res.clearCookie("accessToken", httpOnlyOptions);
    res.clearCookie("refreshToken", httpOnlyOptions);

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Logout failed", error: error.message });
  }
}

export { logout };
