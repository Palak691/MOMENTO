import express from 'express';
import { getUserAndPosts, login, register, uploadProfilePicture } from '../controllers/authController.js';
import multer from 'multer';
import { validateUser } from '../middleware/validateUser.js';
import { wrapAsync } from '../utils/wrapAsync.js';
import { cloudinary, storage } from '../config/Cloudinary.js';

const router = express.Router();
const upload = multer({storage : storage})


router.route('/register').post(wrapAsync(register));
router.route('/login',).post(wrapAsync(login));
router.route('/profile-picture',).patch(validateUser,upload.single('profilePicture'),wrapAsync(uploadProfilePicture));
router.route('/me',).get(validateUser,wrapAsync(getUserAndPosts));
//restapi



export default router;