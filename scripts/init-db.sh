#!/bin/sh
# Script para inicializar o banco de dados

set -e

echo "Aguardando PostgreSQL..."
until PGPASSWORD=postgres psql -h postgres -U postgres -d taskflow_db -c '\q' 2>/dev/null; do
  echo "PostgreSQL está indisponível - aguardando..."
  sleep 2
done

echo "PostgreSQL está pronto!"

echo "Compilando TypeScript..."
npm run build

echo "Executando migrations..."
npm run db:migrate

echo "Executando seeds..."
npm run db:seed

echo "Banco de dados inicializado com sucesso!"

