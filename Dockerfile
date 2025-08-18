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

# Install dependencies first (optimal layer caching) - only add build deps if needed
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false --network-timeout 300000 --silent --prefer-offline

# Copy only necessary files for build (optimal layer caching)
COPY src/ ./src/
COPY public/ ./public/
COPY scripts/ ./scripts/
COPY .storybook/ ./.storybook/
COPY config/ ./config/
COPY server.js index.html vite.config.ts tsconfig.json ./

# Build components with memory optimization
RUN NODE_OPTIONS="--max-old-space-size=2048" yarn build:site-navigator
RUN NODE_OPTIONS="--max-old-space-size=4096" yarn build
RUN NODE_OPTIONS="--max-old-space-size=2048" yarn storybook:build

# Clean up node_modules to reduce size
RUN rm -rf node_modules

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

# Copy and install gems first (optimal layer caching)
COPY docs/Gemfile docs/Gemfile.lock ./
RUN bundle config --global frozen 1 && \
    bundle config --global silence_root_warning 1 && \
    bundle install --without development test --jobs $(nproc) --retry 1 --quiet

# Copy docs source files and site navigator in one layer
COPY docs/ ./
COPY --from=builder /app/public/site-navigator.js ./assets/js/

# Build Jekyll site with optimizations and cleanup in single layer
ARG JEKYLL_BASEURL="/docs"
ARG JEKYLL_ENV=production
RUN JEKYLL_ENV=${JEKYLL_ENV} bundle exec jekyll build --baseurl "$JEKYLL_BASEURL" && \
    apk del .build-deps && \
    rm -rf /var/cache/apk/* /tmp/*

# Stage 3: Production
FROM node:22-alpine AS production

# Set runtime environment variables with defaults
ARG PORT=3001
ARG ALLOWED_DOMAINS=http://localhost:3001
ARG NODE_MAX_MEMORY=512
ENV PORT=${PORT}
ENV ALLOWED_DOMAINS=${ALLOWED_DOMAINS}
ENV NODE_OPTIONS="--max-old-space-size=${NODE_MAX_MEMORY}"
ENV NODE_ENV=production

WORKDIR /app

# Install production dependencies in parallel with user creation and security setup
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN addgroup -g 1001 -S nodeapp && \
    adduser -u 1001 -S -G nodeapp -s /sbin/nologin -h /app nodeapp & \
    apk upgrade --no-cache && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/* & \
    yarn install --production --frozen-lockfile --network-timeout 300000 --silent --prefer-offline && \
    yarn cache clean && \
    wait

# Copy all assets and setup in minimal layers
COPY --from=builder /app/build ./build
COPY --from=builder /app/storybook-static ./storybook-static
COPY --from=jekyll-builder /docs/_site ./docs-static
COPY --from=builder /app/server.js ./server.js
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Final setup in single layer
RUN chmod +x /usr/local/bin/docker-entrypoint.sh && \
    chown -R nodeapp:nodeapp /app

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
