import { refreshAccessToken, verifyAccessToken } from "../../utils/jwt.js";
import httpOnlyOptions from "../../utils/httpOnlyOptions.js";

function verifyJWT(type) {
  return (req, res, next) => {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token not found" });
    }

    const decodedToken = verifyAccessToken(token);

    if (decodedToken.valid) {
      if (type !== "user" && decodedToken.response.type !== type) {
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized access" });
      }

      req.user = decodedToken.response;
      return next();
    }

    if (decodedToken.expired) {
      const refreshToken =
        req.cookies.refreshToken || req.headers.authorization?.split(" ")[2];

      if (!refreshToken) {
        return res
          .status(401)
          .json({ success: false, message: "Refresh token not found" });
      }

      const refreshResult = refreshAccessToken(refreshToken);

      if (!refreshResult.success) {
        return res
          .status(401)
          .json({ success: false, message: refreshResult.message });
      }

      const accessToken = verifyAccessToken(refreshResult.accessToken);

      if (type !== "user" && accessToken.response.type !== type) {
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized access" });
      }

      res.cookie("accessToken", refreshResult.accessToken, httpOnlyOptions);
      req.user = accessToken.response;
      return next();
    }

    return res.status(403).json({ success: false, message: "Invalid token" });
  };
}

export { verifyJWT };
