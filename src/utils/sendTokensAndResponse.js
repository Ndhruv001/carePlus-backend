import { generateAccessToken, generateRefreshToken } from "./jwt.js";
import httpOnlyOptions from "./httpOnlyOptions.js";

function sendTokensAndResponse(res, user, userType) {
  const accessToken = generateAccessToken({ id: user.id, type: userType });
  const refreshToken = generateRefreshToken({ id: user.id, type: userType });

  return res
    .status(200)
    .cookie("accessToken", accessToken, { ...httpOnlyOptions, maxAge: 24 * 60 * 60 * 1000 })
    .cookie("refreshToken", refreshToken, { ...httpOnlyOptions, maxAge: 30 * 24 * 60 * 60 * 1000 })
    .json({
      success: true,
      data: userType,
      message: "User login successfully",
    });
}

export default sendTokensAndResponse;
