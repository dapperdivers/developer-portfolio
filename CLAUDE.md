# Developer Portfolio Project Guide

> **Note**: This project uses Yarn as the package manager. Please use Yarn commands rather than npm commands.

## Build & Development Commands
- Start development server: `yarn dev`
- Build for production: `yarn build`
- Run production server: `yarn serve`
- Format code: `yarn format`
- Lint code: `yarn lint`
- Type checking: `yarn typecheck`
- Verify (lint + typecheck): `yarn verify`
- Clean and reinstall: `yarn reinstall`

## Testing Commands
- Run all tests: `yarn test`
- Run tests in watch mode: `yarn test:watch`
- Run tests with coverage: `yarn test:coverage`
- Run a single test file: `yarn test --testMatch="**/path/to/test.test.jsx"`
- Run tests by name pattern: `yarn test -t="test description"`

## Code Style Guidelines
- **Components**: Functional components with arrow function syntax
- **Props**: Use PropTypes for validation; destructure props with defaults
- **Styling**: CSS modules with component-named files
- **Imports**: React first, third-party next, local imports, CSS last
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Documentation**: JSDoc comments for components, functions, and hooks
- **Hooks**: Custom hooks prefixed with 'use', organized at top of component
- **Error Handling**: Use conditional rendering and nullish checks

## Testing Best Practices
1. Use data-testid attributes for reliable test selection
2. Keep mock implementations simple while maintaining fidelity
3. Break tests into small, focused units
4. Prefer real DOM rendering over excessive mocking

## Project Structure
- Component tests in `src/components/__tests__/`
- Basic tests in `src/__tests__/`
- Mocks in `src/__mocks__/`
- Enhanced tests use `.enhanced.test.jsx` suffix