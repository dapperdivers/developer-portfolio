# Stage 1: Build
FROM node:22-alpine AS builder

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

# Site Navigator environment variables - set at runtime
ENV VITE_SITE_MAIN_URL=""
ENV VITE_SITE_STORYBOOK_URL=""
ENV VITE_SITE_DOCS_URL=""
ENV VITE_SITE_NAVIGATOR_ENABLED="true"

# Add build dependencies only when needed (for native modules)
RUN apk add --no-cache --virtual .build-deps \
    python3 \
    make \
    g++ \
    && ln -sf python3 /usr/bin/python

# Install dependencies first (better layer caching)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false --network-timeout 600000 --silent

# Copy only necessary files for build (better layer caching)
COPY src/ ./src/
COPY public/ ./public/
COPY config/ ./config/
COPY scripts/ ./scripts/
COPY server.js index.html vite.config.ts tsconfig.json ./

# Build the site navigator with environment variables (optional based on VITE_SITE_NAVIGATOR_ENABLED)
RUN if [ "${VITE_SITE_NAVIGATOR_ENABLED}" = "true" ]; then yarn build:site-navigator; fi

# Build Storybook (for integration into Express server)
RUN yarn storybook:build

# Build the application
RUN yarn build

# Clean up build dependencies and node_modules
RUN apk del .build-deps && \
    rm -rf node_modules

# Stage 2: Jekyll build
FROM ruby:3.1-alpine AS jekyll-builder

# Install build dependencies efficiently
RUN apk add --no-cache --virtual .build-deps \
    build-base \
    linux-headers \
    git \
    && apk add --no-cache \
    nodejs

WORKDIR /docs

# Copy and install gems first (better layer caching)
COPY docs/Gemfile docs/Gemfile.lock ./
RUN bundle config --global frozen 1 && \
    bundle config --global silence_root_warning 1 && \
    bundle install --without development test --jobs $(nproc) --retry 3 --quiet

# Copy docs source files
COPY docs/ ./

# Copy built site navigator from Node stage
COPY --from=builder /app/public/site-navigator.js ./assets/js/

# Build Jekyll site with optimizations
ARG JEKYLL_BASEURL=""
ARG JEKYLL_ENV=production
RUN JEKYLL_ENV=${JEKYLL_ENV} bundle exec jekyll build ${JEKYLL_BASEURL:+--baseurl "$JEKYLL_BASEURL"} && \
    # Cleanup build dependencies
    apk del .build-deps

# Stage 3: Dependencies
FROM node:22-alpine AS deps

WORKDIR /app

# Copy package files
COPY --from=builder /app/package.json /app/yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile --network-timeout 600000 --silent \
    && yarn cache clean

# Stage 4: Production
FROM node:22-alpine AS production

# Set runtime environment variables with defaults
ARG PORT=3001
ARG ALLOWED_DOMAINS=http://localhost:3001
ENV PORT=${PORT}
ENV ALLOWED_DOMAINS=${ALLOWED_DOMAINS}
ENV NODE_OPTIONS="--max-old-space-size=${NODE_MAX_MEMORY:-512}"
ENV NODE_ENV=production

# Create non-root user with better security
RUN addgroup -g 1001 -S nodeapp && \
    adduser -u 1001 -S -G nodeapp -s /sbin/nologin -h /app nodeapp

WORKDIR /app

# Security upgrade and cleanup (wget is already available in alpine)
RUN apk upgrade --no-cache && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

# Copy built assets and production dependencies
COPY --from=builder /app/build ./build
COPY --from=builder /app/storybook-static ./storybook-static
COPY --from=jekyll-builder /docs/_site ./docs-static
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./server.js

# Copy runtime entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Change ownership
RUN chown -R nodeapp:nodeapp /app

# Add healthcheck with wget (more efficient)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/healthz || exit 1

# Add security labels
LABEL security.non-root=true \
      security.user=nodeapp

# Expose port (IPv4 only)
EXPOSE ${PORT}/tcp

# Switch to non-root user
USER nodeapp

# Start secure express server with runtime configuration
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "server.js"]
