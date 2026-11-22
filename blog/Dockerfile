# Two images from one build, kept apart on purpose:
#
#   builder (default)  builds derekmackley.com/blog from pushed articles and switches the
#                      live site atomically (scripts/publish.ts). Mounts only blog-content.
#                      Never sees the Obsidian vault.
#   desk               the private blog desk (desk/server.ts): lists posts in the vault,
#                      previews them with the real build, pushes them to blog-content.
#                      Runs behind single sign-on with the vault mounted read-only.
#
# Build context is the repository root (the blog imports the portfolio's design tokens
# and React components from ../src):
#   docker build -f blog/Dockerfile -t developer-portfolio-blog .
#   docker build -f blog/Dockerfile --target desk -t developer-portfolio-blog-desk .

# syntax=docker/dockerfile:1
FROM node:22-alpine AS base

ENV NODE_ENV=production \
    ASTRO_TELEMETRY_DISABLED=1

WORKDIR /app/blog

# Dependencies first, for layer caching. Dev tools (astro check, typescript) are not needed.
COPY blog/package.json blog/yarn.lock ./
RUN yarn install --frozen-lockfile --production --non-interactive \
    && yarn cache clean

# The shared portfolio source the blog imports (tokens, props-only components, site links)
COPY src /app/src
COPY blog/ /app/blog/

# Prove the build works before either image is published (the sample articles only)
RUN ARTICLES_DIR=/app/blog/fixtures/articles SITE_DIR=/tmp/selftest node scripts/publish.ts \
    && test -f /tmp/selftest/current/sample-article-format/index.html \
    && rm -rf /tmp/selftest /tmp/blog-*

# BUILD_ID makes a new image rebuild the site even when the articles did not change
ARG BUILD_ID=dev
ENV BUILD_ID=${BUILD_ID}

# ---------------------------------------------------------------------------
FROM base AS desk

# The two icons the preview pages link to (served from the portfolio root on the live site)
COPY public/apple-touch-icon.png public/favicon-32.png /app/public/

ENV VAULT_DIR=/vault \
    CONTENT_DIR=/content \
    DESK_AUTH_HEADER=x-authentik-username \
    PORT=8080
EXPOSE 8080
USER 1000:1000
ENTRYPOINT ["node", "desk/server.ts"]

# ---------------------------------------------------------------------------
FROM base AS builder

ENV ARTICLES_DIR=/content/articles \
    SITE_DIR=/content/site
# Same uid/gid as the vault jobs and the volume's VolSync mover
USER 1000:1000
ENTRYPOINT ["node", "scripts/publish.ts"]
