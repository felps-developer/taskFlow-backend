import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const users = await knex('users').select('id', 'role');

  const admin = users.find((u) => u.role === 'admin');
  const funcionarios = users.filter((u) => u.role === 'funcionario');

  if (!admin || funcionarios.length === 0) {
    return;
  }

  const tasks = [
    {
      id: '10000000-0000-0000-0000-000000000001',
      title: 'Criar Landing Page para Cliente X',
      description:
        'Desenvolver landing page responsiva para o cliente X com formulário de contato e integração com email marketing.',
      type: 'landing_page',
      responsible_id: funcionarios[0].id,
      status: 'pendente',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '10000000-0000-0000-0000-000000000002',
      title: 'Editar Vídeo Promocional',
      description:
        'Editar vídeo promocional de 2 minutos com transições, música de fundo e legendas.',
      type: 'edicao',
      responsible_id: funcionarios[1].id,
      status: 'fazendo',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '10000000-0000-0000-0000-000000000003',
      title: 'Corrigir Bug na API de Pagamento',
      description:
        'Corrigir bug crítico na API de pagamento que está causando falhas em transações acima de R$ 1000.',
      type: 'urgente',
      responsible_id: funcionarios[0].id,
      status: 'fazendo',
      deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 dia
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '10000000-0000-0000-0000-000000000004',
      title: 'Desenvolver API de Relatórios',
      description:
        'Criar API REST para geração de relatórios de vendas com filtros por data, produto e cliente.',
      type: 'api',
      responsible_id: funcionarios[2]?.id || funcionarios[0].id,
      status: 'pendente',
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 dias
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '10000000-0000-0000-0000-000000000005',
      title: 'Manutenção do Servidor',
      description:
        'Realizar manutenção preventiva no servidor de produção, atualizar dependências e verificar logs.',
      type: 'manutencao',
      responsible_id: admin.id,
      status: 'concluido',
      deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 dia atrás
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updated_at: new Date(),
    },
  ];

  await knex('tasks').insert(tasks);
}

