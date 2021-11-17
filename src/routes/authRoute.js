import { Router } from 'express';
import AuthController from '../controllers/authController.js';

const router = Router();
 
router.route('/register').post(AuthController.signUp);
router.route('/login').post(AuthController.login);
router.route('/forgotpassword').put(AuthController.forgetPassword);
router.route('/resetpassword').put(AuthController.resetPassword)

export default router;