# Environment Configuration Guide

This guide explains how to use environment variables in the Developer Portfolio project. Environment variables are used to store configuration settings that can vary between environments (development, staging, production) or contain sensitive information like API keys.

## Environment Variable Files

The project uses the following configuration files:

1. **`.env.example`**: A template file showing all supported environment variables with example values. This file is committed to the repository.
2. **`.env`**: Your local environment configuration file containing actual values. This file is NOT committed to the repository for security reasons.

## Setting Up Your Environment

1. Copy the example file to create your local configuration:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file to set the appropriate values for your environment:
   ```
   # Example .env file
   PORT=3001
   NODE_ENV=development
   GITHUB_TOKEN=your_personal_access_token
   ```

## Available Environment Variables

| Variable | Description | Default | Used In |
|----------|-------------|---------|---------|
| `NODE_ENV` | Environment type (development, production, test) | `development` | Server, Client |
| `PORT` | Server port for production | `3001` | Server |
| `VITE_DEV_SERVER_PORT` | Development server port | `3000` | Development |
| `ALLOWED_DOMAINS` | Comma-separated list of domains allowed for CORS | `http://localhost:3001,http://localhost:3000` | Server |
| `GITHUB_TOKEN` | GitHub personal access token for API access | `null` | Client |
| `VITE_ENABLE_PERFORMANCE_MONITORING` | Whether to enable performance monitoring | `true` | Client |
| `VITE_ENABLE_ANIMATIONS` | Whether to enable animations by default | `true` | Client |

## Using Environment Variables

### In Server-side Code

The server uses `process.env` to access environment variables:

```javascript
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
```

### In Client-side Code

In client-side code, access environment variables using the `envConfig` utility:

```javascript
import envConfig from '../utils/envConfig';

// Use environment variables
if (envConfig.isDevelopment) {
  console.log('Running in development mode');
}

// Access specific variables
const githubToken = envConfig.githubToken;
```

## Adding New Environment Variables

When adding new environment variables:

1. Add the variable to `.env.example` with a description and default value
2. Add the variable to the `getConfig` function in `src/utils/envConfig.js`
3. Document the variable in this guide

## GitHub Token

For GitHub API integration, you need a Personal Access Token with the following scopes:
- `read:user`: To view user profile information
- `public_repo`: To access public repository information

To create a token:
1. Go to GitHub Settings > Developer Settings > Personal Access Tokens
2. Click "Generate new token" 
3. Select the required scopes
4. Copy the token to your `.env` file as `GITHUB_TOKEN`

## Security Considerations

1. Never commit your `.env` file to version control
2. Ensure that sensitive variables (like API keys) are not exposed in client-side code
3. Only prefix client-side variables with `VITE_` to ensure they're accessible in the browser
4. Use appropriate validation for environment variables
5. Consider encryption for highly sensitive values

## Environment-specific Configuration

Different environments may require different configurations:

### Development
```
NODE_ENV=development
VITE_ENABLE_PERFORMANCE_MONITORING=true
```

### Production
```
NODE_ENV=production
VITE_ENABLE_PERFORMANCE_MONITORING=false
```

## Troubleshooting

### Environment Variables Not Working

1. Ensure you've created a `.env` file based on `.env.example`
2. Verify the variable is defined in the correct format
3. Check that client-side variables are prefixed with `VITE_`
4. Restart the development server after changing environment variables

### API Keys Not Being Applied

1. Check that the token is properly formatted
2. Verify the token has the required permissions
3. Inspect network requests to ensure the token is being sent correctly