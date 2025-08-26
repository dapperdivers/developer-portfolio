# Production Dockerfile for Derek Mackley Developer Portfolio
# Multi-stage build optimized for production deployment

# Build Stage
FROM node:22-alpine AS builder

# Set build arguments for configuration
ARG NODE_ENV=production
ARG VITE_SITE_MAIN_URL=https://derekmackley.com
ARG VITE_SITE_STORYBOOK_URL=https://storybook.derekmackley.com
ARG VITE_SITE_DOCS_URL=https://docs.derekmackley.com

# Set environment variables
ENV NODE_ENV=${NODE_ENV}
ENV VITE_SITE_MAIN_URL=${VITE_SITE_MAIN_URL}
ENV VITE_SITE_STORYBOOK_URL=${VITE_SITE_STORYBOOK_URL}
ENV VITE_SITE_DOCS_URL=${VITE_SITE_DOCS_URL}
ENV CI=true
ENV FORCE_COLOR=3

# Install build dependencies including Ruby for Jekyll and additional packages for Storybook
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    ruby \
    ruby-dev \
    ruby-bundler \
    build-base \
    bash \
    coreutils \
    findutils \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package.json yarn.lock ./

# Install dependencies with frozen lockfile
RUN yarn install --frozen-lockfile --production=false \
    && yarn cache clean

# Install TypeScript globally for Docker builds
RUN yarn global add typescript@latest

# Copy source code and configuration
COPY . .

# Build all three sites with proper error handling and resource management
RUN echo "Building main portfolio with NODE_ENV=${NODE_ENV}..." \
    && yarn build:prod \
    && echo "Main portfolio build completed successfully" \
    && ls -la build/

RUN echo "Building Storybook..." \
    && echo "Node version: $(node --version)" \
    && echo "TypeScript version: $(yarn tsc --version || npx tsc --version)" \
    && echo "Yarn version: $(yarn --version)" \
    && echo "Verifying Vite config exists: $(ls -la vite.config.ts)" \
    && echo "Verifying Storybook config exists: $(ls -la .storybook/main.ts)" \
    && echo "Working directory: $(pwd)" \
    && echo "Available memory: $(cat /proc/meminfo | grep MemTotal)" \
    && NODE_OPTIONS="--max-old-space-size=4096" timeout 300s yarn storybook:build \
    && echo "Storybook build completed successfully" \
    && ls -la storybook-static/ \
    && test -f storybook-static/index.html || (echo "ERROR: Storybook index.html not found" && exit 1)

RUN echo "Building Jekyll docs..." \
    && cd docs \
    && bundle install \
    && bundle exec jekyll build --destination ../docs-static \
    && cd .. \
    && echo "Jekyll docs build completed successfully" \
    && ls -la docs-static/

# Verify critical build artifacts exist for all three sites
RUN test -f build/index.html || (echo "ERROR: build/index.html not found" && exit 1) \
    && test -d build/assets || (echo "ERROR: build/assets directory not found" && exit 1) \
    && test -f storybook-static/index.html || (echo "ERROR: storybook-static/index.html not found" && exit 1) \
    && test -f docs-static/index.html || (echo "ERROR: docs-static/index.html not found" && exit 1) \
    && echo "All builds verification passed"

# Production Stage
FROM node:22-alpine AS production

# Install runtime dependencies
RUN apk add --no-cache \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001 -G nodejs

# Set working directory
WORKDIR /app

# Copy package files for production dependencies only
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production=true \
    && yarn cache clean \
    && chown -R nextjs:nodejs node_modules

# Copy all built applications from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/build ./build
COPY --from=builder --chown=nextjs:nodejs /app/storybook-static ./storybook-static  
COPY --from=builder --chown=nextjs:nodejs /app/docs-static ./docs-static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/config ./config

# Copy production server configuration
COPY --chown=nextjs:nodejs config/vite/prod/server.js ./server.js

# Create logs directory with proper permissions
RUN mkdir -p /app/logs \
    && chown -R nextjs:nodejs /app/logs

# Switch to non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "const http = require('http'); \
    const req = http.request({hostname: 'localhost', port: process.env.PORT || 8080, path: '/healthz', timeout: 5000}, \
    (res) => { res.statusCode === 200 ? process.exit(0) : process.exit(1); }); \
    req.on('error', () => process.exit(1)); \
    req.on('timeout', () => { req.destroy(); process.exit(1); }); \
    req.end();"

# Expose port
EXPOSE 8080

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0

# Use dumb-init to properly handle signals
ENTRYPOINT ["dumb-init", "--"]

# Start the production server using the config
CMD ["node", "config/vite/prod/server.js"]

# Metadata labels
LABEL org.opencontainers.image.title="Derek Mackley Developer Portfolio"
LABEL org.opencontainers.image.description="Full Stack Developer Portfolio with React, Storybook, Jekyll docs, Node.js and security-focused architecture"
LABEL org.opencontainers.image.vendor="Derek Mackley"
LABEL org.opencontainers.image.authors="Derek Mackley <contact@derekmackley.com>"
LABEL deployment.type="nodejs-express"
LABEL deployment.framework="vite-react"
LABEL security.non-root="true"
LABEL security.user="nextjs:nodejs"