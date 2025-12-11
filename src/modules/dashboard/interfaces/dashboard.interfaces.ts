export interface DashboardMetrics {
  total_completed_tasks: number;
  urgent_tasks_completed: number;
  average_execution_time_days: number;
  productivity_by_employee: Array<{
    employee_id: string;
    employee_name: string;
    completed_tasks: number;
    urgent_tasks_completed: number;
    average_execution_time_days: number;
  }>;
}

export interface TaskHistoryItem {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  responsible_id: string;
  responsible_name: string;
  deadline: Date;
  created_at: Date;
  completed_at: Date;
  execution_time_days: number;
}

export interface TaskHistoryResult {
  data: TaskHistoryItem[];
  total: number;
  page: number;
  last_page: number;
  limit: number;
}

