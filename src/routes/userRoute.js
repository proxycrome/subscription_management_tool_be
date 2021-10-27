import { Router } from 'express';
import userController from '../controllers/userController.js';
import subscriptionController from '../controllers/subscriptionController.js';
import { cloudinaryConfig } from '../config/cloudinaryConfig.js';
import { multerUploads } from "../config/multerConfig.js";


const router = Router();

router.route('/edit/:userId').patch(multerUploads.single('image'), cloudinaryConfig, userController.editUser)
router.route('/products').get(userController.getProducts).post(userController.createProduct)
router.route('/category').post(userController.createCategory).get(userController.getCategorys)
router.route('/category/:categoryId/:productId').patch(userController.editCategory)
router.route('/subscription/:userId').post(subscriptionController.createSubscription).get(subscriptionController.getSubscription)
router.route('/subscription/:subId').patch(subscriptionController.editSubscription)

export default router;