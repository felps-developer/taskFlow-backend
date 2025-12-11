import { Request, Response } from 'express';
import { DashboardService } from './dashboard.service';
import { DashboardRepository } from './dashboard.repository';
import {
  DashboardMetricsParamsDto,
  TaskHistoryParamsDto,
} from './dto/dashboard-params.dto';

export class DashboardController {
  private dashboardService: DashboardService;

  constructor() {
    const dashboardRepository = new DashboardRepository();
    this.dashboardService = new DashboardService(dashboardRepository);
  }

  async getMetrics(req: Request, res: Response): Promise<Response> {
    const params: DashboardMetricsParamsDto = {
      start_date: req.query.start_date as string,
      end_date: req.query.end_date as string,
    };

    const metrics = await this.dashboardService.getMetrics(params);
    return res.status(200).json({
      success: true,
      data: metrics,
    });
  }

  async getTaskHistory(req: Request, res: Response): Promise<Response> {
    const params: TaskHistoryParamsDto = {
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      responsible_id: req.query.responsible_id as string,
      start_date: req.query.start_date as string,
      end_date: req.query.end_date as string,
    };

    const history = await this.dashboardService.getTaskHistory(params);
    return res.status(200).json({
      success: true,
      ...history,
    });
  }
}

