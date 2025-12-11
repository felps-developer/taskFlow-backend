import { Knex } from 'knex';
import { generateHash } from '../src/utils/encrypt.util';

export async function seed(knex: Knex): Promise<void> {
  // Deletar dados existentes em ordem reversa para lidar com foreign keys
  await knex('tasks').del();
  await knex('users').del();

  const passwordHash = await generateHash('123456');

  const users = [
    {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Admin Sistema',
      email: 'admin@taskflow.com',
      password: passwordHash,
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-0000-0000-000000000002',
      name: 'João Silva',
      email: 'joao@taskflow.com',
      password: passwordHash,
      role: 'funcionario',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-0000-0000-000000000003',
      name: 'Maria Santos',
      email: 'maria@taskflow.com',
      password: passwordHash,
      role: 'funcionario',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-0000-0000-000000000004',
      name: 'Pedro Oliveira',
      email: 'pedro@taskflow.com',
      password: passwordHash,
      role: 'funcionario',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-0000-0000-000000000005',
      name: 'Ana Costa',
      email: 'ana@taskflow.com',
      password: passwordHash,
      role: 'funcionario',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-0000-0000-000000000006',
      name: 'Carlos Pereira',
      email: 'carlos@taskflow.com',
      password: passwordHash,
      role: 'funcionario',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await knex('users').insert(users);
}

