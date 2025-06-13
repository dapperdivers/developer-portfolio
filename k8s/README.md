# Kubernetes Deployment

This directory contains Helm charts and deployment scripts for the Developer Portfolio application suite.

## Architecture

The application is deployed as three separate services:

- **Main App** (`developer-portfolio:latest`) - React portfolio application on port 3001
- **Storybook** (`developer-portfolio-storybook:latest`) - Component documentation on port 6006  
- **Jekyll Docs** (`developer-portfolio-docs:latest`) - Technical documentation on port 4000

## Development Setup

```bash
# Run all services locally
yarn dev:all

# Or run individually:
yarn dev              # Main React app
yarn storybook        # Storybook
yarn dev:docs         # Jekyll docs
```

## Production Deployment

### Prerequisites

- Kubernetes cluster
- Helm 3.x
- kubectl configured

### Option 1: Published Chart (Recommended)

Use the published chart from GitHub Container Registry:

```bash
# Deploy latest version
helm install portfolio oci://ghcr.io/dapperdivers/developer-portfolio \
  --set ingress.hosts[0].host=your-domain.com

# Deploy specific version
helm install portfolio oci://ghcr.io/dapperdivers/developer-portfolio \
  --version 0.1.0 \
  --set ingress.hosts[0].host=your-domain.com

# Quick deploy with script
./deploy.sh staging ghcr.io/dapperdivers 0.1.0
```

### Option 2: Local Development

For local development with custom builds:

```bash
# Deploy with local chart and custom images
./deploy.sh staging your-registry.com local
```

### Chart Publishing

The chart is automatically published to `ghcr.io/dapperdivers/developer-portfolio` when:
- Changes are pushed to the `k8s/charts/` directory
- A new release is created
- Manually triggered via GitHub Actions

### Manual Chart Operations

```bash
# Install from local chart
helm install portfolio ./charts/developer-portfolio \
  --set global.registry=your-registry.com \
  --set ingress.hosts[0].host=your-domain.com

# Add the OCI repository
helm repo add portfolio oci://ghcr.io/dapperdivers

# Search available versions
helm search repo portfolio
```

### Configuration

Update `values.yaml` to customize:

- Resource limits and requests
- Scaling policies
- Domain names and SSL certificates
- Environment variables
- Security contexts

### Monitoring

The deployment includes:

- Health checks for all services
- Horizontal Pod Autoscaling (HPA) for main app
- Resource limits and requests
- Security contexts with non-root users
- Ingress with SSL termination

### Troubleshooting

```bash
# Check pod status
kubectl get pods -n portfolio-staging

# View logs
kubectl logs -f deployment/main-app -n portfolio-staging
kubectl logs -f deployment/storybook -n portfolio-staging
kubectl logs -f deployment/docs -n portfolio-staging

# Debug ingress
kubectl describe ingress -n portfolio-staging
```