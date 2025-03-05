# Project Structure

This document provides an overview of the developer portfolio project structure and the architectural decisions behind it.

## Directory Structure

```
/
├── public/                # Static assets
├── src/
│   ├── assets/            # CSS, images, fonts
│   │   ├── css/           # Stylesheet files
│   │   ├── fonts/         # Custom font files
│   │   ├── img/           # Image assets
│   │   ├── lottie/        # Lottie animation files
│   │   └── vendor/        # Third-party assets
│   ├── components/        # Reusable components
│   │   ├── ui/            # Base UI components
│   │   ├── layout/        # Layout components
│   │   └── __tests__/     # Component tests
│   ├── containers/        # Page section containers
│   │   └── __tests__/     # Container tests
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── __mocks__/         # Mock implementations
│   ├── __tests__/         # General tests
│   └── portfolio.js       # Portfolio data
├── docs/                  # Documentation
├── scripts/               # Build/deployment scripts
└── config files           # Various configuration files
```

## Architectural Decisions

### Component Structure

We follow a component hierarchy that separates UI components from page containers:

1. **UI Components** (`src/components/ui/`)
   - Small, reusable building blocks (buttons, cards, inputs)
   - Focused on presentation
   - Stateless when possible
   - Highly reusable across sections

2. **Layout Components** (`src/components/layout/`)
   - Structural components for page layout
   - Section wrappers, grids, and containers
   - Provide consistent spacing and alignment

3. **Section Components** (`src/components/`)
   - Composite components used across the application
   - Combine UI components for specific features
   - Handle more complex logic and state

4. **Page Containers** (`src/containers/`)
   - Page-level components representing portfolio sections
   - Compose multiple components together
   - Connect to context for data needs
   - Handle section-specific business logic

### Data Flow Architecture

The application uses a top-down data flow pattern:

1. **Central Data Source** (`src/portfolio.js`)
   - Contains all portfolio information
   - Single source of truth for content

2. **Context API** (`src/context/PortfolioContext.jsx`)
   - Provides portfolio data throughout the app
   - Prevents prop drilling
   - Centralizes data access

3. **Custom Hooks** (`src/hooks/`)
   - Extract and transform data from context
   - Encapsulate complex logic
   - Provide a clean API for components

4. **Components**
   - Consume context via hooks
   - Render data
   - Handle user interactions

### State Management Strategy

We use a combination of state management approaches:

1. **Local Component State**
   - For UI-specific state (isOpen, isHovered, etc.)
   - Managed with useState hook
   - Contained within the component

2. **React Context**
   - For shared application state
   - Provides portfolio data to all components
   - Avoids prop drilling

3. **Custom Hooks**
   - Encapsulate state logic
   - Provide reusable state behavior
   - Handle side effects

### Performance Optimization Strategy

The project implements several performance optimizations:

1. **Code Splitting**
   - Each major section loads independently
   - Reduces initial load time

2. **Lazy Loading**
   - Images and animations load as needed
   - Uses IntersectionObserver for detection

3. **Memoization**
   - React.memo for pure components
   - useMemo for expensive calculations
   - useCallback for stable callbacks

4. **Asset Optimization**
   - Image compression and appropriate formats
   - Minified CSS and JS
   - Deferred loading of non-critical resources

## Testing Strategy

Our testing approach covers different levels:

1. **Unit Tests**
   - Test individual components in isolation
   - Focus on component logic and rendering
   - Located in `__tests__` folders

2. **Integration Tests**
   - Test component interactions
   - Verify data flow between components
   - Located with unit tests but focused on integration

3. **Enhanced Tests**
   - More comprehensive tests including animations
   - Test accessibility and responsive behavior
   - Names with `.enhanced.test.jsx` suffix

See [Component Testing Best Practices](/docs/testing/component-testing-best-practices.md) for more details.

## Styling Approach

The project uses a hybrid styling approach:

1. **CSS Modules**
   - Component-scoped styles
   - Prevents style leakage
   - Named with `ComponentName.css` pattern

2. **Utility Classes**
   - For common patterns like spacing, alignment
   - Reduces duplicate CSS
   - Located in design token files

3. **Design Tokens**
   - Centralized variables in design-tokens.css
   - Consistent colors, spacing, typography
   - Makes theme changes easier

## Accessibility Considerations

Accessibility is built into the architecture:

1. **Semantic HTML**
   - Proper heading hierarchy
   - Semantic elements for content structure

2. **Keyboard Navigation**
   - All interactive elements are keyboard accessible
   - Focus management for modals and menus

3. **Screen Reader Support**
   - ARIA attributes
   - Alt text for images
   - Skip to content links

4. **Responsive Design**
   - Mobile-first approach
   - Flexible layouts that work across devices
   - Touch-friendly interactive elements