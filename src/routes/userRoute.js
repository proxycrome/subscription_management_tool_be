import { Router } from 'express';
import userController from '../controllers/userController.js';
import subscriptionController from '../controllers/subscriptionController.js';
import AuthValidator from '../middleware/AuthValidator.js';
import AdminValidator from '../middleware/AdminValidator.js';

const router = Router();

router.route('/edit/:userId').patch(AuthValidator, userController.editUser)
router.route('/products').get(AuthValidator, userController.getProducts).post(AdminValidator, userController.createProduct)
router.route('/category').post(AdminValidator, userController.createCategory).get(AuthValidator, userController.getCategorys)
router.route('/category/:categoryId/:productId').patch(AdminValidator, userController.editCategory)
router.route('/subscription').post(AuthValidator, subscriptionController.createSubscription).get(AuthValidator, subscriptionController.getSubscriptions)
router.route('/subscription/:subId').patch(AuthValidator, subscriptionController.editSubscription).delete(AuthValidator, subscriptionController.deleteSubscription)

export default router;