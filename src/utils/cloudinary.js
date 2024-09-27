import cloudinary from "../../config/cloudinary.js";
import sanitize from 'sanitize-filename'

async function uploadOnCloudinary(fileBuffer, originalName) {
  if (!fileBuffer) {
    return null;
  }
  try {
    // Upload the file directly from the memory buffer to Cloudinary
    const response = await cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        public_id: sanitize(originalName), // Sanitize the original name for Cloudinary
      },
      (error, result) => {
        if (error) {
          console.log("🚀 ~ uploadOnCloudinary ~ error:", error.message);
          throw new Error("Cloudinary error: " + error.message);
        }
        return result;
      }
    );
    
    // Pipe the file stream to Cloudinary
    const streamifier = require("streamifier"); // Convert buffer to stream
    streamifier.createReadStream(fileBuffer).pipe(response);

  } catch (error) {
    console.error("🚀 ~ uploadOnCloudinary ~ error:", error.message);
    throw new Error("Cloudinary error: " + error.message);
  }
}

export default uploadOnCloudinary;
