# Stage 1 — Build
FROM node:18-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2 — Run
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only compiled output & minimal runtime dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .env

# Define environment (optional)
ENV NODE_ENV=production

# Start the bot
CMD ["node", "dist/index.js"]
