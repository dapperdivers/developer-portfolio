<h1 align="center">Developer Portfolio</h1>

<p align="center">A modern, accessible, and performance-optimized portfolio template for developers.</p>

<p align="center">
  <img src="https://github.com/DapperDivers/developer-portfolio/blob/master/screenshot.png" alt="Developer Portfolio Screenshot" />
</p>

## 🌟 Features

- **Modern React Architecture** - Built with React hooks, context, and performance monitoring
- **Storybook Development Environment** - 68+ stories across atomic design components with comprehensive testing
- **Atomic Design System** - Scalable component architecture with 71+ components organized by complexity
- **Responsive Design** - Looks great on all devices from mobile to desktop
- **Optimized Performance** - Lazy loading, code splitting, memoization, and FPS tracking
- **Accessibility First** - WCAG compliant with keyboard navigation support
- **Customizable** - Easy to customize with design tokens and a central portfolio data file
- **Component Library** - Reusable UI components with comprehensive Storybook documentation
- **Enhanced Type Checking** - PropTypes with TypeScript static analysis
- **Environment Variable Management** - Secure API key handling
- **Professional Documentation** - Architecture guides, component patterns, and development best practices
- **Comprehensive Testing** - Unit tests, interaction tests, and visual regression testing

## 🚀 Quick Start

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) installed on your computer.

```
node@v22.0.0 or higher
yarn@1.22.0 or higher
git@2.17.1 or higher
```

### Installation

```bash
# Clone this repository
$ git clone https://github.com/DapperDivers/developer-portfolio.git

# Go into the repository
$ cd developer-portfolio

# Install dependencies
$ yarn

# Start development server
$ yarn dev
```

## 🚀 Production Deployment

For production deployment, the project uses an Express server with enhanced security features, rate limiting, and multi-app routing.

### Production Build & Start

```bash
# Build and start production server (builds automatically)
$ yarn start:prod

# Or build first, then start
$ yarn build:prod
$ yarn start

# The server will run on http://localhost:8080
```

### Production Features

- **Enhanced Security**: Helmet.js security headers, CSP policies, XSS protection
- **Rate Limiting**: Built-in request rate limiting and IP protection  
- **Multi-App Support**: Serves main portfolio, Storybook, and documentation
- **Health Checks**: Comprehensive health monitoring endpoints
- **API Proxying**: Geocoding and other API proxy services
- **Performance**: Optimized static file serving with caching headers

### Environment Variables

Create a `.env` file for production configuration:

```bash
NODE_ENV=production
PORT=8080
ALLOWED_DOMAINS=https://yourdomain.com,https://www.yourdomain.com
```

## 📋 Sections

- About Me & Summary
- Skills & Proficiencies
- Education History
- Work Experience
- Projects Showcase
- Testimonials & Feedback
- GitHub Profile & Contact

## 🎨 Customization

### Basic Customization

Edit the `src/portfolio.js` file to update your personal information, skills, experience, projects, etc.

```javascript
// src/portfolio.js
const greeting = {
  title: "Hello! I'm Derek Mackley",
  subtitle: "A passionate Full Stack Developer with a focus on security",
  // ...
};

// Update other sections similarly
```

### Advanced Customization

#### Design Tokens

The project uses CSS variables for theming. Edit the design tokens in `src/assets/css/design-tokens.css`:

```css
:root {
  /* Color tokens */
  --color-primary: #0062cc;
  --color-secondary: #6c757d;
  
  /* Typography tokens */
  --font-family-base: 'Roboto', sans-serif;
  --font-family-heading: 'Poppins', sans-serif;
  
  /* Spacing tokens */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  /* ... */
}
```

## 🧩 Component System

Derek's component library demonstrates advanced React patterns and professional development practices following atomic design methodology:

- **71+ Components** organized by complexity (Atoms, Molecules, Organisms, Layout)
- **68+ Storybook Stories** with comprehensive examples and interactive testing
- **Professional Documentation** with accessibility and performance examples
- **TypeScript Integration** with runtime validation and type safety
- **Security-Focused Components** with specialized security variants

### Quick Component Examples

```jsx
// Professional Button with variants
<Button variant="security" icon="mdi:shield-check">
  Security Verified
</Button>

// Experience showcase with timeline
<Experience 
  experiences={portfolioData.experiences}
  layout="timeline" 
  variant="professional"
/>

// Performance-optimized images
<LazyImage 
  src="/images/project.webp" 
  alt="Project screenshot"
  loading="lazy"
/>
```

### Explore Components Interactively

```bash
# Launch Storybook development environment
$ yarn storybook

# View comprehensive component documentation at:
# http://localhost:6006
```

For detailed component documentation and examples, see the **[docs directory](docs/README.md)**.

## 📚 Storybook Development Environment

Derek's portfolio features a comprehensive Storybook setup with **68+ interactive stories** demonstrating enterprise-level component development practices.

### Quick Start

```bash
# Start Storybook development server
$ yarn storybook

# Build for production
$ yarn storybook:build

# Run interaction tests
$ yarn storybook:test
```

### Architecture Highlights

- **Atomic Design Methodology** - 71+ components organized by complexity
- **Advanced Configuration** - Professional decorator patterns and mock data
- **Comprehensive Testing** - Visual regression and interaction testing
- **Accessibility Compliance** - WCAG 2.1 AA standards built-in
- **Performance Focus** - Lazy loading and optimization examples

