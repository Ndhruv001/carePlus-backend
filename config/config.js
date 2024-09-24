import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 8000,
  apiVersion: process.env.API_VERSION || "v1",
  baseURL: process.env.BASE_URL || "/api",
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  bcryptSaltRound: process.env.BCRYPT_SALT_ROUND,
  jwtAccessTokenSecretKey: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtAccessTokenSecretKeyExpiry: process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRY,
  jwtRefreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwtRefreshTokenSecretKeyExpiry: process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRY,
  cloudinaryName: process.env.CLOUDINARY_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  geminiApiKey: process.env.GEMINI_API_KEY,
};

export default config;
