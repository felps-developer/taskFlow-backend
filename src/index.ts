import 'dotenv/config';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import { errorHandler } from './utils/errors.util';
import authRoutes from './modules/auth/auth.routes';
import usersRoutes from './modules/users/users.routes';
import tasksRoutes from './modules/tasks/tasks.routes';

const app: Express = express();
const PORT = process.env.APP_PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/tasks', tasksRoutes);

// Error handler (deve ser o último middleware)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

