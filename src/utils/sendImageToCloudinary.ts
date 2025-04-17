import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../app/config';
import path from 'path';

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_secret,
});

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
  folder: string,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName.trim(),
        folder: `news/${folder}`,
      },
      function (error, result) {
        if (error) {
          reject(error);
        }
        if (result) {
          resolve(result);
        }
        
        // Asynchronously delete the file after upload
        fs.unlink(path, (err) => {
          if (err) {
            console.log('Error deleting file:', err);
          } else {
            console.log('File deleted successfully.');
          }
        });
      },
    );
  });
};

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), '/uploads/');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer configuration: Handle 'images' field with a limit of 10 images
export const upload = multer({
  storage: storage,
}).array('images', 10);

export const cloudinaryConfig = cloudinary;
