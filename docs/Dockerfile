# Jekyll Documentation Dockerfile
FROM ruby:3.1-alpine AS builder

# Site Navigator environment variables
ARG VITE_SITE_MAIN_URL
ARG VITE_SITE_STORYBOOK_URL
ARG VITE_SITE_DOCS_URL
ARG VITE_SITE_NAVIGATOR_ENABLED=true

ENV VITE_SITE_MAIN_URL=${VITE_SITE_MAIN_URL}
ENV VITE_SITE_STORYBOOK_URL=${VITE_SITE_STORYBOOK_URL}
ENV VITE_SITE_DOCS_URL=${VITE_SITE_DOCS_URL}
ENV VITE_SITE_NAVIGATOR_ENABLED=${VITE_SITE_NAVIGATOR_ENABLED}

# Install build dependencies
RUN apk add --no-cache \
    build-base \
    linux-headers \
    git \
    nodejs \
    npm

WORKDIR /docs

# Copy Gemfile and install gems
COPY Gemfile Gemfile.lock ./
RUN bundle config --global frozen 1 && \
    bundle install --without development test

# Copy source files and build scripts
COPY . .
COPY ../src/components/shared/SiteNavigator.js ../src/components/shared/
COPY ../scripts/build-site-navigator.js ../scripts/
COPY ../package.json ../

# Build the site navigator with environment variables
RUN cd .. && node scripts/build-site-navigator.js

# Build the site
ARG JEKYLL_BASEURL=""
RUN JEKYLL_ENV=production bundle exec jekyll build ${JEKYLL_BASEURL:+--baseurl "$JEKYLL_BASEURL"}

# Production stage
FROM nginx:alpine

# Install curl for healthcheck
RUN apk --no-cache add curl

# Copy built site and site navigator to nginx
COPY --from=builder /docs/_site /usr/share/nginx/html
COPY --from=builder /public/site-navigator.js /usr/share/nginx/html/assets/js/

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