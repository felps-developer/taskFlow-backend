import { Router } from 'express';
import { TasksController } from './tasks.controller';
import { authMiddleware, adminMiddleware } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { createTaskValidation } from './dto/create-task.dto';
import { updateTaskValidation } from './dto/update-task.dto';

const router = Router();
const tasksController = new TasksController();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

router.post(
  '/',
  validate(createTaskValidation),
  tasksController.create.bind(tasksController),
);

router.get('/', tasksController.findAll.bind(tasksController));

router.get('/list', tasksController.list.bind(tasksController));

router.get('/:id', tasksController.findOne.bind(tasksController));

router.put(
  '/:id',
  validate(updateTaskValidation),
  tasksController.update.bind(tasksController),
);

router.delete(
  '/:id',
  adminMiddleware,
  tasksController.remove.bind(tasksController),
);

export default router;

