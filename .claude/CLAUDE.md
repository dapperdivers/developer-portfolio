# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT
- This portfolio demonstrates professional React development practices with enterprise-level component architecture, comprehensive testing, and performance optimization.
- when styling, refrain from using !important, and do your best to use the var(--{variant}) instead of using rgba(x,x,x,x)
- remember not to start any services manually, always run 'yarn dev:all'
- the latest version of storybook removed the need for the acorn '@' "@storybook/test"  please import any storybook/* like this "storybook/test";
- always add a *.story.tsx and *.css when creating new components

## Development Commands

### Essential Build and Development Commands
- `yarn dev:all` - Start all services (Vite, Storybook, docs, server)


### Testing and Quality Commands
- `yarn test` - Run Vitest unit tests
- `yarn test:watch` - Run tests in watch mode
- `yarn check` - Run both typecheck and lint in parallel
- `yarn typecheck` - TypeScript type checking (no emit)
- `yarn lint` - ESLint for src directory
- `yarn lint:fix` - ESLint with auto-fix
- `yarn format` - Format code with Prettier

## Project Architecture

### Component Architecture - Atomic Design System
This portfolio follows **atomic design principles** with 71+ components organized by complexity:

- **Atoms** (`src/components/atoms/`) - Basic building blocks (Button, Card, Loading, Progress, etc.)
- **Molecules** (`src/components/molecules/`) - Simple component groups (EducationCard, ExperienceCard, SocialLinks, etc.)
- **Organisms** (`src/components/organisms/`) - Complex components (Experience, Education, Projects, Skills, etc.)
- **Layout** (`src/components/layout/`) - Page structure components (Navigation, Footer, Section, Background)

### Key Architectural Patterns
- **Path Aliases**: Comprehensive alias system (@components, @atoms, @molecules, @organisms, @layout, @assets, @utils, @hooks, @context)
- **Context-Based State Management**: Portfolio data managed through React Context (src/context/PortfolioContext.jsx)
- **Custom Hooks**: Reusable logic in src/hooks/ (useExperience, useProjects, useSkills, etc.)
- **Design System**: CSS design tokens in src/assets/css/design-system/ with consistent styling patterns
- **Performance Optimizations**: Lazy loading, memoization, and intersection observers throughout components

### Portfolio Data Configuration
Central portfolio configuration in `src/portfolio.js` contains:
- Personal information and greetings
- Skills and proficiency data with security domain categorization
- Work experience with detailed descriptions
- Project showcase data
- Education and certification information
- Social links and contact details

## Storybook Development Environment

### Professional Storybook Setup
This project features **68+ interactive stories** demonstrating enterprise-level component development:

- **Advanced Configuration** with TypeScript and Vite integration in `.storybook/main.ts`
- **Decorator System** for consistent component testing with context providers
- **Mock Data Architecture** for isolated component development
- **Comprehensive Story Coverage**: Default, Variants, States, Accessibility, and Responsive stories for each component
- **Interaction Testing** with @storybook/testing-library for user flow validation

### Story Development Standards
Each component follows professional documentation patterns:
- Complete prop documentation with ArgTypes
- Accessibility compliance testing (WCAG 2.1 AA)
- Responsive design validation across viewports
- Performance testing with loading states
- Security-themed component variants

## Testing Strategy

### Testing Framework Setup
- **Vitest** for unit and integration testing with src root configuration
- **Testing Library** for component testing with user-centric queries
- **Storybook Interaction Testing** for complex component behaviors
- **TypeScript Support** with proper test setup in src/test/

### Testing Best Practices
- Mock implementations in src/__mocks__/ for external dependencies
- Component-specific test files alongside components
- Performance monitoring integration with custom hooks
- Accessibility testing integrated into Storybook stories

## Code Quality and Standards

### ESLint Configuration
Modern ESLint flat config (eslint.config.ts) with:
- TypeScript support via @typescript-eslint
- Separate rules for JS/JSX and TS/TSX files
- Comprehensive global definitions for browser, Node.js, and testing environments
- SARIF reporting support for CI/CD integration

### TypeScript Configuration
- Relaxed TypeScript setup for gradual adoption (strict: false, noImplicitAny: false)
- Comprehensive path mapping aligned with component architecture
- Modern target (ES2020) with ESNext modules
- JSX support with react-jsx transform

## Build Configuration

### Vite Configuration
Modular Vite config in `config/vite/` directory:
- Base configuration with environment and path settings
- Development server optimizations
- Plugin system for PWA, core functionality
- Code splitting and optimization strategies
- TypeScript and JSX support

### Environment Management
- Environment variable configuration in src/utils/envConfig.js
- Secure API key handling for production deployments
- Development vs production build optimizations

## Security and Performance

### Security Features
- Input validation utilities in src/utils/validation.js
- Security-focused components (SecurityBadge, SecurityFact)
- HTTPS URL validation and sanitization
- Content Security Policy considerations

### Performance Monitoring
- Custom performance monitoring in src/utils/performanceMonitor.js
- Intersection Observer utilities for lazy loading
- Animation optimization with useAnimationOptimization hook
- Image optimization and lazy loading strategies

## Common Development Workflows

### Adding New Components
1. Create component directory in appropriate atomic design level
2. Include Component.jsx, Component.css, Component.stories.jsx, and index.js
3. Follow existing component patterns with PropTypes validation
4. Create comprehensive Storybook stories covering all variants and states
5. Add TypeScript definitions if needed

### Portfolio Content Updates
1. Edit src/portfolio.js for personal information, skills, experience, projects
2. Update assets in src/assets/images/ for logos, icons, or profile images
3. Test changes in Storybook to verify component rendering
4. Run yarn check to validate code quality

### Running Full Development Environment
```bash
yarn dev:frontend  # Vite + Storybook for component development
yarn dev:all       # Complete environment with docs and server
yarn check         # Quality assurance before commits
```

