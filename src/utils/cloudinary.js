import cloudinary from "../../config/cloudinary.js";
import fs from "fs";

async function uploadOnCloudinary(localFilePath) {
  if (!localFilePath) {
    return null;
  }
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("🚀 ~ uploadOnCloudinary ~ error:", error.message);
    fs.unlinkSync(localFilePath);
    throw new Error("Cloudinary error: ", error.message);
  }
}

export default uploadOnCloudinary;
