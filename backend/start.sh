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

# Create .env file from Railway injected env vars
echo "Creating .env from environment variables..."
cat > .env << EOF
DATABASE_URL=$DATABASE_URL
REDIS_URL=$REDIS_URL
JWT_SECRET=$JWT_SECRET
COOKIE_SECRET=$COOKIE_SECRET
DB_NAME=$DB_NAME
NODE_ENV=production
EOF

echo ".env created with DATABASE_URL and other vars."

export REDIS_URL="$REDIS_URL"
export DATABASE_URL="$DATABASE_URL"
export NODE_ENV=production

# Run setup non-interactively
echo "Setting up database (non-interactive)..."
pnpm medusa db:setup --db medusa-store --no-interactive

# Build the admin dashboard (required for production start)
# echo "Building admin dashboard..."
# pnpm medusa build

echo "Starting Medusa..."
cd .medusa/server

exec cp ../../.env .env.production && pnpm medusa start
#exec pnpm medusa develop   # or pnpm medusa develop if you prefer dev mode