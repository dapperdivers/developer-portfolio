<h1 align="center">Developer Portfolio</h1>

<p align="center">A modern, accessible, and performance-optimized portfolio template for developers.</p>

<p align="center">
  <img src="https://github.com/DapperDivers/developer-portfolio/blob/master/picture.PNG" alt="Developer Portfolio Screenshot" />
</p>

## 🌟 Features

- **Modern React Architecture** - Built with React hooks, context, and performance monitoring
- **Responsive Design** - Looks great on all devices from mobile to desktop
- **Optimized Performance** - Lazy loading, code splitting, memoization, and FPS tracking
- **Accessibility First** - WCAG compliant with keyboard navigation support
- **Customizable** - Easy to customize with design tokens and a central portfolio data file
- **Component Library** - Reusable UI components with comprehensive documentation
- **Enhanced Type Checking** - PropTypes with TypeScript static analysis
- **Environment Variable Management** - Secure API key handling
- **Detailed Documentation** - Architecture guides, component patterns, and best practices
- **Comprehensive Testing** - Unit tests with consistent patterns

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

## 🧩 Component Examples

### Button Component

```jsx
import { Button } from '../components/ui/Button';

// Primary button
<Button>Click Me</Button>

// Secondary button with icon
<Button 
  variant="secondary" 
  icon="mdi:github"
>
  View on GitHub
</Button>

// Link button
<Button
  variant="link"
  href="https://example.com"
  target="_blank"
>
  External Link
</Button>
```

### Card Component

```jsx
import { Card } from '../components/ui/Card';

<Card
  title="Project Title"
  subtitle="Project Subtitle"
  hoverable
  shadow
  animation={{ 
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  }}
>
  <p>Card content goes here</p>
  
  {/* With footer */}
  <div slot="footer">
    <Button>View Project</Button>
  </div>
</Card>
```

### Section Component

```jsx
import { Section } from '../components/layout/Section';

<Section
  id="about"
  title="About Me"
  subtitle="Learn more about my background"
  icon="mdi:account"
  background="light"
>
  <p>Section content goes here</p>
</Section>
```

### LazyImage Component

```jsx
import { LazyImage } from '../components/ui/LazyImage';

<LazyImage
  src="/path/to/image.jpg"
  alt="Description of image"
  aspectRatio="16:9"
  lowResSrc="/path/to/thumbnail.jpg"
/>
```

## 🧪 Testing

```bash
# Run all tests
$ yarn test

# Run tests with coverage
$ yarn test:coverage

# Run tests in watch mode
$ yarn test:watch

# Type checking
$ yarn typecheck

# Lint and type check
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

The project includes comprehensive documentation in the `/docs` directory:

- **Architecture Guides**: System architecture, project structure, performance optimization
- **Component Guides**: Detailed information on component patterns and development workflows
- **Testing Guides**: Best practices for component testing and TypeScript integration
- **Usage Guides**: How to work with environment variables, type checking, and customization

Key documents:
- [System Architecture](docs/architecture/system-architecture.md) - Overall architecture and patterns
- [Component Development Checklist](docs/component-development-checklist.md) - Guidelines for component creation
- [Type Checking Guide](docs/guides/type-checking-guide.md) - TypeScript integration approach
- [Environment Configuration](docs/guides/environment-config-guide.md) - Working with environment variables

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

## 📚 Project Structure

```
/
├── docs/                  # Documentation
│   ├── architecture/      # Architecture guides
│   ├── guides/            # Usage guides
│   ├── testing/           # Testing documentation
│   └── components/        # Component documentation
├── public/                # Static assets
├── src/
│   ├── assets/            # CSS, images, fonts
│   │   ├── css/           # CSS files including Tailwind
│   │   ├── lottie/        # Animation files
│   │   └── images/        # Image assets
│   ├── components/        # Reusable components
│   │   ├── ui/            # Base UI components
│   │   └── layout/        # Layout components
│   ├── containers/        # Page section containers
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── stories/           # Storybook stories
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── portfolio.js       # Portfolio data
├── scripts/               # Build and generator scripts
├── memory-bank/           # Development progress tracking
├── jest.config.cjs        # Jest configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.cjs    # Tailwind configuration
└── package.json           # Dependencies and scripts
```

## 👤 Author

**Derek Mackley**

- Website: [derekmackley.com](https://www.derekmackley.com)
- GitHub: [@DapperDivers](https://github.com/DapperDivers)
- LinkedIn: [dmackley](https://www.linkedin.com/in/dmackley/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome! This project uses Yarn as the package manager and follows specific development practices:

1. **Getting Started**:
   - Fork the repository
   - Clone your fork: `git clone https://github.com/your-username/developer-portfolio.git`
   - Install dependencies: `yarn`

2. **Development Workflow**:
   - Create a new branch: `git checkout -b feature/your-feature-name`
   - Follow the [Component Development Checklist](docs/component-development-checklist.md)
   - Run tests: `yarn test`
   - Verify code quality: `yarn verify` (runs both lint and type checking)

3. **Submitting Changes**:
   - Commit your changes: `git commit -m "feat: add your feature description"`
   - Push to your fork: `git push origin feature/your-feature-name`
   - Submit a Pull Request

4. **Code Standards**:
   - Follow existing code style and patterns
   - Include tests for new features
   - Update documentation as needed
   - Ensure all tests pass and type checking succeeds

## 📝 License

This project is [MIT](LICENSE) licensed.

## ⭐ Show your support

Give a ⭐️ if this project helped you!
