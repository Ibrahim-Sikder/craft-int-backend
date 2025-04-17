import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_pass: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRETE,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRETE,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  reset_pass_uiLink: process.env.RESET_PASS_UILINK,
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret: process.env.CLOUDINARY_SECRET,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  CROSS_ORIGIN_CLIENT: process.env.CROSS_ORIGIN_CLIENT,
  CROSS_ORIGIN_ADMIN: process.env.CROSS_ORIGIN_ADMIN,
  LOCALHOST_ADMIN: process.env.LOCALHOST_ADMIN,
  LOCALHOST_CLIENT: process.env.LOCALHOST_CLIENT,
  DB_NAME: process.env.DB_NAME,
  VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
};
