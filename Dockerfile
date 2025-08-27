# Production Dockerfile for Derek Mackley Developer Portfolio  
# Optimized 3-builder multi-stage build with parallel compilation

# syntax=docker/dockerfile:1

# Build arguments shared across stages
ARG NODE_ENV=production

# ============================================================================
# Base Node.js Builder - Common dependencies for React and Storybook
# ============================================================================
FROM node:22-alpine AS node-base

# Re-declare ARG variables for this stage
ARG NODE_ENV=production

# Set environment variables  
ENV NODE_ENV=${NODE_ENV}
ENV CI=true
ENV FORCE_COLOR=3

# Install Node.js build dependencies
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy and install Node.js dependencies with extended timeout
COPY package.json yarn.lock ./
RUN yarn config set network-timeout 300000 \
    && yarn install --frozen-lockfile --production=false \
    && yarn cache clean

# Copy source code
COPY . .

# ============================================================================
# Builder 1: React Portfolio Site
# ============================================================================
FROM node-base AS react-builder

# Build main portfolio site
RUN yarn build:prod

# Verify build artifacts exist
RUN test -f build/index.html && test -d build/assets

# ============================================================================
# Builder 2: Storybook Component Library  
# ============================================================================
FROM node-base AS storybook-builder

# Build Storybook with increased memory limit
RUN NODE_OPTIONS="--max-old-space-size=4096" yarn storybook:build

# Verify Storybook build artifacts exist
RUN test -f storybook-static/index.html

# ============================================================================
# Builder 3: Jekyll Documentation Site
# ============================================================================
FROM ruby:3.2-alpine AS jekyll-builder

# Install Jekyll build dependencies
RUN apk add --no-cache \
    build-base \
    libffi-dev \
    git \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy only docs directory and Gemfile
COPY docs/ ./docs/

# Build Jekyll documentation
RUN cd docs \
    && bundle install \
    && bundle exec jekyll build --destination ../docs-static

# Verify Jekyll build artifacts exist  
RUN test -f docs-static/index.html

# ============================================================================
# Production Runtime Stage - Minimal Node.js server
# ============================================================================
FROM node:22-alpine AS production

# Install minimal runtime dependencies
RUN apk add --no-cache \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001 -G nodejs

WORKDIR /app

# Copy package files for production dependencies only
COPY package.json yarn.lock ./

# Install only production Node.js dependencies with extended timeout
RUN yarn config set network-timeout 300000 \
    && yarn install --frozen-lockfile --production=true \
    && yarn cache clean \
    && chown -R nextjs:nodejs node_modules

# Copy built sites from their respective builders
COPY --from=react-builder --chown=nextjs:nodejs /app/build ./build
COPY --from=storybook-builder --chown=nextjs:nodejs /app/storybook-static ./storybook-static  
COPY --from=jekyll-builder --chown=nextjs:nodejs /app/docs-static ./docs-static

# Copy additional assets and server configuration
COPY --from=react-builder --chown=nextjs:nodejs /app/public ./public
COPY --chown=nextjs:nodejs config ./config

# Create logs directory with proper permissions
RUN mkdir -p /app/logs \
    && chown -R nextjs:nodejs /app/logs

# Switch to non-root user
USER nextjs

# Comprehensive health check using Vite server endpoints
HEALTHCHECK --interval=30s --timeout=15s --start-period=10s --retries=3 \
    CMD node -e "const http = require('http'); \
    const req = http.request({hostname: 'localhost', port: process.env.PORT || 8080, path: '/health/comprehensive', timeout: 10000}, \
    (res) => { \
        let data = ''; \
        res.on('data', chunk => data += chunk); \
        res.on('end', () => { \
            try { \
                const health = JSON.parse(data); \
                const isHealthy = res.statusCode === 200 && health.status === 'OK'; \
                console.log('Health status:', health.status); \
                process.exit(isHealthy ? 0 : 1); \
            } catch(e) { \
                console.log('Health check parse error:', e.message); \
                process.exit(1); \
            } \
        }); \
    }); \
    req.on('error', (e) => { console.log('Health check error:', e.message); process.exit(1); }); \
    req.on('timeout', () => { req.destroy(); console.log('Health check timeout'); process.exit(1); }); \
    req.end();"

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=8080  
ENV HOST=0.0.0.0

# Expose the correct port
EXPOSE 8080

# Use dumb-init to properly handle signals
ENTRYPOINT ["dumb-init", "--"]

# Start the production server
CMD ["node", "config/vite/prod/server.js"]

# Metadata labels
LABEL org.opencontainers.image.title="Derek Mackley Developer Portfolio"
LABEL org.opencontainers.image.description="Multi-builder optimized portfolio with React, Storybook, Jekyll docs"
LABEL org.opencontainers.image.vendor="Derek Mackley"
LABEL org.opencontainers.image.authors="Derek Mackley <contact@derekmackley.com>"
LABEL build.architecture="multi-stage-parallel"
LABEL build.builders="react,storybook,jekyll"
LABEL deployment.type="nodejs-express"
LABEL deployment.framework="vite-react"
LABEL security.non-root="true"
LABEL security.user="nextjs:nodejs"