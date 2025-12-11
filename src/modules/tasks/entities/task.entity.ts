export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'landing_page' | 'edicao' | 'api' | 'manutencao' | 'urgente';
  responsible_id: string;
  status: 'pendente' | 'fazendo' | 'concluido';
  deadline: Date;
  created_at?: Date;
  updated_at?: Date;
  // Relacionamentos
  responsible_name?: string;
}

