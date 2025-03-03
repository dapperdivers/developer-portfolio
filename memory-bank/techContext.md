# Technical Context

## Technologies Used

### Core Framework & Libraries
- **React**: Frontend library for component-based UI development
- **React Hooks**: For state and side effect management
- **React Context API**: For state management across components
- **Framer Motion**: For animations and transitions
- **PropTypes**: For runtime type checking of props

### Styling & Design
- **CSS Custom Properties**: For design token implementation and design system
- **CSS Modules** (optional): For component-scoped styling
- **Design Token System**: Comprehensive system for colors, typography, spacing, etc.

### Build & Development Tools
- **Vite**: Modern build tool and development server
- **ESLint**: For code quality and consistency
- **Jest & React Testing Library**: For component testing
- **JSDoc**: For code documentation and component API documentation

### Performance & Optimization
- **React.lazy & Suspense**: For code splitting and lazy loading
- **React.memo**: For component render optimization
- **useCallback & useMemo**: For optimizing functions and derived values
- **Intersection Observer API**: For lazy loading and animations
- **Responsive Images**: For optimized image loading and display

### Accessibility
- **ARIA attributes**: For enhanced accessibility
- **Semantic HTML**: For proper document structure
- **Focus management**: For keyboard navigation

## Development Environment

### Required Tools
- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher
- **Git**: For version control
- **Modern web browser**: Chrome, Firefox, Edge, or Safari for testing

### Development Workflow
1. **Development Server**: Run with `npm run dev`
2. **Building for Production**: `npm run build`
3. **Testing**: `npm run test`
4. **Linting**: `npm run lint`

### Project Structure
```
/
├── public/               # Static files
├── src/
│   ├── assets/          # Images, fonts, CSS
│   │   ├── css/         # Global and section CSS files
│   │   │   └── design-tokens.css # Design system variables
│   │   ├── img/         # Image assets
│   │   └── fonts/       # Font files
│   ├── components/      # Reusable components
│   │   ├── ui/          # Base UI components (Button, Card, etc.)
│   │   ├── layout/      # Layout components (Section, Grid, etc.)
│   │   └── __tests__/   # Component tests
│   ├── containers/      # Container components (sections)
│   ├── context/         # Context providers
│   ├── hooks/           # Custom hooks
│   │   ├── useProjects.js  # Feature-specific hooks
│   │   └── useIntersectionObserver.js # Utility hooks
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   └── index.jsx        # Entry point
├── memory-bank/         # Documentation for project context
├── ai-docs/             # Front-end best practices documentation
└── docs/                # Additional documentation
```

### File Naming Conventions
- **Components**: PascalCase (e.g., `Button.jsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useProjects.js`)
- **Utilities**: camelCase (e.g., `imageOptimizer.js`)
- **CSS**: Same name as corresponding component (e.g., `Button.css`)

## Design System

The project uses a comprehensive design system implemented through CSS custom properties (variables) to ensure consistency across the application.

### Color System
- **Primary Colors**: Primary (#0062cc), Primary Light (#4d8fe6), Primary Dark (#0050a6)
- **Secondary Colors**: Secondary (#6c757d), Secondary Light (#8c959d), Secondary Dark (#555c64)
- **Accent Color**: #fd7e14
- **Semantic Colors**: Success, Info, Warning, Danger
- **Neutrals**: White through Gray 900 to Black
- **Semantic Usage**: Text, Link, Border, Background variables

### Typography System
- **Font Families**: Base, Heading, Monospace
- **Font Sizes**: Base (1rem), Small to H1 (0.875rem to 2.5rem)
- **Font Weights**: Light (300), Regular (400), Medium (500), Bold (700)
- **Line Heights**: Tight (1.2), Base (1.5), Loose (1.8)

### Spacing System
- **Scale**: 0.25rem increments (4px to 80px)
- **Semantic Spacing**: Section, Container, Card, Button padding

### Component Styling
- Border widths, radiuses, shadows, transitions all standardized through variables
- Z-index scale for consistent stacking contexts
- Responsive breakpoints defined as variables

## Technical Constraints

### Browser Support
- Modern browsers (last 2 versions of Chrome, Firefox, Safari, Edge)
- No explicit support for Internet Explorer
- Mobile browsers on iOS and Android

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigable with visible focus states
- Screen reader friendly with proper ARIA attributes
- Sufficient color contrast (minimum 4.5:1 ratio)
- Skip to content functionality

### Performance Targets
- Lighthouse score > 90 for Performance
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- No unnecessary re-renders
- Optimized bundle size through code splitting
- Efficient component memoization

### Design Constraints
- Responsive design that works from 320px to 1920px width
- Support for light mode (dark mode optional)
- Maintain consistent spacing and typography based on design tokens

## External Dependencies

### API Integration
- **GitHub API**: For displaying repository information
- **Portfolio Data**: Currently stored in portfolio.js file (future enhancement could be a headless CMS)

### Third-Party Services
- **Google Fonts**: For typography (optional)
- **Iconify**: For icons
- **Lottie**: For animations

## Testing Strategy

### Component Testing
- **Unit Tests**: Jest for utility functions and hooks
- **Component Tests**: React Testing Library for component behavior
- **Test Coverage**: Focus on critical components and logic
- **Test Files Location**: Adjacent to components (e.g., Button.test.jsx)

### Testing Practices
- Test component rendering
- Test user interactions
- Test accessibility features
- Test responsive behavior where applicable
- Use Jest and React Testing Library for component tests
- Implement ESM-compatible Jest configuration
- Use mock implementations for complex dependencies
- Structure tests in basic and enhanced formats
- Document testing patterns in memory-bank/testing

## Deployment & Hosting

### Deployment Options
- **GitHub Pages**: Simple static hosting
- **Netlify/Vercel**: More advanced hosting with CI/CD
- **Custom domain**: Available for connecting personal domain

### Build Requirements
- Production build should be optimized for size and performance
- Assets should be properly hashed for cache busting
- Critical CSS should be inlined

## Security Considerations

### Content Security
- No inline scripts where possible
- Proper sanitization of any user-displayed content
- Use of rel="noopener noreferrer" for external links

### Data Protection
- No collection of personal data
- No usage of cookies beyond essential functionality
- Compliance with relevant privacy regulations

## Technical Debt & Known Limitations

### Current Technical Debt
- Legacy CSS organization in some sections
- Some components could benefit from further atomization
- Test coverage could be improved

### Planned Technical Improvements
- Complete migration to atomic design pattern for all components
- Enhanced accessibility features
- Improved documentation and testing
- Performance optimizations for image loading

## Environment Variables
- **NODE_ENV**: Development/production environment
- **GITHUB_TOKEN** (optional): For GitHub API requests
- **GA_TRACKING_ID** (optional): For Google Analytics

## Build & Deployment Pipeline
- **Development**: Local development server with HMR
- **Testing**: Jest unit and component tests
- **Build**: Production optimization with Vite
- **Deploy**: Static file hosting
