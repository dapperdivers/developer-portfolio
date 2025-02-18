# Stage 1: Build
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Set build-time environment variables
ARG PORT=3000
ENV NODE_ENV=production
ENV PORT=${PORT}
ENV REACT_APP_PORT=${PORT}
ENV REACT_APP_NODE_ENV=${NODE_ENV}
ENV GENERATE_SOURCEMAP=false

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20-slim

# Set runtime environment variables with defaults
ARG PORT=3000
ENV PORT=${PORT}
# Set Node.js memory limit
ENV NODE_OPTIONS="--max-old-space-size=512"

# Create non-root user
RUN groupadd -r nodeapp && useradd -r -g nodeapp nodeapp

WORKDIR /app

# Install required packages with security best practices
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && chown -R nodeapp:nodeapp /app

# Copy built assets from builder
COPY --from=builder /app/build ./build

# Create files directory
RUN mkdir -p /app/files

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT}/healthz || exit 1

# Expose port
EXPOSE ${PORT}

# Switch to non-root user
USER nodeapp

# Copy server file
COPY --chown=nodeapp:nodeapp server.js .

# Start secure express server
CMD ["node", "server.js"]
