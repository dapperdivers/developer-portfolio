#!/bin/bash
set -e

# Developer Portfolio Kubernetes Deployment Script
# Usage: ./deploy.sh [environment] [registry] [chart_version]

ENVIRONMENT=${1:-staging}
REGISTRY=${2:-ghcr.io/dapperdivers}
CHART_VERSION=${3:-latest}
NAMESPACE="portfolio-${ENVIRONMENT}"

echo "🚀 Deploying Developer Portfolio to ${ENVIRONMENT}"

# Option 1: Use published chart from OCI registry
if [[ "$CHART_VERSION" != "local" ]]; then
  echo "📦 Using published chart version: ${CHART_VERSION}"
  
  # Create namespace if it doesn't exist
  kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -
  
  # Deploy with published Helm chart
  echo "⚙️  Deploying from OCI registry..."
  helm upgrade --install portfolio-${ENVIRONMENT} \
    oci://ghcr.io/dapperdivers/developer-portfolio \
    --version ${CHART_VERSION} \
    --namespace ${NAMESPACE} \
    --set global.registry=${REGISTRY} \
    --set ingress.hosts[0].host=${ENVIRONMENT}.your-domain.com \
    --wait --timeout=10m

else
  # Option 2: Local development with custom images
  echo "📦 Building and pushing Docker images..."
  
  # Main app
  docker build -t ${REGISTRY}/developer-portfolio:latest .
  docker push ${REGISTRY}/developer-portfolio:latest
  
  # Storybook
  docker build -f Dockerfile.storybook -t ${REGISTRY}/developer-portfolio-storybook:latest .
  docker push ${REGISTRY}/developer-portfolio-storybook:latest
  
  # Jekyll docs
  docker build -f docs/Dockerfile -t ${REGISTRY}/developer-portfolio-docs:latest ./docs
  docker push ${REGISTRY}/developer-portfolio-docs:latest
  
  # Create namespace if it doesn't exist
  kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -
  
  # Deploy with local Helm chart
  echo "⚙️  Deploying with local chart..."
  helm upgrade --install portfolio-${ENVIRONMENT} ./k8s/charts/developer-portfolio \
    --namespace ${NAMESPACE} \
    --set global.registry=${REGISTRY} \
    --set ingress.hosts[0].host=${ENVIRONMENT}.your-domain.com \
    --wait --timeout=10m
fi

echo "✅ Deployment complete!"
echo "🌐 Access your services:"
echo "   Main App: https://${ENVIRONMENT}.your-domain.com"
echo "   Storybook: https://${ENVIRONMENT}.your-domain.com/storybook"
echo "   Docs: https://${ENVIRONMENT}.your-domain.com/docs"

echo ""
echo "📊 Monitor your deployment:"
echo "   kubectl get pods -n ${NAMESPACE}"
echo "   kubectl get services -n ${NAMESPACE}"