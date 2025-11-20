import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import { s3Client, bucketName } from "../config/s3Bucket.js";

const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || "10485760"); // 10MB default

// File type categories and their allowed extensions
export const fileCategories = {
  images: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".ico"],
  videos: [".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv", ".webm"],
  documents: [
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".txt",
    ".rtf",
  ],
  audio: [".mp3", ".wav", ".ogg", ".m4a", ".flac", ".aac"],
  archives: [".zip", ".rar", ".7z", ".tar", ".gz"],
  code: [
    ".js",
    ".ts",
    ".py",
    ".java",
    ".cpp",
    ".html",
    ".css",
    ".json",
    ".xml",
  ],
};
// Get file category based on extension
export const getFileCategory = (filename) => {
  const ext = path.extname(filename).toLowerCase();

  for (const [category, extensions] of Object.entries(fileCategories)) {
    if (extensions.includes(ext)) {
      return category;
    }
  }

  return "others";
};
// Generate unique filename
const generateFileName = (originalname)=> {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  const ext = path.extname(originalname);
  const nameWithoutExt = path.basename(originalname, ext);
  return `${nameWithoutExt}-${timestamp}-${randomString}${ext}`;
};
// Multer S3 storage configuration
export const uploadToS3 = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: bucketName,
    metadata: (req, file, cb) => {
      cb(null, { 
        fieldName: file.fieldname,
        originalName: file.originalname,
        uploadedAt: new Date().toISOString(),
      });
    },
    key: (req, file, cb) => {
      const category = getFileCategory(file.originalname);
      const fileName = generateFileName(file.originalname);
      const s3Path = `uploads/${category}/${fileName}`;
      cb(null, s3Path);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    // Add custom validation if needed
    cb(null, true);
  },
});

// Memory storage for specific use cases (for presigned URLs)
export const memoryUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
});



