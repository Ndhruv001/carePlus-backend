import cloudinary from "../../config/cloudinary.js";
import sanitize from 'sanitize-filename';
import streamifier from 'streamifier'; // Use import instead of require

async function uploadOnCloudinary(fileBuffer, originalName) {
  if (!fileBuffer) {
    return null;
  }
  
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          public_id: sanitize(originalName), // Sanitize the original name for Cloudinary
        },
        (error, result) => {
          if (error) {
            console.log("🚀 ~ uploadOnCloudinary ~ error:", error.message);
            reject(new Error("Cloudinary error: " + error.message));
          } else {
            resolve(result);
          }
        }
      );

      // Convert the file buffer to a readable stream and pipe it to Cloudinary
      streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });

  } catch (error) {
    console.error("🚀 ~ uploadOnCloudinary ~ error:", error.message);
    throw new Error("Cloudinary error: " + error.message);
  }
}

export default uploadOnCloudinary;
