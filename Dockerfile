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
RUN yarn install --frozen-lockfile --production=false --network-timeout 600000

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Clean up node_modules to start fresh
RUN rm -rf node_modules

# Stage 2: Dependencies
FROM node:22-alpine AS deps

WORKDIR /app

# Copy package files
COPY --from=builder /app/package.json /app/yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile --network-timeout 600000 \
    && yarn cache clean

# Stage 3: Production
FROM node:22-alpine AS production

# Set runtime environment variables with defaults
ARG PORT=3001
ARG ALLOWED_DOMAINS=http://localhost:3001
ENV PORT=${PORT}
ENV ALLOWED_DOMAINS=${ALLOWED_DOMAINS}
ENV NODE_OPTIONS="--max-old-space-size=512"
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S nodeapp && adduser -S -G nodeapp nodeapp

WORKDIR /app

# Install only curl for healthcheck
RUN apk --no-cache add curl

# Copy built assets and production dependencies
COPY --from=builder /app/build ./build
COPY --from=builder /app/files ./files
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./server.js

# Change ownership
RUN chown -R nodeapp:nodeapp /app

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT}/healthz || exit 1

# Expose port (IPv4 only)
EXPOSE ${PORT}/tcp

# Switch to non-root user
USER nodeapp

# Start secure express server
CMD ["node", "server.js"]
