# Stage 1: Build the React Vite application
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package manifests first for layer caching
COPY package*.json ./
RUN npm ci

# Copy application source and build static assets
COPY . .
RUN npm run build

# Stage 2: Serve static assets + Gemini proxy (/api/chat) with a dependency-free Node server.
# Cloud Run sets $PORT (default 8080). Set GEMINI_API_KEY as a Cloud Run env var / secret.
FROM node:24-alpine

WORKDIR /app
ENV NODE_ENV=production PORT=8080

COPY package.json ./
COPY --from=builder /app/dist ./dist
COPY server ./server

USER node
EXPOSE 8080

CMD ["node", "server/server.js"]
