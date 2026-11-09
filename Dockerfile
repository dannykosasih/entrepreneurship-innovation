# Stage 1: Build the React Vite application
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package manifests first for layer caching
COPY package*.json ./
RUN npm ci

# Copy application source and build static assets
COPY . .
RUN npm run build

# Stage 2: Serve static assets with Nginx on Cloud Run ($PORT, defaults to 8080)
FROM nginx:alpine

# Remove default nginx config and add SPA template config
RUN rm -rf /etc/nginx/conf.d/*
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy compiled static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run sets PORT environment variable (default 8080)
ENV PORT=8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
