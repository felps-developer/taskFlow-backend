FROM node:22-slim

WORKDIR /usr/src/app

# Instalar dependências do sistema necessárias para compilação e PostgreSQL client
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Dar permissão de execução aos scripts
RUN chmod +x scripts/*.sh

# Expor porta
EXPOSE 3000

# Comando padrão (será sobrescrito pelo docker-compose)
CMD ["npm", "run", "start:dev"]

