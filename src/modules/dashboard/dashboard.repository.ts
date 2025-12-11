import { db } from '../../infra/database/database';
import { DashboardMetricsParamsDto, TaskHistoryParamsDto } from './dto/dashboard-params.dto';
import {
  DashboardMetrics,
  TaskHistoryItem,
  TaskHistoryResult,
} from './interfaces/dashboard.interfaces';

export class DashboardRepository {
  private readonly table = 'tasks';

  /**
   * Busca métricas do dashboard
   */
  async getMetrics(
    params: DashboardMetricsParamsDto,
  ): Promise<DashboardMetrics> {
    const startDate = params.start_date
      ? new Date(params.start_date)
      : undefined;
    const endDate = params.end_date ? new Date(params.end_date) : undefined;

    // Query base para tarefas concluídas
    let completedTasksQuery = db(this.table)
      .where('status', 'concluido')
      .select('*');

    if (startDate) {
      completedTasksQuery = completedTasksQuery.where(
        'updated_at',
        '>=',
        startDate,
      );
    }
    if (endDate) {
      completedTasksQuery = completedTasksQuery.where(
        'updated_at',
        '<=',
        endDate,
      );
    }

    // Total de tarefas concluídas
    const totalCompleted = (await completedTasksQuery
      .clone()
      .count('* as count')
      .first()) as { count: string | number } | undefined;
    const total_completed_tasks = Number(totalCompleted?.count || 0);

    // Tarefas urgentes concluídas
    const urgentCompleted = (await completedTasksQuery
      .clone()
      .where('type', 'urgente')
      .count('* as count')
      .first()) as { count: string | number } | undefined;
    const urgent_tasks_completed = Number(urgentCompleted?.count || 0);

    // Tempo médio de execução (em dias)
    const executionTimes = (await completedTasksQuery
      .clone()
      .select(
        db.raw(
          "EXTRACT(EPOCH FROM (updated_at - created_at)) / 86400 as execution_days",
        ),
      )) as Array<{ execution_days: string | number }>;

    const average_execution_time_days =
      executionTimes.length > 0
        ? executionTimes.reduce(
            (sum: number, task) => sum + Number(task.execution_days || 0),
            0,
          ) / executionTimes.length
        : 0;

    // Produtividade por funcionário
    const productivityQuery = db(this.table)
      .where('status', 'concluido')
      .select(
        'tasks.responsible_id',
        'users.name as employee_name',
        db.raw('COUNT(*) as completed_tasks'),
        db.raw(
          "COUNT(CASE WHEN tasks.type = 'urgente' THEN 1 END) as urgent_tasks_completed",
        ),
        db.raw(
          "AVG(EXTRACT(EPOCH FROM (tasks.updated_at - tasks.created_at)) / 86400) as avg_execution_days",
        ),
      )
      .leftJoin('users', 'tasks.responsible_id', 'users.id')
      .groupBy('tasks.responsible_id', 'users.name');

    if (startDate) {
      productivityQuery.where('tasks.updated_at', '>=', startDate);
    }
    if (endDate) {
      productivityQuery.where('tasks.updated_at', '<=', endDate);
    }

    const productivityData = (await productivityQuery) as Array<{
      responsible_id: string;
      employee_name: string;
      completed_tasks: string | number;
      urgent_tasks_completed: string | number;
      avg_execution_days: string | number;
    }>;

    const productivity_by_employee = productivityData.map((item) => ({
      employee_id: item.responsible_id,
      employee_name: item.employee_name || 'Desconhecido',
      completed_tasks: Number(item.completed_tasks || 0),
      urgent_tasks_completed: Number(item.urgent_tasks_completed || 0),
      average_execution_time_days: Number(item.avg_execution_days || 0),
    }));

    return {
      total_completed_tasks,
      urgent_tasks_completed,
      average_execution_time_days: Math.round(average_execution_time_days * 100) / 100,
      productivity_by_employee,
    };
  }

  /**
   * Busca histórico de tarefas concluídas
   */
  async getTaskHistory(
    params: TaskHistoryParamsDto,
  ): Promise<TaskHistoryResult> {
    const { page = 1, limit = 10, responsible_id, start_date, end_date } =
      params;

    let query = db(this.table)
      .where('status', 'concluido')
      .select(
        'tasks.id',
        'tasks.title',
        'tasks.description',
        'tasks.type',
        'tasks.status',
        'tasks.responsible_id',
        'tasks.deadline',
        'tasks.created_at',
        'tasks.updated_at as completed_at',
        'users.name as responsible_name',
        db.raw(
          "EXTRACT(EPOCH FROM (tasks.updated_at - tasks.created_at)) / 86400 as execution_time_days",
        ),
      )
      .leftJoin('users', 'tasks.responsible_id', 'users.id')
      .orderBy('tasks.updated_at', 'desc');

    if (responsible_id) {
      query = query.where('tasks.responsible_id', responsible_id);
    }

    if (start_date) {
      query = query.where('tasks.updated_at', '>=', new Date(start_date));
    }

    if (end_date) {
      query = query.where('tasks.updated_at', '<=', new Date(end_date));
    }

    // Total de registros
    const countResult = (await query
      .clone()
      .count('* as count')
      .first()) as { count: string | number } | undefined;
    const total = Number(countResult?.count || 0);

    // Dados paginados
    const offset = (page - 1) * limit;
    const data = (await query
      .clone()
      .limit(limit)
      .offset(offset)) as TaskHistoryItem[];

    const last_page = limit > 0 ? Math.ceil(total / limit) : 1;

    return {
      data: data.map((item: any) => ({
        ...item,
        execution_time_days: Math.round(Number(item.execution_time_days || 0) * 100) / 100,
      })),
      total,
      page: +page,
      last_page: +last_page,
      limit: +limit,
    };
  }
}

