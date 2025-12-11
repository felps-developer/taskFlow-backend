export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'funcionario';
  created_at?: Date;
  updated_at?: Date;
}

