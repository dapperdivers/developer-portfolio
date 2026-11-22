# Blog builder: builds derekmackley.com/blog from pushed articles and switches the live
# site over atomically (scripts/publish.ts). Runs as a CronJob with the blog-content
# volume mounted at /content: it reads /content/articles and writes /content/site.
# It never sees the Obsidian vault.
#
# Build context is the repository root (the blog imports the portfolio's design tokens
# and React components from ../src):
#   docker build -f blog/Dockerfile -t developer-portfolio-blog .

# syntax=docker/dockerfile:1
FROM node:22-alpine

ENV NODE_ENV=production \
    ASTRO_TELEMETRY_DISABLED=1 \
    ARTICLES_DIR=/content/articles \
    SITE_DIR=/content/site

WORKDIR /app/blog

# Dependencies first, for layer caching. Dev tools (astro check, typescript) are not needed to build.
COPY blog/package.json blog/yarn.lock ./
RUN yarn install --frozen-lockfile --production --non-interactive \
    && yarn cache clean

# The shared portfolio source the blog imports (tokens, props-only components, site links)
COPY src /app/src
COPY blog/ /app/blog/

# Prove the image can build before it is published (the sample articles only)
RUN ARTICLES_DIR=/app/blog/fixtures/articles SITE_DIR=/tmp/selftest node scripts/publish.ts \
    && test -f /tmp/selftest/current/sample-article-format/index.html \
    && rm -rf /tmp/selftest /tmp/blog-*

# BUILD_ID makes a new image rebuild the site even when the articles did not change
ARG BUILD_ID=dev
ENV BUILD_ID=${BUILD_ID}

# Same uid/gid as the vault jobs and the volume's VolSync mover
USER 1000:1000
ENTRYPOINT ["node", "scripts/publish.ts"]
