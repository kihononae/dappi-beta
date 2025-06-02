# Dockerfile

# Stage 1 — Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2 — Runtime (Prod)
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .env

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]

# Stage 3 — Dev (hot reload)
FROM node:18-alpine AS devrunner

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install --save-dev ts-node-dev

COPY . .

CMD ["npm", "run", "dev"]
