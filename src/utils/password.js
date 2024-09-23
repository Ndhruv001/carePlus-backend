import config from "../../config/config.js";
import bcrypt from "bcrypt";

async function encryptPassword(password) {
  try {
    const hashPassword = bcrypt.hash(password, +config.bcryptSaltRound);
    return hashPassword;
  } catch (error) {
    console.log("Error while encryption of password ", error);
    throw new Error("Error while encryption of password.");
  }
}

async function verifyPassword(planPassword, hashedPassword) {
  try {
    return await bcrypt.compare(planPassword, hashedPassword);
  } catch (error) {
    console.log("🚀 ~ verifyPassword ~ error:", error);
    throw new Error("Error while verifying password.");
  }
}

export { encryptPassword, verifyPassword };
