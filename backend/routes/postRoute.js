import express from 'express';
import multer from 'multer';
import { cloudinary, storage } from '../config/Cloudinary.js';
import { addComments, createPost, getAllPosts, getCommentsByPost, getUserAllPosts, likePost, unlikePost } from '../controllers/postController.js';
import { wrapAsync } from '../utils/wrapAsync.js';
import { validateUser } from '../middleware/validateUser.js';
const upload = multer({storage : storage})
const router = express.Router();


router.route('/').post(validateUser,upload.single('postImg'),wrapAsync(createPost))
router.route('/').get(getAllPosts);
router.route('/me').get(validateUser,wrapAsync(getUserAllPosts));
router.route('/:post_id/comments').post(validateUser,wrapAsync(addComments));
router.route('/:post_id/comments').get(wrapAsync(getCommentsByPost));
router.route('/:post_id/likes').post(validateUser,wrapAsync(likePost));
router.route('/:post_id/unlikes').delete(validateUser,wrapAsync(unlikePost));

export default router;