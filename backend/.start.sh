#!/bin/sh
set -e

# After Postgres wait...
echo "Waiting for Redis..."
until nc -z -v -w1 redis 6379 2>/dev/null; do
  echo "Redis not ready yet - sleeping 2s..."
  sleep 2
done
echo "Redis is ready!"

echo "Waiting for PostgreSQL to accept connections on port 5432..."

# Simple TCP wait loop using bash/nc (works on alpine without extra installs)
until nc -z -v -w1 postgres 5432 2>/dev/null; do
  echo "Postgres not ready yet - sleeping 2s..."
  sleep 2
done

echo "PostgreSQL is ready!"

echo "Setting up database (migrations + sync)..."
pnpm medusa db:setup   # or db:migrate if you only want migrations
pnpm medusa db:migrate    # optional, seeds demo data
# pnpm medusa db:seed       # optional, syncs DB schema with models (use with caution in production)

echo "Starting Medusa..."
exec pnpm medusa develop
