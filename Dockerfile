# Stage 1: Build
FROM node:22-slim AS builder

# Set working directory
WORKDIR /app

# Set build-time environment variables
ARG PORT=3001
ARG ALLOWED_DOMAINS=http://localhost:${PORT}
ENV NODE_ENV=production
ENV PORT=${PORT}
ENV ALLOWED_DOMAINS=${ALLOWED_DOMAINS}
ENV REACT_APP_PORT=${PORT}
ENV REACT_APP_NODE_ENV=${NODE_ENV}
ENV GENERATE_SOURCEMAP=false

# Install dependencies first (better layer caching)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production
FROM node:22-slim

# Set runtime environment variables with defaults
ARG PORT=3001
ARG ALLOWED_DOMAINS=http://localhost:3001
ENV PORT=${PORT}
ENV ALLOWED_DOMAINS=${ALLOWED_DOMAINS}
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

# Copy necessary files from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/files ./files

# Install production dependencies
RUN yarn install --production --frozen-lockfile

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT}/healthz || exit 1

# Expose port (IPv4 only)
EXPOSE ${PORT}/tcp

# Switch to non-root user
USER nodeapp

# Copy server file and ensure correct ownership
COPY --chown=nodeapp:nodeapp server.js .

# Start secure express server
CMD ["node", "server.js"]
