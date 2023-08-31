import { Router } from 'express';
import BlogController from '../controllers/BlogController.js';
import { cloudinaryConfig } from '../config/cloudinaryConfig.js';
import { multerUploads } from "../config/multerConfig.js";
import AdminValidator from '../middleware/AdminValidator.js';

const router = Router();

router.route('/').post(AdminValidator, multerUploads.single('blogImage'), cloudinaryConfig, BlogController.createBlog).get(BlogController.getBlogs)
router.route('/:blogId').get(BlogController.getBlogById)

export default router;