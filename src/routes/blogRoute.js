import { Router } from 'express';
import BlogController from '../controllers/blogController.js';
import { cloudinaryConfig } from '../config/cloudinaryConfig.js';
import { multerUploads } from "../config/multerConfig.js";
import AdminValidator from '../middleware/AdminValidator.js';

const router = Router();

router.route('/').post(AdminValidator, multerUploads.single('blog_image'), cloudinaryConfig, BlogController.createBlog).get(BlogController.getBlogs)
router.route('/:blogId').get(BlogController.getBlogById)

export default router;