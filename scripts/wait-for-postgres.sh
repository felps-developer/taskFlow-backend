#!/bin/sh
# Aguarda o PostgreSQL estar pronto

set -e

host="$1"
shift
cmd="$@"

until PGPASSWORD=postgres psql -h "$host" -U postgres -d taskflow_db -c '\q'; do
  >&2 echo "PostgreSQL está indisponível - aguardando..."
  sleep 1
done

>&2 echo "PostgreSQL está pronto - executando comando"
exec $cmd

