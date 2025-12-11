export interface ListUsersParamsDto {
  page?: number;
  limit?: number;
  name?: string;
  email?: string;
  role?: 'admin' | 'funcionario';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  last_page: number;
  limit: number;
}