For complete Storybook documentation and component development guides, see the **[docs directory](docs/README.md)**.

## 🧪 Testing & Quality Assurance

Derek's comprehensive testing strategy demonstrates his commitment to software quality:

```bash
# Unit and integration testing
$ yarn test

# Interactive component testing
$ yarn storybook:test

# Performance and accessibility testing
$ yarn test:coverage

# Type safety verification
$ yarn typecheck

# Complete quality verification
$ yarn verify
```

## 📱 Responsive Design

The portfolio is fully responsive with the following breakpoints:

- Mobile: < 576px
- Tablet: 576px - 992px
- Desktop: > 992px

## ♿ Accessibility

This project prioritizes accessibility with:

- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Color contrast compliance
- Screen reader support
- Skip to content link

## 📖 Documentation

Derek's portfolio includes comprehensive professional documentation demonstrating his commitment to knowledge sharing and technical excellence.

### Complete Documentation

For detailed guides, tutorials, and technical documentation, visit the **[docs directory](docs/README.md)**.

Key documentation includes:
- **Architecture Guides** - System design and project structure
- **Component Development** - Professional component creation patterns
- **Testing Strategies** - Comprehensive testing approaches
- **Performance Optimization** - Advanced optimization techniques
- **Customization Guides** - How to adapt the portfolio for your needs

### Interactive Documentation

- **Storybook Component Library**: 68+ interactive stories showcasing all components
- **Accessibility Examples**: WCAG compliance demonstrations
- **Performance Optimizations**: Advanced React patterns and best practices
- **Security Features**: Specialized security-focused component variants

## 🛠️ Technologies Used

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Jest](https://jestjs.io/) & [Testing Library](https://testing-library.com/) - Testing
- [Storybook](https://storybook.js.org/) - Component development environment
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) - Code quality
- [Iconify](https://iconify.design/) - Icon system
- [Yarn](https://yarnpkg.com/) - Package manager

## 📚 Project Architecture

Derek's portfolio demonstrates enterprise-level organization following atomic design principles:

- **Component Library** - 71+ components organized in atoms/molecules/organisms/layout structure
- **Professional Documentation** - Comprehensive guides in the docs directory
- **Advanced Tooling** - Storybook, TypeScript, testing, and performance monitoring
- **Modern Build System** - Vite with optimized production builds
- **Accessibility First** - WCAG compliance built into all components

For detailed project structure and architectural documentation, see the **[docs directory](docs/README.md)**.

## 👤 Author

**Derek Mackley**

- Website: [derekmackley.com](https://www.derekmackley.com)
- GitHub: [@DapperDivers](https://github.com/DapperDivers)
- LinkedIn: [dmackley](https://www.linkedin.com/in/dmackley/)

## 🤝 Contributing

Derek welcomes contributions that maintain the high standards of component development and documentation demonstrated in this portfolio. This project follows professional development practices with comprehensive testing and documentation requirements.

### Development Workflow

1. **Environment Setup**:
   - Fork the repository
   - Clone your fork: `git clone https://github.com/your-username/developer-portfolio.git`
   - Install dependencies: `yarn`
   - Start Storybook: `yarn storybook`

2. **Component Development Process**:
   - Create a new branch: `git checkout -b feature/your-feature-name`
   - Follow the [Storybook Development Guide](STORYBOOK_GUIDE.md) for component creation
   - Implement components using the Atomic Design methodology
   - Create comprehensive Storybook stories with all variants and states
   - Ensure accessibility compliance (WCAG 2.1 AA)
   - Add TypeScript types and PropTypes validation

3. **Quality Assurance**:
   - Run component tests: `yarn storybook:test`
   - Execute unit tests: `yarn test`
   - Verify type safety: `yarn typecheck`
   - Check code quality: `yarn verify`
   - Test responsive behavior in Storybook
   - Validate accessibility features

4. **Documentation Requirements**:
   - Update component stories with comprehensive examples
   - Document all props and variants in Storybook
   - Include accessibility examples and edge cases
   - Update README.md if adding new features
   - Follow Derek's documentation standards

5. **Submission Process**:
   - Commit with descriptive messages: `git commit -m "feat: add security-themed button component"`
   - Push to your fork: `git push origin feature/your-feature-name`
   - Submit a Pull Request with:
     - Clear description of changes
     - Storybook screenshots if UI changes
     - Testing evidence (accessibility, responsiveness)
     - Documentation updates

### Professional Standards

Derek's portfolio maintains enterprise-level standards:

- **Component Architecture**: Follow Atomic Design principles
- **Story Coverage**: Include Default, Variants, States, Accessibility, and Responsive stories
- **TypeScript Integration**: Full type safety with runtime validation
- **Accessibility First**: WCAG compliance and keyboard navigation
- **Performance Focus**: Lazy loading, memoization, and optimization
- **Security Awareness**: Input validation and XSS prevention
- **Professional Documentation**: Clear, comprehensive, and actionable

### Code Review Criteria

Pull requests are evaluated on:
- **Component Quality**: Professional implementation following established patterns
- **Story Completeness**: Comprehensive Storybook documentation
- **Accessibility Compliance**: WCAG standards and inclusive design
- **Performance Optimization**: Efficient React patterns and lazy loading
- **Type Safety**: Complete TypeScript integration
- **Documentation Excellence**: Clear, professional documentation standards

## 📝 License

This project is [MIT](LICENSE) licensed.

## ⭐ Show your support

Give a ⭐️ if this project helped you!
