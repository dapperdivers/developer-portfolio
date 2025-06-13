# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated deployment and CI/CD.

## Workflows

### `deploy-docs.yml`
Automatically deploys the Jekyll documentation site to GitHub Pages when changes are pushed to the `docs/` directory.

**Triggers:**
- Push to `master` or `main` branch with changes in `docs/` directory
- Pull requests to `master` or `main` branch with changes in `docs/` directory  
- Manual trigger via GitHub Actions UI

**Features:**
- Ruby 3.1 environment setup
- Bundler caching for faster builds
- Production Jekyll build with proper baseurl
- Automatic deployment to GitHub Pages
- Concurrent deployment protection

**Requirements:**
- GitHub Pages must be enabled in repository settings
- Source should be set to "GitHub Actions" in Pages settings
- Repository must have Pages write permissions (automatically handled by workflow)

## Setup Instructions

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"
   - Save settings

2. **First Deployment:**
   - Push changes to `docs/` directory
   - Workflow will automatically trigger
   - Site will be available at `https://[username].github.io/[repository-name]/`

3. **Manual Deployment:**
   - Go to Actions tab in repository
   - Select "Deploy Documentation to GitHub Pages" workflow
   - Click "Run workflow" button

## Monitoring

- View workflow runs in the Actions tab
- Check deployment status in the Pages section of repository settings
- Monitor build logs for any issues with Jekyll compilation