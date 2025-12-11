import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middleware/validation.middleware';
import { loginValidation } from './dto/login.dto';
import { registerValidation } from './dto/register.dto';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

router.post(
  '/register',
  validate(registerValidation),
  authController.register.bind(authController),
);

router.post(
  '/login',
  validate(loginValidation),
  authController.login.bind(authController),
);

router.get('/me', authMiddleware, authController.me.bind(authController));

export default router;

