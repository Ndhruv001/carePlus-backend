import sanitize from "sanitize-filename";
import multer from "multer";

const MAX_FILENAME_LENGTH = 100;

const storage = multer.memoryStorage(); // Use memory storage instead of disk storage

function fileFilter(req, file, cb) {
  const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and PDF files are allowed."), false);
  }
}

const limits = {
  fileSize: 2 * 1024 * 1024, // 2MB file size limit
  files: 3,
};

const upload = multer({
  storage: storage, // Store files in memory buffer
  fileFilter: fileFilter,
  limits: limits,
});

export default upload;
