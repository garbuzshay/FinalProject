import {Router} from 'express';
import { loginValidation, signupValidation } from '../Middlewares/AuthValidation.js';
import { signup, login, getCurrentUser } from '../Controllers/AuthController.js';
import authenticateUser from '../Middlewares/AuthenticateUser.js';
const router = Router();



router.post('/signup',signupValidation, signup);
router.post('/login', loginValidation,login);
////
router.get('/user', authenticateUser, getCurrentUser);
///
export default router;