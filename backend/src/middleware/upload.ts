import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
  const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WebP, GIF images and MP4, WebM videos are allowed.'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

export const uploadSingle = (fieldName: string) =>
  upload.single(fieldName);

export const uploadMultiple = (fieldName: string, maxCount: number = 10) =>
  upload.array(fieldName, maxCount);

export const uploadFields = (fields: { name: string; maxCount: number }[]) =>
  upload.fields(fields);

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string = 'souq-baladi'
): Promise<{ url: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    const uniqueFilename = `${folder}/${uuidv4()}${path.extname(file.originalname)}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: uniqueFilename,
        resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image',
        folder,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          reject(new Error('Upload failed'));
          return;
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(file.buffer);
  });
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};

export const handleUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file && !req.files) {
      next();
      return;
    }

    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      (req as any).uploadedFile = result;
    }

    if (req.files && Array.isArray(req.files)) {
      const results = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file))
      );
      (req as any).uploadedFiles = results;
    }

    if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
      const results: Record<string, any[]> = {};
      for (const [key, files] of Object.entries(req.files)) {
        results[key] = await Promise.all(
          (files as Express.Multer.File[]).map((file) => uploadToCloudinary(file))
        );
      }
      (req as any).uploadedFields = results;
    }

    next();
  } catch (error) {
    next(error);
  }
};
