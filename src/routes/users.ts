import express from 'express';
import { UserController } from '../controllers/userController';
import { validateupdateUser } from '../validations/user/user-validation';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateJWT, UserController.getUser);
router.get('/:id', authenticateJWT, UserController.getUserById);
router.patch('/:id', authenticateJWT, validateupdateUser, UserController.updateUser);

export default router;
