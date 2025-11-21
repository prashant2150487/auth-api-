import path from "path";
import { getFileCategory } from "../config/multerConfig.js";
import User from "../models/User.js";

// Upload single file
export const uploadSingleFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    // Validate image
    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({
        success: false,
        message: "Only image files are allowed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded & user updated successfully",
      data: {
        filename: path.basename(file.key),
        originalName: file.originalname,
        url: file.location,
        key: file.key,
        size: file.size,
        mimetype: file.mimetype,
        category: getFileCategory(file.originalname),
      },
      user: user,
    });
  } catch (error) {
    console.error("Image Upload error:", error);
    res.status(500).json({
      success: false,
      message: "File upload failed",
      error: error.message || "Unknown error",
    });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user.id;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    // Validate it's actually an image
    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({
        success: false,
        message: "Only image files are allowed",
      });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.image = file.location;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        filename: path.basename(file.key),
        originalName: file.originalname,
        url: file.location,
        key: file.key,
        size: file.size,
        mimetype: file.mimetype,
        category: "images",
      },
      user: user,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Upload multiple files
// export const uploadMultipleFiles = async (req: Request, res: Response) => {
//   try {
//     const files = req.files as MulterS3File[];

//     if (!files || files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No files uploaded'
//       });
//     }

//     const uploadedFiles = files.map(file => ({
//       filename: path.basename(file.key),
//       originalName: file.originalname,
//       url: file.location,
//       key: file.key,
//       size: file.size,
//       mimetype: file.mimetype,
//       category: getFileCategory(file.originalname),
//     }));

//     res.status(200).json({
//       success: true,
//       message: `${files.length} files uploaded successfully`,
//       data: uploadedFiles,
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'File upload failed',
//       error: error instanceof Error ? error.message : 'Unknown error',
//     });
//   }
// };

// Generate presigned URL for direct upload
// export const generatePresignedUrl = async (req: Request, res: Response) => {
//   try {
//     const { filename, filetype, category } = req.body;

//     if (!filename || !filetype) {
//       return res.status(400).json({
//         success: false,
//         message: 'Filename and filetype are required'
//       });
//     }

//     const fileCategory = category || getFileCategory(filename);
//     const timestamp = Date.now();
//     const key = `uploads/${fileCategory}/${timestamp}-${filename}`;

//     const command = new PutObjectCommand({
//       Bucket: bucketName,
//       Key: key,
//       ContentType: filetype,
//     });

//     const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

//     res.status(200).json({
//       success: true,
//       message: 'Presigned URL generated',
//       data: {
//         uploadUrl,
//         key,
//         expiresIn: 3600,
//       },
//     });
//   } catch (error) {
//     console.error('Presigned URL error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to generate presigned URL',
//       error: error instanceof Error ? error.message : 'Unknown error',
//     });
//   }
// };

// List files in bucket
// export const listFiles = async (req: Request, res: Response) => {
//   try {
//     const { category, prefix, maxKeys = 100 } = req.query;

//     let prefixPath = 'uploads/';
//     if (category) {
//       prefixPath += `${category}/`;
//     } else if (prefix) {
//       prefixPath += prefix;
//     }

//     const command = new ListObjectsV2Command({
//       Bucket: bucketName,
//       Prefix: prefixPath,
//       MaxKeys: Number(maxKeys),
//     });

//     const response = await s3Client.send(command);

//     const files = response.Contents?.map(item => ({
//       key: item.Key,
//       size: item.Size,
//       lastModified: item.LastModified,
//       url: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
//     })) || [];

//     res.status(200).json({
//       success: true,
//       count: files.length,
//       data: files,
//     });
//   } catch (error) {
//     console.error('List files error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to list files',
//       error: error instanceof Error ? error.message : 'Unknown error',
//     });
//   }
// };

// Delete file
// export const deleteFile = async (req: Request, res: Response) => {
//   try {
//     const { key } = req.params;

//     if (!key) {
//       return res.status(400).json({
//         success: false,
//         message: 'File key is required'
//       });
//     }

//     const command = new DeleteObjectCommand({
//       Bucket: bucketName,
//       Key: key,
//     });

//     await s3Client.send(command);

//     res.status(200).json({
//       success: true,
//       message: 'File deleted successfully',
//       data: { key },
//     });
//   } catch (error) {
//     console.error('Delete error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete file',
//       error: error instanceof Error ? error.message : 'Unknown error',
//     });
//   }
// };

// Get file metadata
// export const getFileMetadata = async (req: Request, res: Response) => {
//   try {
//     const { key } = req.params;

//     const command = new HeadObjectCommand({
//       Bucket: bucketName,
//       Key: key,
//     });

//     const metadata = await s3Client.send(command);

//     res.status(200).json({
//       success: true,
//       data: {
//         key,
//         size: metadata.ContentLength,
//         contentType: metadata.ContentType,
//         lastModified: metadata.LastModified,
//         metadata: metadata.Metadata,
//         etag: metadata.ETag,
//       },
//     });
//   } catch (error) {
//     console.error('Metadata error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get file metadata',
//       error: error instanceof Error ? error.message : 'Unknown error',
//     });
//   }
// };

// Generate download URL (presigned)
// export const generateDownloadUrl = async (req: Request, res: Response) => {
//   try {
//     const { key } = req.params;
//     const { expiresIn = 3600 } = req.query;

//     const command = new GetObjectCommand({
//       Bucket: bucketName,
//       Key: key,
//     });

//     const downloadUrl = await getSignedUrl(s3Client, command, {
//       expiresIn: Number(expiresIn)
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         downloadUrl,
//         key,
//         expiresIn: Number(expiresIn),
//       },
//     });
//   } catch (error) {
//     console.error('Download URL error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to generate download URL',
//       error: error instanceof Error ? error.message : 'Unknown error',
//     });
//   }
// };
