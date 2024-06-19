import express from 'express';
import { AuthController } from '../controllers/authController';
import { validateSignUpUser,validateSignInUser } from '../validations/user/auth-validations';
const router = express.Router();


router.post('/signup', validateSignUpUser, AuthController.createUser);
router.post('/signin', validateSignInUser, AuthController.login);

export default router;
