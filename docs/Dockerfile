# Jekyll Documentation Dockerfile
FROM ruby:3.1-alpine AS builder

# Main site URL for navigation button
ARG VITE_SITE_MAIN_URL
ENV VITE_SITE_MAIN_URL=${VITE_SITE_MAIN_URL}

# Install build dependencies
RUN apk add --no-cache \
    build-base \
    linux-headers \
    git

WORKDIR /docs

# Copy Gemfile and install gems
COPY Gemfile Gemfile.lock ./
RUN bundle config --global frozen 1 && \
    bundle install --without development test

# Copy source files
COPY . .

# Build the Jekyll site
ARG JEKYLL_BASEURL=""
RUN JEKYLL_ENV=production bundle exec jekyll build ${JEKYLL_BASEURL:+--baseurl "$JEKYLL_BASEURL"}

# Production stage
FROM nginx:alpine

# Install curl for healthcheck
RUN apk --no-cache add curl

# Copy built site to nginx
COPY --from=builder /docs/_site /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove unnecessary files that shouldn't be served
RUN rm -f /usr/share/nginx/html/.htaccess \
    && rm -f /usr/share/nginx/html/Dockerfile \
    && rm -f /usr/share/nginx/html/nginx.conf

# Create non-root user
RUN addgroup -S jekyll && adduser -S -G jekyll jekyll
RUN chown -R jekyll:jekyll /usr/share/nginx/html

EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:4000/ || exit 1

CMD ["nginx", "-g", "daemon off;"]