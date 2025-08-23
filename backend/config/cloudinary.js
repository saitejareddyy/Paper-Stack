import { v2 as cloudinary } from 'cloudinary'
import { ENV_VARS } from './env.Vars.js'


export const connectCloudinary = async () => {
  await cloudinary.config({
    cloud_name: ENV_VARS.CLOUDINARY_CLOUD_NAME,
    api_key: ENV_VARS.CLOUDINARY_API_KEY,
    api_secret: ENV_VARS.CLOUDINARY_API_SECRET
  })
}
