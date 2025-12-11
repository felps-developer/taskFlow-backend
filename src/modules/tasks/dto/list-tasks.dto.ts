export interface ListTasksParamsDto {
  page?: number;
  limit?: number;
  title?: string;
  type?: 'landing_page' | 'edicao' | 'api' | 'manutencao' | 'urgente';
  status?: 'pendente' | 'fazendo' | 'concluido';
  responsible_id?: string;
  start_date?: string; // Data inicial para filtrar por updated_at (data de conclusão)
  end_date?: string; // Data final para filtrar por updated_at (data de conclusão)
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  last_page: number;
  limit: number;
}

