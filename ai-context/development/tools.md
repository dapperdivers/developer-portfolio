# Development Tools

This document outlines the development tools and environment setup used in the Developer Portfolio project. Following these guidelines ensures a consistent development experience across the team.

## Core Development Tools

### Node.js and npm

The project uses Node.js as the JavaScript runtime and npm for package management.

**Required versions:**
- Node.js: v18.x or later
- npm: v9.x or later

**Installation:**
```bash
# Using nvm (recommended)
nvm install 18
nvm use 18

# Or download directly from nodejs.org
```

### Version Control

The project uses Git for version control and GitHub for hosting the repository.

**Required tools:**
- Git: v2.30.0 or later
- GitHub CLI (optional): v2.0.0 or later

**Configuration:**
```bash
# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set up GitHub CLI
gh auth login
```

## Build Tools

### Vite

The project uses Vite as the build tool and development server.

**Configuration:**
- Main configuration: `vite.config.ts`
- Environment-specific configurations in `config/vite/` directory

**Key scripts:**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### TypeScript

TypeScript is used for type checking and improved developer experience.

**Configuration:**
- Main configuration: `tsconfig.json`
- Types defined in `src/types/` directory

**Key scripts:**
```bash
# Type check
npm run typecheck

# Generate types
npm run generate-types
```

## Code Quality Tools

### ESLint

ESLint is used for static code analysis and enforcing coding standards.

**Configuration:**
- Main configuration: `eslint.config.ts`
- Custom rules in `.eslintplugins/` directory

**Key scripts:**
```bash
# Lint code
npm run lint

# Lint and fix automatically
npm run lint:fix
```

### Prettier

Prettier is used for code formatting.

**Configuration:**
- Configuration is included in ESLint config

**Key scripts:**
```bash
# Format code
npm run format
```

### Husky and lint-staged

Husky and lint-staged are used to run linting and formatting on staged files before commits.

**Configuration:**
- Husky hooks in `.husky/` directory
- lint-staged configuration in `package.json`

## Testing Tools

### Vitest

Vitest is used for unit and integration testing.

**Configuration:**
- Main configuration: `vitest.config.ts`
- Test-specific configurations in `config/test/` directory

**Key scripts:**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Playwright

Playwright is used for end-to-end testing.

**Configuration:**
- Main configuration: `playwright.config.js`
- Test files in `e2e/` directory

**Key scripts:**
```bash
# Run e2e tests
npm run test:e2e

# Run e2e tests in headed mode
npm run test:e2e:headed
```

### Testing Library

React Testing Library is used for component testing.

**Usage:**
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Development Environment

### VS Code

VS Code is the recommended code editor for the project.

**Required extensions:**
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Vite
- Jest Runner

**Recommended settings:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### Browser DevTools

Browser DevTools are essential for debugging and performance analysis.

**Recommended extensions:**
- React Developer Tools
- Redux DevTools (if using Redux)
- Axe DevTools (for accessibility testing)

## Documentation Tools

### Storybook

Storybook is used for component documentation and development.

**Configuration:**
- Main configuration: `.storybook/main.ts`
- Preview configuration: `.storybook/preview.ts`

**Key scripts:**
```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

### Docsify

Docsify is used for project documentation.

**Configuration:**
- Main configuration: `docs/index.html`
- Documentation files in `docs/` directory

**Key scripts:**
```bash
# Start documentation server
npm run docs

# Build documentation
npm run docs:build
```

## CI/CD Tools

### GitHub Actions

GitHub Actions is used for continuous integration and deployment.

**Configuration:**
- Workflow files in `.github/workflows/` directory

**Key workflows:**
- CI: Runs on pull requests to verify code quality and tests
- CD: Runs on merges to main branch to deploy to staging
- Release: Runs on tags to deploy to production

### Vercel

Vercel is used for hosting and deployment.

**Configuration:**
- Main configuration: `vercel.json`

**Key integrations:**
- GitHub integration for automatic deployments
- Preview deployments for pull requests
- Production deployments for main branch

## Dependency Management

### npm

npm is used for dependency management.

**Key files:**
- `package.json`: Main package configuration
- `package-lock.json`: Lock file for deterministic installations

**Key scripts:**
```bash
# Install dependencies
npm install

# Update dependencies
npm update

# Audit dependencies for security issues
npm audit

# Fix security issues
npm audit fix
```

### mise

mise is used for managing tool versions.

**Configuration:**
- Main configuration: `.mise.toml`

**Key commands:**
```bash
# Install required tools
mise install

# Update tools
mise update
```

## Project Scripts

### Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Analyze bundle size
npm run analyze
```

### Testing Scripts

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e

# Run e2e tests in headed mode
npm run test:e2e:headed
```

### Code Quality Scripts

```bash
# Lint code
npm run lint

# Lint and fix automatically
npm run lint:fix

# Format code
npm run format

# Type check
npm run typecheck
```

### Documentation Scripts

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook

# Start documentation server
npm run docs

# Build documentation
npm run docs:build
```

### Utility Scripts

```bash
# Generate component
npm run generate-component

# Optimize images
npm run optimize-images

# Validate configuration
npm run validate-config
```

## Environment Configuration

### Environment Variables

Environment variables are used for configuration.

**Key files:**
- `.env.example`: Example environment variables
- `.env.development`: Development environment variables
- `.env.production`: Production environment variables
- `.env.test`: Test environment variables

**Usage:**
```jsx
// Access environment variables
const apiUrl = import.meta.env.VITE_API_URL;
```

### Feature Flags

Feature flags are used to enable or disable features.

**Configuration:**
- Feature flags defined in `src/utils/envConfig.js`

**Usage:**
```jsx
import { isFeatureEnabled } from '../utils/envConfig';

if (isFeatureEnabled('NEW_FEATURE')) {
  // Use new feature
}
```

## Development Workflow

### 1. Setup Development Environment

```bash
# Clone repository
git clone https://github.com/username/developer-portfolio.git
cd developer-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Create Feature Branch

```bash
# Create and checkout feature branch
git checkout -b feature/new-feature
```

### 3. Implement Feature

1. Write tests for the feature
2. Implement the feature
3. Document the feature in Storybook
4. Update project documentation if needed

### 4. Verify Changes

```bash
# Run tests
npm test

# Run linting
npm run lint

# Check types
npm run typecheck

# Build for production
npm run build
```

### 5. Create Pull Request

```bash
# Push changes
git push origin feature/new-feature

# Create pull request using GitHub CLI
gh pr create --title "Add new feature" --body "Description of the feature"
```

### 6. Review and Merge

1. Address review comments
2. Ensure CI checks pass
3. Merge pull request

## Resources

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [ESLint Documentation](https://eslint.org/docs/user-guide/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [Vitest Documentation](https://vitest.dev/guide/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)