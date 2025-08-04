# Development Environment Setup

This document describes the enhanced development environment for the developer portfolio project.

## Quick Start

```bash
# Start all services (recommended for full development)
yarn dev:all

# Check which services are running
yarn dev:status

# Start only frontend services (Vite + Storybook)
yarn dev:frontend

# Start minimal setup (Vite + Server only)
yarn dev:minimal
```

## Available Development Commands

| Command | Description | Services Started |
|---------|-------------|------------------|
| `yarn dev:all` | Full development environment | Vite, Storybook, Docs, Server |
| `yarn dev:frontend` | Frontend development only | Vite, Storybook |
| `yarn dev:minimal` | Basic development setup | Vite, Server |
| `yarn dev:status` | Check service status | - |
| `yarn dev:help` | Show enhanced help | - |
| `yarn dev:enhanced` | Advanced process manager | All services |

## Service Details

### Vite Development Server
- **Port**: 5173
- **URL**: http://localhost:5173
- **Purpose**: React application development with hot reloading
- **Color**: Cyan

### Storybook
- **Port**: 6006
- **URL**: http://localhost:6006
- **Purpose**: Component documentation and development
- **Color**: Magenta

### Jekyll Documentation
- **Port**: 4000
- **URL**: http://localhost:4000
- **Purpose**: Project documentation site
- **Color**: Yellow
- **Requirements**: Ruby, Jekyll, Bundler

### Express Server
- **Port**: 3001
- **URL**: http://localhost:3001
- **Purpose**: Production-like server for testing builds
- **Color**: Green

## Features

### Color-Coded Output
Each service has a unique color for easy identification in the terminal output.

### Process Management
- **Graceful Shutdown**: Use Ctrl+C to stop all services cleanly
- **Kill Others**: If one service fails, others are terminated
- **Auto-restart**: Services automatically restart on failure (up to 3 attempts)
- **Clear Prefixes**: Each log line shows `[service-name]` prefix
- **Timestamps**: Optional timestamps for debugging

### Service Status
Use `yarn dev:status` to see which services are currently running:
- Green dot (●) = Service is running
- Red dot (○) = Service is stopped

## Process Management

### Starting Services
Services start in parallel with staggered startup to avoid conflicts.

### Stopping Services
- **Ctrl+C**: Graceful shutdown (recommended)
- **Force Kill**: Services are force-killed after 5 seconds if they don't respond

### Restart Behavior
- Services automatically restart on failure
- Maximum 3 restart attempts per service
- 1-second delay between restart attempts

## Troubleshooting

### Port Conflicts
If you encounter port conflicts:

1. Check current port usage: `yarn dev:status`
2. Kill processes using specific ports:
   ```bash
   # Kill process on port 5173 (Vite)
   lsof -ti:5173 | xargs kill -9
   
   # Kill process on port 6006 (Storybook)
   lsof -ti:6006 | xargs kill -9
   ```

### Service Won't Start

1. **Vite Issues**:
   - Ensure dependencies are installed: `yarn install`
   - Check for port conflicts
   - Clear Vite cache: `rm -rf node_modules/.vite`

2. **Storybook Issues**:
   - Verify Storybook configuration
   - Clear Storybook cache: `yarn storybook --reset-cache`

3. **Jekyll Documentation Issues**:
   - Install Ruby dependencies: `cd docs && bundle install`
   - Check Ruby/Jekyll installation
   - Ensure port 4000 is available

4. **Express Server Issues**:
   - Check for missing environment variables
   - Ensure build directory exists if serving static files
   - Check for port conflicts on 3001

### Clean Development Environment

If you encounter persistent issues:

```bash
# Clean all caches and dependencies
yarn clean
yarn install

# Clear specific caches
rm -rf node_modules/.vite
rm -rf node_modules/.cache
```

## Configuration

### Customizing Services
The development environment is configured in `dev.config.js`. You can modify:
- Service ports
- Command arguments
- Colors and names
- Service combinations

### Environment Variables
Services respect these environment variables:
- `PORT`: Override server port (default: 3001)
- `NODE_ENV`: Set environment mode
- `VITE_*`: Vite-specific environment variables

## Advanced Usage

### Custom Process Manager
Use the enhanced process manager for advanced features:
```bash
yarn dev:enhanced [combination]
```

Available combinations:
- `all`: All services
- `frontend`: Vite + Storybook
- `minimal`: Vite + Server
- `docs`: Vite + Documentation

### Direct Concurrently Usage
For maximum control, you can use concurrently directly:
```bash
npx concurrently --kill-others --prefix-colors "cyan,magenta" --names "vite,storybook" "vite" "storybook dev -p 6006"
```

## Tips for Development

1. **Use Multiple Terminals**: Consider running services in separate terminals for easier debugging
2. **Monitor Status**: Regularly check `yarn dev:status` to ensure all needed services are running
3. **Resource Usage**: The full development environment uses significant system resources
4. **Network Access**: All services bind to `0.0.0.0` for network access when needed

## Performance Optimization

- **Selective Services**: Use `dev:frontend` or `dev:minimal` when you don't need all services
- **Resource Monitoring**: Monitor CPU and memory usage with full development environment
- **Port Management**: Close unused services to free up ports and resources