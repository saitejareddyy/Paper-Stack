import dotenv from 'dotenv'

dotenv.config();

export const ENV_VARS = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}