# Deployment Guide

This guide covers deploying the Derek Mackley Portfolio across three separate Docker images for Kubernetes deployment.

## Architecture Overview

The portfolio consists of three separate applications:
- **Main Portfolio**: React application with the main website
- **Storybook**: Component library documentation
- **Documentation**: Jekyll-based technical documentation

Each can be built and deployed independently with cross-site navigation support.

## Environment Variables

All three applications support these environment variables for dynamic URL configuration:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SITE_MAIN_URL` | URL for the main portfolio site | `https://derekmackley.com` |
| `VITE_SITE_STORYBOOK_URL` | URL for the Storybook site | `https://storybook.derekmackley.com` |
| `VITE_SITE_DOCS_URL` | URL for the documentation site | `https://docs.derekmackley.com` |
| `VITE_SITE_NAVIGATOR_ENABLED` | Enable/disable site navigator | `true` (default) |

## Building Docker Images

### 1. Main Portfolio

```bash
# Build from project root
docker build \
  --build-arg VITE_SITE_MAIN_URL=https://derekmackley.com \
  --build-arg VITE_SITE_STORYBOOK_URL=https://storybook.derekmackley.com \
  --build-arg VITE_SITE_DOCS_URL=https://docs.derekmackley.com \
  -t portfolio-main .
```

**Port**: 3001

### 2. Storybook

```bash
# Build from project root
docker build \
  -f Dockerfile.storybook \
  --build-arg VITE_SITE_MAIN_URL=https://derekmackley.com \
  --build-arg VITE_SITE_STORYBOOK_URL=https://storybook.derekmackley.com \
  --build-arg VITE_SITE_DOCS_URL=https://docs.derekmackley.com \
  -t portfolio-storybook .
```

**Port**: 6006

### 3. Documentation

```bash
# Build from project root
docker build \
  -f docs/Dockerfile \
  --build-arg VITE_SITE_MAIN_URL=https://derekmackley.com \
  --build-arg VITE_SITE_STORYBOOK_URL=https://storybook.derekmackley.com \
  --build-arg VITE_SITE_DOCS_URL=https://docs.derekmackley.com \
  -t portfolio-docs .
```

**Port**: 4000

## Kubernetes Deployment

### Example Deployment Manifests

#### 1. Main Portfolio Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-main
spec:
  replicas: 2
  selector:
    matchLabels:
      app: portfolio-main
  template:
    metadata:
      labels:
        app: portfolio-main
    spec:
      containers:
      - name: portfolio-main
        image: portfolio-main:latest
        ports:
        - containerPort: 3001
        env:
        - name: PORT
          value: "3001"
        - name: ALLOWED_DOMAINS
          value: "https://derekmackley.com"
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /healthz
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /healthz
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: portfolio-main-service
spec:
  selector:
    app: portfolio-main
  ports:
  - port: 80
    targetPort: 3001
  type: ClusterIP
```

#### 2. Storybook Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-storybook
spec:
  replicas: 1
  selector:
    matchLabels:
      app: portfolio-storybook
  template:
    metadata:
      labels:
        app: portfolio-storybook
    spec:
      containers:
      - name: portfolio-storybook
        image: portfolio-storybook:latest
        ports:
        - containerPort: 6006
        resources:
          requests:
            memory: "128Mi"
            cpu: "50m"
          limits:
            memory: "256Mi"
            cpu: "100m"
        livenessProbe:
          httpGet:
            path: /
            port: 6006
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 6006
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: portfolio-storybook-service
spec:
  selector:
    app: portfolio-storybook
  ports:
  - port: 80
    targetPort: 6006
  type: ClusterIP
```

#### 3. Documentation Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-docs
spec:
  replicas: 1
  selector:
    matchLabels:
      app: portfolio-docs
  template:
    metadata:
      labels:
        app: portfolio-docs
    spec:
      containers:
      - name: portfolio-docs
        image: portfolio-docs:latest
        ports:
        - containerPort: 4000
        resources:
          requests:
            memory: "64Mi"
            cpu: "25m"
          limits:
            memory: "128Mi"
            cpu: "50m"
        livenessProbe:
          httpGet:
            path: /
            port: 4000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 4000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: portfolio-docs-service
