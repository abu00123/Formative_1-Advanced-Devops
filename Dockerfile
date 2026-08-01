# Use a specific, official Node.js base image (slim version for reduced size and security)
FROM node:24-alpine AS base

# Upgrade npm to get patched node-tar (fixes CVE-2026-59873)
RUN npm install -g npm@latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Set production environment variable by default
ENV NODE_ENV=production

# ----------------- Stage 1: Backend -----------------
FROM base AS backend

# Copy package manifests for the backend
COPY backend/package*.json ./

# Install only production dependencies (no devDependencies)
RUN npm ci --only=production

# Copy backend source files
COPY backend/ .

# Ensure all files are owned by the pre-configured non-root 'node' user for security
RUN chown -R node:node /usr/src/app

# Switch to the non-root 'node' user
USER node

# Expose the backend API port
EXPOSE 5000

# Start the Express server
CMD ["node", "index.js"]

# ----------------- Stage 2: Frontend -----------------
FROM base AS frontend

# Copy package manifests for the frontend
COPY frontend/package*.json ./

# Install dependencies (development dependencies are needed to build/run Vite)
RUN npm ci --include=dev

# Copy frontend source files
COPY frontend/ .

# Ensure all files are owned by the pre-configured non-root 'node' user
RUN chown -R node:node /usr/src/app

# Switch to the non-root 'node' user
USER node

# Expose the Vite dev server port
EXPOSE 5173

# Start the Vite dev server binding to host 0.0.0.0 so it is accessible outside the container
CMD ["npm", "run", "dev", "--", "--host"]
