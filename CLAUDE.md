# Developer Portfolio Project Guide

## Build & Development Commands
- Start development server: `npm run dev`
- Build for production: `npm run build`
- Run production server: `npm run serve`
- Format code: `npm run format`
- Lint code: `npm run lint`

## Testing Commands
- Run all tests: `npm test`
- Run tests in watch mode: `npm run test:watch`
- Run tests with coverage: `npm run test:coverage`
- Run a single test file: `npm test -- --testMatch="**/path/to/test.test.jsx"`
- Run tests by name pattern: `npm test -- -t="test description"`

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