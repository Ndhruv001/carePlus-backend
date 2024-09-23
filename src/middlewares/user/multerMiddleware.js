import sanitize from "sanitize-filename";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_FILENAME_LENGTH = 100;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../../../public"));
  },
  filename: (req, file, cb) => {
    let originalName = sanitize(file.originalname);
    if (originalName.length > MAX_FILENAME_LENGTH) {
      originalName = originalName.substring(0, MAX_FILENAME_LENGTH);
    }
    cb(null, Date.now() + "-" + originalName);
  },
});

function fileFilter(req, file, cb) {
  const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, and PDF files are allowed."
      ),
      false
    );
  }
}

const limits = {
  fileSize: 2 * 1024 * 1024,
  files: 3,
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

export default upload;
