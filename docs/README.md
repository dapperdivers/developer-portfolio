# Derek Mackley's Technical Portfolio Documentation

[![Jekyll](https://img.shields.io/badge/Jekyll-CC0000?style=flat&logo=Jekyll&logoColor=white)](https://jekyllrb.com/)
[![Documentation](https://img.shields.io/badge/docs-live-brightgreen)](https://dapperdiver.github.io/developer-portfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Professional Jekyll documentation site showcasing enterprise-level React development practices**

This repository contains the Jekyll documentation site that provides an in-depth technical analysis of Derek Mackley's developer portfolio. The documentation demonstrates sophisticated engineering practices, architectural decisions, and security-minded development approaches.

## 🚀 Quick Start

### Prerequisites
- Ruby 2.7+ 
- Bundler gem
- Jekyll 4.3+

### Local Development
```bash
# Clone the repository
git clone https://github.com/DapperDivers/developer-portfolio.git
cd developer-portfolio/docs

# Install Jekyll dependencies
bundle install

# Start local development server
bundle exec jekyll serve

# Open in browser
open http://localhost:4000
```

### GitHub Pages Deployment
This documentation is automatically deployed to GitHub Pages on push to the main branch.

## 📁 Repository Structure

```
docs/
├── _config.yml             # Jekyll configuration
├── Gemfile                 # Ruby dependencies
├── index.md                # Site homepage
├── _architecture/          # System architecture docs
├── _components/            # Component documentation
├── _guides/                # Development guides
├── _hooks/                 # Custom hooks reference
├── _performance/           # Performance optimization
├── _security/              # Security practices
└── _testing/               # Testing strategies
```

## 🛠️ Development

### Adding New Content

1. **Create collection files** in the appropriate `_collection/` directory
2. **Add Jekyll front matter** with required fields:
   ```yaml
   ---
   layout: documentation
   title: "Page Title"
   description: "Page description"
   category: "Collection Name"
   order: 1
   ---
   ```
3. **Follow naming conventions** using kebab-case for filenames

### Jekyll Collections

The site uses Jekyll collections for organized content:

- `_architecture` - System design and architectural patterns
- `_components` - Component development and design systems
- `_guides` - Development guides and best practices
- `_hooks` - Custom React hooks documentation
- `_performance` - Performance optimization techniques
- `_security` - Security implementation and practices
- `_testing` - Testing strategies and methodologies

### Local Testing

```bash
# Build site locally
bundle exec jekyll build

# Serve with live reload
bundle exec jekyll serve --livereload

# Build for production
JEKYLL_ENV=production bundle exec jekyll build
```

## 🎯 Documentation Goals

This documentation site serves as:

- **Technical Showcase** - Demonstrates professional development practices
- **Knowledge Base** - Comprehensive guides and references
- **Professional Portfolio** - Evidence of expertise across multiple domains
- **Learning Resource** - Best practices for modern web development

## 🔗 Related Links

- **[Live Documentation Site](https://dapperdiver.github.io/developer-portfolio/)** - View the deployed documentation
- **[Portfolio Application](https://derekmackley.com)** - See the live portfolio
- **[Storybook Documentation](https://storybook.derekmackley.com)** - Interactive component library

## 📝 License

This project is [MIT licensed](https://opensource.org/licenses/MIT).

## 🤝 Contributing

This documentation is part of Derek Mackley's professional portfolio. While primarily for demonstration purposes, suggestions and improvements are welcome through issues and pull requests.

---

*Professional Jekyll documentation showcasing enterprise-level development practices and technical expertise.*