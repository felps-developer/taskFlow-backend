import { DashboardRepository } from './dashboard.repository';
import { DashboardMetricsParamsDto, TaskHistoryParamsDto } from './dto/dashboard-params.dto';
import { BadRequestError } from '../../utils/errors.util';
import {
  DashboardMetrics,
  TaskHistoryResult,
} from './interfaces/dashboard.interfaces';

export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async getMetrics(
    params: DashboardMetricsParamsDto,
  ): Promise<DashboardMetrics> {
    try {
      return await this.dashboardRepository.getMetrics(params);
    } catch (error) {
      throw new BadRequestError(
        `Erro ao buscar métricas: ${(error as Error).message}`,
      );
    }
  }

  async getTaskHistory(
    params: TaskHistoryParamsDto,
  ): Promise<TaskHistoryResult> {
    try {
      return await this.dashboardRepository.getTaskHistory(params);
    } catch (error) {
      throw new BadRequestError(
        `Erro ao buscar histórico: ${(error as Error).message}`,
      );
    }
  }
}
