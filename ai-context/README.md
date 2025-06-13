# Developer Portfolio AI Context

This directory contains structured guidelines, patterns, and best practices for the Developer Portfolio project. It serves as a comprehensive reference for AI assistants and developers working with the codebase.

## Purpose

The `ai-context` directory organizes project intelligence into logical categories, making it easier to:

1. Find specific guidelines and patterns
2. Update individual sections without affecting others
3. Maintain version control for specific areas
4. Onboard new developers and AI assistants efficiently

## Directory Structure

### Project Overview
- [Overview](./project/overview.md) - Project purpose, goals, and requirements
- [Current Status](./project/current-status.md) - Development state and completed features

### Architecture
- [System Patterns](./architecture/system-patterns.md) - Core architecture patterns and design decisions
- [Technical Debt](./architecture/technical-debt.md) - Technical debt tracking and management

### Security
- [Portfolio Enhancement Plan](./security/portfolio-enhancement-plan.md) - Security-focused portfolio transformation plan

### Component Guidelines
- [Organization](./component/organization.md) - Atomic Design structure and component hierarchy
- [Naming Conventions](./component/naming.md) - Consistent naming patterns for components and files
- [Implementation](./component/implementation.md) - Component structure and best practices
- [Migration](./component/migration.md) - Patterns for refactoring and migrating components

### Design System
- [Tokens](./design-system/tokens.md) - Design token organization and usage
- [CSS Methodology](./design-system/css.md) - CSS patterns and best practices
- [Accessibility](./design-system/accessibility.md) - Accessibility guidelines and standards

### Testing
- [Strategy](./testing/strategy.md) - Overall testing approach and types
- [Best Practices](./testing/best-practices.md) - Testing patterns and guidelines
- [Component Best Practices](./testing/component-best-practices.md) - Specific component testing patterns
- [Automation](./testing/automation.md) - Test automation and CI/CD integration

### Performance
- [Optimization](./performance/optimization.md) - Performance optimization patterns
- [Monitoring](./performance/monitoring.md) - Performance monitoring and analysis

### Development
- [Tools](./development/tools.md) - Development tools and environment setup
- [Practices](./development/practices.md) - Modern development practices
- [Documentation](./development/documentation.md) - Documentation guidelines

### Storybook
- [Storybook Integration](./storybook.md) - Storybook setup and usage patterns

## Usage Guidelines

- Reference these documents when implementing new features or making changes
- Update relevant sections when patterns or best practices evolve
- Use these guidelines to maintain consistency across the codebase
- Refer to specific sections in code reviews and pull requests

## Key Information Summary

### Current Project State
- **Architecture**: Modern React with atomic design, Tailwind CSS, Storybook integration
- **Status**: Core components completed, comprehensive testing setup, performance optimizations implemented
- **Recent Changes**: Migrated from Bootstrap to Tailwind, completed all major section components

### Development Priorities
1. **Component Test Coverage** - Expand testing for section components
2. **Performance Monitoring** - Integrate performance utilities into CI/CD
3. **Accessibility Enhancement** - Automated a11y testing integration
4. **Security Features** - Optional security-focused portfolio transformation

### Technical Highlights
- **Performance**: Lazy loading, memoization, intersection observer patterns
- **Accessibility**: WCAG 2.1 AA compliance with comprehensive ARIA implementation
- **Testing**: Jest + React Testing Library with custom utilities
- **Architecture**: Context-based state management with feature-specific hooks

## Relationship to Other Documentation

The `ai-context` directory complements the `/docs` directory:

| AI Context (`/ai-context/`) | Documentation (`/docs/`) |
|--------------------------|-------------------------------|
| AI-focused guidelines | User-focused documentation |
| Implementation patterns | Usage guides |
| Best practices | API reference |
| Project intelligence | Architecture overview |
| Current development state | Stable reference material |

For user-facing documentation and guides, refer to the `/docs` directory.