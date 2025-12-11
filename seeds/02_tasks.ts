import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const users = await knex('users').select('id', 'role', 'name');

  const admin = users.find((u) => u.role === 'admin');
  const funcionarios = users.filter((u) => u.role === 'funcionario');

  if (!admin || funcionarios.length === 0) {
    return;
  }

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);

  const tasks = [
    // Tarefas concluídas (para dashboard)
    {
      id: '10000000-0000-0000-0000-000000000001',
      title: 'Manutenção do Servidor',
      description:
        'Realizar manutenção preventiva no servidor de produção, atualizar dependências e verificar logs.',
      type: 'manutencao',
      responsible_id: admin.id,
      status: 'concluido',
      deadline: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
      created_at: fiveDaysAgo,
      updated_at: oneDayAgo, // Concluída há 1 dia (executou em 4 dias)
    },
    {
      id: '10000000-0000-0000-0000-000000000002',
      title: 'Criar Landing Page Cliente A',
      description:
        'Desenvolver landing page responsiva para o cliente A com formulário de contato e integração com email marketing.',
      type: 'landing_page',
      responsible_id: funcionarios[0].id,
      status: 'concluido',
      deadline: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      created_at: sevenDaysAgo,
      updated_at: twoDaysAgo, // Concluída há 2 dias (executou em 5 dias)
    },
    {
      id: '10000000-0000-0000-0000-000000000003',
      title: 'Corrigir Bug Crítico API',
      description:
        'Corrigir bug crítico na API de pagamento que está causando falhas em transações acima de R$ 1000.',
      type: 'urgente',
      responsible_id: funcionarios[0].id,
      status: 'concluido',
      deadline: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
      created_at: threeDaysAgo,
      updated_at: oneDayAgo, // Concluída há 1 dia (executou em 2 dias)
    },
    {
      id: '10000000-0000-0000-0000-000000000004',
      title: 'Editar Vídeo Promocional',
      description:
        'Editar vídeo promocional de 2 minutos com transições, música de fundo e legendas.',
      type: 'edicao',
      responsible_id: funcionarios[1].id,
      status: 'concluido',
      deadline: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
      created_at: tenDaysAgo,
      updated_at: threeDaysAgo, // Concluída há 3 dias (executou em 7 dias)
    },
    {
      id: '10000000-0000-0000-0000-000000000005',
      title: 'Desenvolver API de Relatórios',
      description:
        'Criar API REST para geração de relatórios de vendas com filtros por data, produto e cliente.',
      type: 'api',
      responsible_id: funcionarios[2]?.id || funcionarios[0].id,
      status: 'concluido',
      deadline: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      created_at: sevenDaysAgo,
      updated_at: oneDayAgo, // Concluída há 1 dia (executou em 6 dias)
    },
    {
      id: '10000000-0000-0000-0000-000000000006',
      title: 'Urgente: Corrigir Erro de Login',
      description:
        'Corrigir erro crítico no sistema de login que está impedindo usuários de acessar a plataforma.',
      type: 'urgente',
      responsible_id: funcionarios[1].id,
      status: 'concluido',
      deadline: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
      created_at: twoDaysAgo,
      updated_at: oneDayAgo, // Concluída há 1 dia (executou em 1 dia)
    },
    {
      id: '10000000-0000-0000-0000-000000000007',
      title: 'Landing Page Cliente B',
      description:
        'Criar landing page moderna e responsiva para o cliente B com animações e integração com CRM.',
      type: 'landing_page',
      responsible_id: funcionarios[3]?.id || funcionarios[0].id,
      status: 'concluido',
      deadline: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      created_at: fiveDaysAgo,
      updated_at: twoDaysAgo, // Concluída há 2 dias (executou em 3 dias)
    },
    {
      id: '10000000-0000-0000-0000-000000000008',
      title: 'Manutenção Banco de Dados',
      description:
        'Otimizar queries do banco de dados e criar índices para melhorar performance.',
      type: 'manutencao',
      responsible_id: admin.id,
      status: 'concluido',
      deadline: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      created_at: sevenDaysAgo,
      updated_at: threeDaysAgo, // Concluída há 3 dias (executou em 4 dias)
    },
    // Tarefas em andamento
    {
      id: '10000000-0000-0000-0000-000000000009',
      title: 'Editar Vídeo Institucional',
      description:
        'Editar vídeo institucional de 5 minutos com narração, trilha sonora e legendas em português e inglês.',
      type: 'edicao',
      responsible_id: funcionarios[1].id,
      status: 'fazendo',
      deadline: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      created_at: threeDaysAgo,
      updated_at: new Date(),
    },
    {
      id: '10000000-0000-0000-0000-000000000010',
      title: 'Urgente: Atualizar Sistema de Pagamento',
      description:
        'Atualizar integração com gateway de pagamento para suportar novos métodos de pagamento.',
      type: 'urgente',
      responsible_id: funcionarios[0].id,
      status: 'fazendo',
      deadline: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
      created_at: oneDayAgo,
      updated_at: new Date(),
    },
    // Tarefas pendentes
    {
      id: '10000000-0000-0000-0000-000000000011',
      title: 'Criar Landing Page Cliente C',
      description:
        'Desenvolver landing page para o cliente C com design moderno e integração com analytics.',
      type: 'landing_page',
      responsible_id: funcionarios[2]?.id || funcionarios[0].id,
      status: 'pendente',
      deadline: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '10000000-0000-0000-0000-000000000012',
      title: 'Desenvolver API de Notificações',
      description:
        'Criar API para envio de notificações push, email e SMS para os usuários do sistema.',
      type: 'api',
      responsible_id: funcionarios[4]?.id || funcionarios[0].id,
      status: 'pendente',
      deadline: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '10000000-0000-0000-0000-000000000013',
      title: 'Manutenção Preventiva',
      description:
        'Realizar backup completo do sistema e verificar integridade dos dados.',
      type: 'manutencao',
      responsible_id: admin.id,
      status: 'pendente',
      deadline: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '10000000-0000-0000-0000-000000000014',
      title: 'Editar Vídeo Tutorial',
      description:
        'Criar vídeo tutorial de 10 minutos explicando como usar o sistema para novos usuários.',
      type: 'edicao',
      responsible_id: funcionarios[5]?.id || funcionarios[1].id,
      status: 'pendente',
      deadline: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '10000000-0000-0000-0000-000000000015',
      title: 'Urgente: Resolver Problema de Performance',
      description:
        'Identificar e corrigir problemas de performance que estão afetando a experiência do usuário.',
      type: 'urgente',
      responsible_id: funcionarios[0].id,
      status: 'pendente',
      deadline: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await knex('tasks').insert(tasks);
}
