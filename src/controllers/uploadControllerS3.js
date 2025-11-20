import path from 'path';
import { getFileCategory } from '../config/multerConfig.js';

// Upload single file
export const uploadSingleFile = async (req,res) => {
  try {
    const file = req.file ;
    
    if (!file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: path.basename(file.key),
        originalName: file.originalname,
        url: file.location,
        key: file.key,
        size: file.size,
        mimetype: file.mimetype,
        category: getFileCategory(file.originalname),
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'File upload failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No image uploaded' 
      });
    }

    // Validate it's actually an image
    if (!file.mimetype.startsWith('image/')) {
      return res.status(400).json({ 
        success: false, 
        message: 'Only image files are allowed' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        filename: path.basename(file.key),
        originalName: file.originalname,
        url: file.location,
        key: file.key,
        size: file.size,
        mimetype: file.mimetype,
        category: 'images',
      },
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Image upload failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
