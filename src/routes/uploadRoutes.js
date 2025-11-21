import express from "express";
import { uploadToS3 } from "../config/multerConfig.js";
import {
  uploadImage,
  uploadSingleFile,
} from "../controllers/uploadControllerS3.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/upload/single", uploadToS3.single("file"), uploadSingleFile);
router.post(
  "/upload/image",
  authenticateToken,
  uploadToS3.single("image"),
  uploadImage
);

// router.post('/upload/presigned-url', generatePresignedUrl);
// File management routes
// router.get('/files', listFiles);
// router.get('/files/:key/metadata', getFileMetadata);
// router.get('/files/:key/download-url', generateDownloadUrl);
// router.delete('/files/:key', deleteFile);
export default router;
