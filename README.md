# TaskFlow Backend

Backend do sistema TaskFlow para organização de demandas internas da equipe.

## 🚀 Tecnologias

- **Node.js** com **TypeScript**
- **Express** - Framework web
- **PostgreSQL** - Banco de dados
- **Knex.js** - Query builder e migrations
- **Docker** - Containerização
- **JWT** - Autenticação

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 22+ (apenas para desenvolvimento local)

## 🏗️ Arquitetura

O projeto segue os princípios **SOLID** e **Clean Code**, com arquitetura em camadas:

```
src/
├── infra/           # Infraestrutura (database, etc)
├── middleware/      # Middlewares (auth, validation, errors)
├── modules/         # Módulos da aplicação
│   ├── auth/        # Autenticação
│   ├── users/       # Usuários
│   └── tasks/       # Tarefas
├── utils/           # Utilitários
└── index.ts         # Ponto de entrada
```

### Estrutura de Módulos

Cada módulo segue o padrão:

```
module/
├── entities/        # Interfaces/Entidades
├── dto/             # Data Transfer Objects e validações
├── *.repository.ts   # Camada de acesso a dados
├── *.service.ts      # Lógica de negócio
├── *.controller.ts   # Controladores HTTP
└── *.routes.ts       # Rotas
```

## 🐳 Executando com Docker (Recomendado)

### 1. Clone o repositório

```bash
git clone <repository-url>
cd taskFlow-backend
```

### 2. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e ajuste se necessário:

```bash
cp .env.example .env
```

### 3. Execute com Docker Compose

```bash
docker-compose up --build
```

O Docker irá:
- ✅ Subir o PostgreSQL
- ✅ Executar as migrations automaticamente
- ✅ Executar os seeds (dados iniciais)
- ✅ Iniciar a API

A API estará disponível em: `http://localhost:3000`

## 💻 Desenvolvimento Local (sem Docker)

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o PostgreSQL

Certifique-se de ter o PostgreSQL rodando localmente e crie o banco:

```sql
CREATE DATABASE taskflow_db;
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env`:

```env
NODE_ENV=development
APP_PORT=3000
DB_CONNECTION_URI=postgresql://postgres:postgres@localhost:5432/taskflow_db
JWT_SECRET=your-secret-key-change-in-production
```

### 4. Execute as migrations

```bash
npm run db:migrate
```

### 5. Execute os seeds

```bash
npm run db:seed
```

### 6. Inicie o servidor

```bash
npm run start:dev
```

## 📚 API Endpoints

### Autenticação

- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Obter usuário autenticado (requer token)

### Usuários

- `GET /api/users` - Listar usuários (paginação, admin apenas)
- `GET /api/users/list` - Listar todos os usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `POST /api/users` - Criar usuário (admin apenas)
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário (admin apenas)

### Tarefas

- `GET /api/tasks` - Listar tarefas (paginação)
- `GET /api/tasks/list` - Listar todas as tarefas
- `GET /api/tasks/:id` - Buscar tarefa por ID
- `POST /api/tasks` - Criar tarefa
- `PUT /api/tasks/:id` - Atualizar tarefa
- `DELETE /api/tasks/:id` - Deletar tarefa (admin apenas)

## 🔐 Autenticação

A maioria das rotas requer autenticação via JWT. Envie o token no header:

```
Authorization: Bearer <token>
```

### Credenciais Padrão (Seeds)

- **Admin:**
  - Email: `admin@taskflow.com`
  - Senha: `123456`

- **Funcionários:**
  - Email: `joao@taskflow.com` / `maria@taskflow.com` / `pedro@taskflow.com`
  - Senha: `123456`

## 📝 Migrations

### Criar nova migration

```bash
npm run db:migrate:make nome_da_migration
```

### Executar migrations

```bash
npm run db:migrate
```

### Reverter migration

```bash
npm run db:rollback
```

## 🌱 Seeds

### Criar novo seed

```bash
npm run db:seed:make nome_do_seed
```

### Executar seeds

```bash
npm run db:seed
```

## 🧪 Estrutura de Dados

### Usuários

- `id` (UUID)
- `name` (string)
- `email` (string, único)
- `password` (string, hash)
- `role` (enum: 'admin' | 'funcionario')
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Tarefas

- `id` (UUID)
- `title` (string)
- `description` (text)
- `type` (enum: 'landing_page' | 'edicao' | 'api' | 'manutencao' | 'urgente')
- `responsible_id` (UUID, FK para users)
- `status` (enum: 'pendente' | 'fazendo' | 'concluido')
- `deadline` (timestamp)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## 🛠️ Scripts Disponíveis

- `npm run build` - Compilar TypeScript
- `npm run start` - Iniciar em produção
- `npm run start:dev` - Iniciar em desenvolvimento (watch mode)
- `npm run lint` - Executar linter
- `npm run format` - Formatar código com Prettier
- `npm run db:migrate` - Executar migrations
- `npm run db:rollback` - Reverter migration
- `npm run db:seed` - Executar seeds

## 📦 Dependências Principais

- `express` - Framework web
- `knex` - Query builder
- `pg` - Cliente PostgreSQL
- `jsonwebtoken` - JWT
- `bcrypt` - Hash de senhas
- `express-validator` - Validação de dados
- `express-async-errors` - Tratamento de erros assíncronos

## 🎯 Princípios Aplicados

### SOLID

- **S**ingle Responsibility: Cada classe tem uma única responsabilidade
- **O**pen/Closed: Extensível sem modificar código existente
- **L**iskov Substitution: Interfaces bem definidas
- **I**nterface Segregation: Interfaces específicas
- **D**ependency Inversion: Dependências injetadas

### Clean Code

- Nomes descritivos
- Funções pequenas e focadas
- Separação de responsabilidades
- Tratamento de erros consistente
- Validação de dados
- Código testável

## 📄 Licença

UNLICENSED

