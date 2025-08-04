# Security Guidelines for Developer Portfolio Helm Chart

## OCI Registry Security

### Authentication

This chart is published to GitHub Container Registry (GHCR) as an OCI artifact. Authentication methods:

1. **Personal Access Token (Recommended for CI/CD)**
   ```bash
   echo $GITHUB_TOKEN | helm registry login ghcr.io -u USERNAME --password-stdin
   ```

2. **GitHub CLI (Recommended for development)**
   ```bash
   gh auth login
   gh auth token | helm registry login ghcr.io -u USERNAME --password-stdin
   ```

### Registry Permissions

Required permissions for accessing the chart:
- `read:packages` - To pull/install charts
- `write:packages` - To push new chart versions (CI/CD only)

### Chart Signing and Verification

The chart supports content verification through:

1. **Digest Verification**
   ```bash
   # Pull by digest for immutable reference
   helm pull oci://ghcr.io/dapperdivers/developer-portfolio@sha256:abc123...
   ```

2. **Provenance (Future Enhancement)**
   - Chart signing with cosign
   - SLSA attestations
   - Build provenance tracking

## Kubernetes Security Best Practices

### Pod Security Standards

The chart implements security best practices:

```yaml
# Security contexts applied by default
podSecurityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 1000

securityContext:
  allowPrivilegeEscalation: false
  capabilities:
    drop:
    - ALL
  readOnlyRootFilesystem: false  # Set to true if your app supports it
  runAsNonRoot: true
  runAsUser: 1000
```

### Network Security

1. **Network Policies** (Optional)
   ```yaml
   # Example network policy (not included by default)
   apiVersion: networking.k8s.io/v1
   kind: NetworkPolicy
   metadata:
     name: developer-portfolio-netpol
   spec:
     podSelector:
       matchLabels:
         app.kubernetes.io/name: developer-portfolio
     policyTypes:
     - Ingress
     - Egress
     ingress:
     - from:
       - namespaceSelector:
           matchLabels:
             name: ingress-nginx
       ports:
       - protocol: TCP
         port: 3001
   ```

2. **TLS Configuration**
   ```yaml
   ingress:
     tls:
       - secretName: portfolio-tls
         hosts:
           - your-domain.com
   ```

### RBAC

The chart creates a ServiceAccount with minimal permissions:

```yaml
serviceAccount:
  create: true
  name: ""  # Auto-generated if empty
  annotations: {}
```

For production deployments, consider:
- Using Workload Identity (GKE) or IAM Roles for Service Accounts (EKS)
- Implementing Pod Security Policies or Pod Security Standards
- Using admission controllers like OPA Gatekeeper

## Container Image Security

### Image Scanning

All referenced images should be scanned for vulnerabilities:

```bash
# Example using trivy
trivy image ghcr.io/dapperdivers/developer-portfolio:latest
trivy image ghcr.io/dapperdivers/developer-portfolio-storybook:latest
trivy image ghcr.io/dapperdivers/developer-portfolio-docs:latest
```

### Base Image Security

The application containers should:
- Use minimal base images (Alpine, Distroless)
- Run as non-root users
- Have regular security updates
- Use specific version tags, not `latest`

### Image Pull Policies

```yaml
# Recommended for production
global:
  pullPolicy: Always  # For latest tags
  # or
  pullPolicy: IfNotPresent  # For specific version tags
```

## Secrets Management

### Sensitive Data Handling

1. **Never include secrets in values files**
   ```yaml
   # BAD - Don't do this
   database:
     password: "plaintext-password"
   
   # GOOD - Use secret references
   database:
     passwordSecret:
       name: db-credentials
       key: password
   ```

2. **Use external secret management**
   - External Secrets Operator
   - HashiCorp Vault
   - AWS Secrets Manager
   - Azure Key Vault
   - Google Secret Manager

### TLS Certificates

```yaml
# Use cert-manager for automatic certificate management
ingress:
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
  tls:
    - secretName: portfolio-tls-auto
      hosts:
        - your-domain.com
```

## Monitoring and Auditing

### Security Monitoring

1. **Pod Security Violations**
   ```bash
   # Check for security policy violations
   kubectl get events --field-selector reason=FailedCreate
   ```

2. **Audit Logs**
   - Enable Kubernetes audit logging
   - Monitor chart installations/upgrades
   - Track configuration changes

### Health Checks

The chart includes comprehensive health checks:

```yaml
healthCheck:
  enabled: true
  path: /healthz
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
```

## Compliance Considerations

### Data Privacy

- Ensure proper data handling for user portfolios
- Implement appropriate data retention policies
- Consider GDPR/CCPA requirements if applicable

### Industry Standards

- SOC 2 compliance considerations
- ISO 27001 alignment
- CIS Kubernetes Benchmark compliance

## Incident Response

### Chart Security Issues

If you discover a security vulnerability:

1. **Do not** create a public GitHub issue
2. Email security concerns to: derek@chelonianlabs.com
3. Include:
   - Chart version affected
   - Description of the vulnerability
   - Steps to reproduce
   - Suggested fix (if available)

### Emergency Response

For critical security issues:
1. Immediate chart version update
2. Security advisory publication
3. Automated notification to users

## Security Checklist

Before deploying to production:

- [ ] Review all container images for vulnerabilities
- [ ] Implement network policies if required
- [ ] Configure proper RBAC
- [ ] Enable audit logging
- [ ] Set up security monitoring
- [ ] Validate TLS configuration
- [ ] Review resource limits and requests
- [ ] Implement backup and disaster recovery
- [ ] Document security procedures
- [ ] Conduct security testing

## Updates and Maintenance

- Regularly update chart dependencies
- Monitor for security advisories
- Keep Kubernetes cluster updated
- Review and rotate credentials periodically
- Conduct security assessments

For the latest security information, check:
- [GitHub Security Advisories](https://github.com/DapperDivers/developer-portfolio/security/advisories)
- [Chart Release Notes](https://github.com/DapperDivers/developer-portfolio/releases)