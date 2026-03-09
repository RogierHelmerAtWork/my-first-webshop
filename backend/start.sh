#!/bin/sh
set -e

echo "Waiting for Redis..."
until nc -z -v -w1 redis 6379 2>/dev/null; do
  echo "Redis not ready yet - sleeping 2s..."
  sleep 2
done
echo "Redis is ready!"

echo "Waiting for PostgreSQL..."
until nc -z -v -w1 postgres 5432 2>/dev/null; do
  echo "Postgres not ready yet - sleeping 2s..."
  sleep 2
done
echo "PostgreSQL is ready!"

echo "Setting up database..."
# Force Medusa CLI to use process.env instead of .env file
pnpm medusa db:setup --no-dotenv

echo "Starting Medusa in dev mode..."
# Same for develop/start
exec pnpm medusa develop --no-dotenv