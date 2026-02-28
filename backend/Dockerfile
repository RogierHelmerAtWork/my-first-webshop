FROM node:20-alpine

# Install pnpm globally (small addition, ~10-20s extra on first build)
RUN npm install -g pnpm@latest

WORKDIR /app

# Copy lockfile + package.json first for caching
COPY package.json pnpm-lock.yaml* .npmrc*  ./

# Install dependencies with pnpm (uses your pnpm-lock.yaml if it exists)
RUN pnpm install --frozen-lockfile

COPY . .

# Make sure start.sh is executable in container too (optional but safe)
RUN chmod +x start.sh

EXPOSE 9000 7001

CMD ["sh", "./start.sh"]
