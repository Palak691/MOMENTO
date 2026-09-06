import dotenv from 'dotenv';
dotenv.config();
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({//mean to join ; connect it to cloudianry storage
  cloud_name : process.env.CLOUD_NAME,
  api_key : process.env.CLOUD_API_KEY,
  api_secret : process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'momento',
    allowed_Formats: async (req, file) => ['png', 'jpg', 'jpeg']// supports promises as well
  },
});
export  {storage,cloudinary}