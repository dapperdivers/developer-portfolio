# Developer Portfolio Helm Chart

A comprehensive Helm chart for deploying Derek Mackley's Developer Portfolio, including a React application, Storybook component library, and Jekyll documentation site.

## Installation from OCI Registry

This chart is published as an OCI artifact to GitHub Container Registry.

### Prerequisites

- Kubernetes 1.19+
- Helm 3.8+ (OCI support)

### Quick Start

```bash
# Add the OCI registry (optional, for convenience)
helm registry login ghcr.io -u YOUR_USERNAME

# Install the chart directly from OCI registry
helm install my-portfolio oci://ghcr.io/dapperdivers/developer-portfolio --version 0.1.0

# Or pull first, then install
helm pull oci://ghcr.io/dapperdivers/developer-portfolio --version 0.1.0
helm install my-portfolio ./developer-portfolio-0.1.0.tgz
```

### Available Versions

Check available versions:
```bash
# Using Helm (requires authentication)
helm show versions oci://ghcr.io/dapperdivers/developer-portfolio

# Using Docker/OCI tools
docker pull ghcr.io/dapperdivers/developer-portfolio:0.1.0
```

## Configuration

The following table lists the configurable parameters and their default values.

### Global Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `global.registry` | Container registry for all images | `ghcr.io/dapperdivers` |
| `global.pullPolicy` | Image pull policy | `IfNotPresent` |

### Main Application

| Parameter | Description | Default |
|-----------|-------------|---------|
| `mainApp.enabled` | Enable the main React application | `true` |
| `mainApp.replicaCount` | Number of replicas | `2` |
| `mainApp.image.repository` | Image repository | `developer-portfolio` |
| `mainApp.image.tag` | Image tag | `latest` |
| `mainApp.service.port` | Service port | `3001` |
| `mainApp.resources.limits.cpu` | CPU limit | `500m` |
| `mainApp.resources.limits.memory` | Memory limit | `512Mi` |
| `mainApp.autoscaling.enabled` | Enable HPA | `true` |
| `mainApp.autoscaling.minReplicas` | Minimum replicas | `2` |
| `mainApp.autoscaling.maxReplicas` | Maximum replicas | `10` |

### Storybook

| Parameter | Description | Default |
|-----------|-------------|---------|
| `storybook.enabled` | Enable Storybook | `true` |
| `storybook.replicaCount` | Number of replicas | `1` |
| `storybook.image.repository` | Image repository | `developer-portfolio-storybook` |
| `storybook.service.port` | Service port | `6006` |

### Documentation

| Parameter | Description | Default |
|-----------|-------------|---------|
| `docs.enabled` | Enable Jekyll docs | `true` |
| `docs.replicaCount` | Number of replicas | `1` |
| `docs.image.repository` | Image repository | `developer-portfolio-docs` |
| `docs.service.port` | Service port | `4000` |

### Ingress

| Parameter | Description | Default |
|-----------|-------------|---------|
| `ingress.enabled` | Enable ingress | `true` |
| `ingress.className` | Ingress class | `nginx` |
| `ingress.hosts[0].host` | Hostname | `your-domain.com` |
| `ingress.tls[0].secretName` | TLS secret name | `portfolio-tls` |

## Examples

### Basic Installation

```bash
helm install my-portfolio oci://ghcr.io/dapperdivers/developer-portfolio --version 0.1.0
```

### Installation with Custom Values

```bash
# Create values file
cat > my-values.yaml << EOF
ingress:
  enabled: true
  hosts:
    - host: portfolio.example.com
      paths:
        - path: /
          pathType: Prefix
          service: main-app
        - path: /storybook
          pathType: Prefix
          service: storybook
        - path: /docs
          pathType: Prefix
          service: docs
  tls:
    - secretName: portfolio-tls
      hosts:
        - portfolio.example.com

mainApp:
  autoscaling:
    targetCPUUtilizationPercentage: 80
    maxReplicas: 15
EOF

helm install my-portfolio oci://ghcr.io/dapperdivers/developer-portfolio --version 0.1.0 -f my-values.yaml
```

### Upgrade

```bash
helm upgrade my-portfolio oci://ghcr.io/dapperdivers/developer-portfolio --version 0.2.0
```

### Uninstall

```bash
helm uninstall my-portfolio
```

## Development

### Chart Development

```bash
# Clone the repository
git clone https://github.com/DapperDivers/developer-portfolio.git
cd developer-portfolio/k8s/charts/developer-portfolio

# Test the chart
helm lint .
helm template test-release . --debug

# Install for testing
helm install test-release .
```

### Publishing New Versions

The chart is automatically published to the OCI registry via GitHub Actions when:
- Changes are pushed to the `master` branch in the `k8s/charts/` directory
- A new release is created
- Manual workflow dispatch is triggered

## Troubleshooting

### Common Issues

1. **Authentication to OCI Registry**
   ```bash
   # Login to GitHub Container Registry
   echo $GITHUB_TOKEN | helm registry login ghcr.io -u USERNAME --password-stdin
   ```

2. **Chart Not Found**
   ```bash
   # Verify chart exists
   helm show chart oci://ghcr.io/dapperdivers/developer-portfolio --version 0.1.0
   ```

3. **Permission Denied**
   - Ensure your GitHub token has `read:packages` permission
   - The repository must have package visibility set appropriately

### Debugging

```bash
# Check running pods
kubectl get pods -l "app.kubernetes.io/instance=my-portfolio"

# Check services
kubectl get services -l "app.kubernetes.io/instance=my-portfolio"

# Check ingress
kubectl get ingress -l "app.kubernetes.io/instance=my-portfolio"

# View logs
kubectl logs -l "app.kubernetes.io/name=developer-portfolio"
```

## Contributing

1. Fork the repository
2. Make your changes to the chart
3. Test locally using `helm lint` and `helm template`
4. Submit a pull request

## License

This chart is licensed under the MIT License. See the LICENSE file for details.