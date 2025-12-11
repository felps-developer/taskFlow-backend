export interface ListTasksParamsDto {
  page?: number;
  limit?: number;
  title?: string;
  type?: 'landing_page' | 'edicao' | 'api' | 'manutencao' | 'urgente';
  status?: 'pendente' | 'fazendo' | 'concluido';
  responsible_id?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  last_page: number;
  limit: number;
}

