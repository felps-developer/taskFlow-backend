import { Router } from 'express';
import { UsersController } from './users.controller';
import { authMiddleware, adminMiddleware } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import {
  createUserValidation,
} from './dto/create-user.dto';
import {
  updateUserValidation,
} from './dto/update-user.dto';

const router = Router();
const usersController = new UsersController();

// Rotas protegidas - requerem autenticação
router.use(authMiddleware);

// Rotas de administrador
router.post(
  '/',
  adminMiddleware,
  validate(createUserValidation),
  usersController.create.bind(usersController),
);

router.get(
  '/',
  adminMiddleware,
  usersController.findAll.bind(usersController),
);

router.get('/list', usersController.list.bind(usersController));

router.get('/:id', usersController.findOne.bind(usersController));

router.put(
  '/:id',
  validate(updateUserValidation),
  usersController.update.bind(usersController),
);

router.delete(
  '/:id',
  adminMiddleware,
  usersController.remove.bind(usersController),
);

export default router;

