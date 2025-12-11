import { Router } from 'express';
import { DashboardController } from './dashboard.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
const dashboardController = new DashboardController();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// GET /api/dashboard/metrics - Dashboard de métricas
router.get(
  '/metrics',
  dashboardController.getMetrics.bind(dashboardController),
);

// GET /api/dashboard/history - Histórico de demandas concluídas
router.get(
  '/history',
  dashboardController.getTaskHistory.bind(dashboardController),
);

export default router;

