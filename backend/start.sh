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
NODE_ENV=production
EOF

echo ".env created with DATABASE_URL and other vars."

# Now run Medusa CLI — it will load the .env we just made
echo "Setting up database..."
pnpm medusa db:setup

echo "Starting Medusa..."
exec pnpm start   # or pnpm medusa develop if you prefer dev mode