# Stage 1: Dependencies - Install and cache dependencies separately
FROM node:22-alpine AS deps

WORKDIR /app

# Install only the package files first
COPY package.json yarn.lock ./

# Install ALL dependencies but with aggressive cleanup
RUN yarn install --frozen-lockfile --production=false \
    --network-timeout 300000 --silent --prefer-offline \
    && yarn cache clean --force \
    && rm -rf /tmp/* /var/tmp/* /root/.npm /root/.yarn-cache

# Stage 2: Build - Build the application
FROM node:22-alpine AS builder

# Set build-time environment variables
ARG PORT=3001
ARG ALLOWED_DOMAINS=http://localhost:${PORT}

ENV NODE_ENV=production
ENV PORT=${PORT}
ENV ALLOWED_DOMAINS=${ALLOWED_DOMAINS}
ENV REACT_APP_PORT=${PORT}
ENV REACT_APP_NODE_ENV=${NODE_ENV}
ENV GENERATE_SOURCEMAP=false

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/yarn.lock ./

# Copy source code
COPY src/ ./src/
COPY public/ ./public/
COPY scripts/ ./scripts/
COPY .storybook/ ./.storybook/
COPY config/ ./config/
COPY server.js index.html vite.config.ts tsconfig.json ./

# Build everything in one RUN command for smaller layers
RUN NODE_OPTIONS="--max-old-space-size=2048" yarn build:site-navigator \
    && NODE_OPTIONS="--max-old-space-size=4096" yarn build \
    && NODE_OPTIONS="--max-old-space-size=2048" yarn storybook:build \
    && rm -rf node_modules \
    && rm -rf /tmp/* /var/tmp/* /root/.npm /root/.yarn-cache

# Stage 3: Jekyll build (unchanged)
FROM ruby:3.1-alpine AS jekyll-builder

RUN apk add --no-cache --virtual .build-deps \
    build-base \
    linux-headers \
    git \
    && apk add --no-cache \
    nodejs

WORKDIR /docs

COPY docs/Gemfile docs/Gemfile.lock ./
RUN bundle config --global frozen 1 && \
    bundle config --global silence_root_warning 1 && \
    bundle install --without development test --jobs $(nproc) --retry 1 --quiet

COPY docs/ ./
COPY --from=builder /app/public/site-navigator.js ./assets/js/

ARG JEKYLL_BASEURL="/docs"
ARG JEKYLL_ENV=production
RUN JEKYLL_ENV=${JEKYLL_ENV} bundle exec jekyll build --baseurl "$JEKYLL_BASEURL" && \
    apk del .build-deps && \
    rm -rf /var/cache/apk/* /tmp/*

# Stage 4: Production dependencies only
FROM node:22-alpine AS prod-deps

WORKDIR /app

COPY package.json yarn.lock ./

# Install ONLY production dependencies with aggressive cleanup
RUN yarn install --production --frozen-lockfile \
    --network-timeout 300000 --silent --prefer-offline \
    && yarn cache clean --force \
    && rm -rf /tmp/* /var/tmp/* /root/.npm /root/.yarn-cache \
    && find ./node_modules -name "*.md" -delete \
    && find ./node_modules -name "*.txt" -delete \
    && find ./node_modules -name "test" -type d -exec rm -rf {} + 2>/dev/null || true \
    && find ./node_modules -name "tests" -type d -exec rm -rf {} + 2>/dev/null || true \
    && find ./node_modules -name "*.map" -delete \
    && find ./node_modules -name "*.d.ts" -delete

# Stage 5: Final production image
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

# Create user first
RUN addgroup -g 1001 -S nodeapp && \
    adduser -u 1001 -S -G nodeapp -s /sbin/nologin -h /app nodeapp

# Copy production dependencies
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/package.json ./package.json

# Copy built assets
COPY --from=builder /app/build ./build
COPY --from=builder /app/storybook-static ./storybook-static
COPY --from=jekyll-builder /docs/_site ./docs-static
COPY --from=builder /app/server.js ./server.js
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Final setup in single layer
RUN chmod +x /usr/local/bin/docker-entrypoint.sh && \
    chown -R nodeapp:nodeapp /app && \
    rm -rf /tmp/* /var/tmp/*

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/healthz || exit 1

# Add security labels
LABEL security.non-root=true \
      security.user=nodeapp

EXPOSE ${PORT}/tcp
USER nodeapp

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "server.js"]