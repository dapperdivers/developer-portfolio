<h1 align="center">Developer Portfolio</h1>

<p align="center">A modern, accessible, and performance-optimized portfolio template for developers.</p>

<p align="center">
  <img src="https://github.com/DapperDivers/developer-portfolio/blob/master/picture.PNG" alt="Developer Portfolio Screenshot" />
</p>

## 🌟 Features

- **Modern React Architecture** - Built with React hooks, context, and performance optimizations
- **Responsive Design** - Looks great on all devices from mobile to desktop
- **Optimized Performance** - Lazy loading, code splitting, and memoization
- **Accessibility First** - WCAG compliant with keyboard navigation support
- **Customizable** - Easy to customize with design tokens and a central portfolio data file
- **Component Library** - Reusable UI components with comprehensive documentation
- **Testing** - Unit tests for critical components

## 🚀 Quick Start

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

```
node@v14.0.0 or higher
npm@6.14.0 or higher
git@2.17.1 or higher
```

### Installation

```bash
# Clone this repository
$ git clone https://github.com/DapperDivers/developer-portfolio.git

# Go into the repository
$ cd developer-portfolio

# Install dependencies
$ npm install

# Start development server
$ npm run dev
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
$ npm test

# Run tests with coverage
$ npm test -- --coverage
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

## 🛠️ Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Reactstrap](https://reactstrap.github.io/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Jest](https://jestjs.io/) & [Testing Library](https://testing-library.com/)
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## 📚 Project Structure

```
/
├── public/                # Static assets
├── src/
│   ├── assets/            # CSS, images, fonts
│   ├── components/        # Reusable components
│   │   ├── ui/            # Base UI components
│   │   └── layout/        # Layout components
│   ├── containers/        # Page section containers
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── portfolio.js       # Portfolio data
├── tests/                 # Test configuration
└── package.json           # Dependencies and scripts
```

## 👤 Author

**Derek Mackley**

- Website: [derekmackley.com](https://www.derekmackley.com)
- GitHub: [@DapperDivers](https://github.com/DapperDivers)
- LinkedIn: [dmackley](https://www.linkedin.com/in/dmackley/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

- Check the [issues page](https://github.com/DapperDivers/developer-portfolio/issues) for open issues
- Fork the repository and submit a PR for new features or bug fixes

## 📝 License

This project is [MIT](LICENSE) licensed.

## ⭐ Show your support

Give a ⭐️ if this project helped you!
