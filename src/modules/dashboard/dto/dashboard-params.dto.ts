export interface DashboardMetricsParamsDto {
  start_date?: string; // ISO string
  end_date?: string; // ISO string
}

export interface TaskHistoryParamsDto {
  responsible_id?: string;
  start_date?: string; // ISO string
  end_date?: string; // ISO string
  page?: number;
  limit?: number;
}

