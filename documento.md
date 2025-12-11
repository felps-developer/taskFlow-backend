PARTE 1 — TaskFlow (Sistema Interno da Agência)
Crie um mini sistema chamado TaskFlow, utilizado para organizar demandas
internas da equipe e do administrador da agência.
Este sistema terá muito peso na avaliação, pois funciona como um protótipo
real de algo que usamos no dia a dia.
Backend – Node.js (Javascript) + Express + MySQL
Crie uma API contendo as seguintes rotas:
Autenticação
• POST /auth/register — registro de usuários
• POST /auth/login — login
• Usuários devem possuir nível de acesso:
o admin
o funcionário
Tarefas
• POST /tasks — criar tarefa
• GET /tasks — listar tarefas
• PUT /tasks/:id — atualizar tarefa
• DELETE /tasks/:id — excluir tarefa
Atributos obrigatórios da tarefa
• título
• descrição
• tipo (landing page, edição, API, manutenção, urgente)
• responsável (funcionário)
• status (pendente, fazendo, concluído)
• prazo
Diferenciais (não obrigatório, mas valorizado)
• Histórico de demandas concluídas, filtrando por funcionário
• Dashboard de métricas, como:
o número de tarefas concluídas
o produtividade por funcionário
o tarefas urgentes entregues
o tempo médio de execução
