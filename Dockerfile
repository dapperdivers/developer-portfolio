# Stage 1: Build
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Set build-time environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM nginx:1.25-alpine

# Set runtime environment variables with defaults
ENV NGINX_PORT=80
ENV REACT_APP_PORT=3000

# Install additional security packages
RUN apk add --no-cache \
    curl \
    tzdata \
    && rm -rf /var/cache/apk/*

# Create necessary directories and files with proper permissions
RUN mkdir -p /tmp/nginx \
    && mkdir -p /var/cache/nginx \
    && mkdir -p /var/run \
    && mkdir -p /files \
    && touch /tmp/nginx/access.log \
    && touch /tmp/nginx/error.log \
    && touch /tmp/nginx/nginx.pid \
    && chown -R nginx:nginx /tmp/nginx \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /files \
    && chmod -R 755 /tmp/nginx \
    && chmod -R 755 /var/cache/nginx \
    && chmod -R 755 /files \
    && chmod 644 /tmp/nginx/access.log \
    && chmod 644 /tmp/nginx/error.log \
    && chmod 644 /tmp/nginx/nginx.pid \
    # Configure nginx to run as nginx user
    && sed -i 's/user  nginx;/user nginx;/' /etc/nginx/nginx.conf \
    && sed -i 's/^pid.*$/pid \/tmp\/nginx\/nginx.pid;/' /etc/nginx/nginx.conf \
    # Redirect nginx logs to stdout/stderr for Kubernetes logging
    && ln -sf /dev/stdout /tmp/nginx/access.log \
    && ln -sf /dev/stderr /tmp/nginx/error.log

# Copy nginx configuration
COPY site.conf /etc/nginx/conf.d/default.conf

# Remove default nginx static assets
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy built assets from builder
COPY --from=builder --chown=nginx:nginx /app/build .

# Create a simple health check endpoint
RUN echo "OK" > /usr/share/nginx/html/healthz

# Ensure nginx config is valid
RUN nginx -t

# Set proper file permissions
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

# Switch to non-root user
USER nginx

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${NGINX_PORT}/healthz || exit 1

# Expose configurable port
EXPOSE ${NGINX_PORT}

# Start nginx
CMD ["sh", "-c", "nginx -g 'daemon off;'"]
