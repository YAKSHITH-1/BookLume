import { v2 as cloudinary } from 'cloudinary';

import "dotenv/config";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.cloud_name || process.env.CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY || process.env.api_key || process.env.CLOUD_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET || process.env.api_secret || process.env.CLOUD_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Cloudinary configuration missing. Checked env vars CLOUDINARY_CLOUD_NAME/api_key/api_secret and fallbacks.');
  console.error({ cloudName: !!cloudName, apiKey: !!apiKey, apiSecret: !!apiSecret });
  
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export default cloudinary;