spec:
  selector:
    app: portfolio-docs
  ports:
  - port: 80
    targetPort: 4000
  type: ClusterIP
```

#### 4. Ingress Configuration

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: portfolio-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - derekmackley.com
    - storybook.derekmackley.com
    - docs.derekmackley.com
    secretName: portfolio-tls
  rules:
  - host: derekmackley.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: portfolio-main-service
            port:
              number: 80
  - host: storybook.derekmackley.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: portfolio-storybook-service
            port:
              number: 80
  - host: docs.derekmackley.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: portfolio-docs-service
            port:
              number: 80
```

## Site Navigator Features

Each deployment includes a cross-site navigation component that:

- Automatically detects the current site
- Provides navigation to other sites
- Positions itself on the left middle of the viewport
- Supports keyboard navigation and accessibility
- Works across all three different tech stacks (React, Storybook, Jekyll)

### Disabling Site Navigator

To disable the site navigator for any deployment:

```bash
docker build --build-arg VITE_SITE_NAVIGATOR_ENABLED=false ...
```

## Security Features

All containers include:
- Non-root user execution
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Gzip compression
- Health checks
- Resource limits
- File access restrictions

## Monitoring

Each service exposes health check endpoints:
- **Main Portfolio**: `/healthz` on port 3001
- **Storybook**: `/` on port 6006  
- **Documentation**: `/` on port 4000

## Development vs Production

The site navigator automatically detects the environment:
- **Development**: Uses localhost with different ports
- **Production**: Uses the configured environment variable URLs

## CI/CD Integration

Example GitHub Actions workflow for building and pushing images:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: [main, storybook, docs]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Build and push Docker image
      run: |
        if [ "${{ matrix.service }}" = "main" ]; then
          docker build \
            --build-arg VITE_SITE_MAIN_URL=${{ secrets.MAIN_URL }} \
            --build-arg VITE_SITE_STORYBOOK_URL=${{ secrets.STORYBOOK_URL }} \
            --build-arg VITE_SITE_DOCS_URL=${{ secrets.DOCS_URL }} \
            -t ${{ secrets.REGISTRY }}/portfolio-main:${{ github.sha }} .
        elif [ "${{ matrix.service }}" = "storybook" ]; then
          docker build \
            -f Dockerfile.storybook \
            --build-arg VITE_SITE_MAIN_URL=${{ secrets.MAIN_URL }} \
            --build-arg VITE_SITE_STORYBOOK_URL=${{ secrets.STORYBOOK_URL }} \
            --build-arg VITE_SITE_DOCS_URL=${{ secrets.DOCS_URL }} \
            -t ${{ secrets.REGISTRY }}/portfolio-storybook:${{ github.sha }} .
        else
          docker build \
            -f docs/Dockerfile \
            --build-arg VITE_SITE_MAIN_URL=${{ secrets.MAIN_URL }} \
            --build-arg VITE_SITE_STORYBOOK_URL=${{ secrets.STORYBOOK_URL }} \
            --build-arg VITE_SITE_DOCS_URL=${{ secrets.DOCS_URL }} \
            -t ${{ secrets.REGISTRY }}/portfolio-docs:${{ github.sha }} .
        fi
```

## Troubleshooting

### Common Issues

1. **Site Navigator not appearing**: Check that `VITE_SITE_NAVIGATOR_ENABLED` is set to `true`
2. **Navigation not working**: Verify URLs are correctly configured and accessible
3. **Build failures**: Ensure build context is set to project root for all Dockerfiles

### Logs

Check application logs for each service:
```bash
kubectl logs -f deployment/portfolio-main
kubectl logs -f deployment/portfolio-storybook  
kubectl logs -f deployment/portfolio-docs
```