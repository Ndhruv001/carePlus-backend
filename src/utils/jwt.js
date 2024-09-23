import jwt from "jsonwebtoken";
import config from "../../config/config.js";

function generateAccessToken(payload) {
  const options = { expiresIn: config.jwtAccessTokenSecretKeyExpiry };
  return jwt.sign(payload, config.jwtAccessTokenSecretKey, options);
}

function verifyAccessToken(token) {
  try {
    const response = jwt.verify(token, config.jwtAccessTokenSecretKey);
    return { valid: true, response: response };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return { valid: false, expired: true };
    } else {
      return { valid: false, expired: false };
    }
  }
}

function generateRefreshToken(payload) {
  const options = { expiresIn: config.jwtRefreshTokenSecretKeyExpiry };
  return jwt.sign(payload, config.jwtRefreshTokenSecretKey, options);
}

function verifyRefreshToken(token) {
  try {
    const response = jwt.verify(token, config.jwtRefreshTokenSecretKey);
    return { valid: true, response: response };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return { valid: false, expired: true };
    }
    return { valid: false, expired: false };
  }
}

function refreshAccessToken(refreshToken) {
  const decodedRefreshToken = verifyRefreshToken(refreshToken);

  if (decodedRefreshToken.valid) {
    const newAccessToken = generateAccessToken({
      id: decodedRefreshToken.id,
      type: decodedRefreshToken.type,
    });
    return { success: true, accessToken: newAccessToken };
  } else if (decodedRefreshToken.expired) {
    return { success: false, message: "Refresh token expired" };
  } else {
    return { success: false, message: "Invalid refresh token" };
  }
}

export {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  refreshAccessToken,
};
