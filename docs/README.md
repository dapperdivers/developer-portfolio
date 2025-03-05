# Developer Portfolio Documentation

This directory contains official documentation for the Developer Portfolio project. It provides guides, best practices, and reference material for anyone working with or extending the portfolio.

## Purpose

The `/docs` directory contains **final, polished documentation** focused on usage, integration, and extension. Unlike the `/memory-bank` directory (which tracks implementation progress and decisions), this documentation is intended as a stable reference for both current and future developers.

## Documentation Structure

### Architecture
Documentation related to system architecture and high-level design decisions:
- **Project Structure**: Details on codebase organization and conventions
- **Performance Optimization**: Approaches used to maximize performance
- **Asset Performance**: Strategies specific to optimizing assets (images, etc.)

### Guides
Step-by-step guides for common tasks:
- **Accessibility**: Ensuring components meet accessibility standards
- **Component CSS Guide**: Working with the CSS architecture
- **Customization Guide**: How to customize portfolio elements

### Components
Reference documentation for components:
- **UI Components**: Documentation for all UI components

### Testing
Best practices and patterns for testing:
- **Component Testing Best Practices**: Guidelines for effective testing
- **Jest ESM Guide**: Working with ESM modules in Jest tests

### Other Documentation
- **Context Provider Guide**: Working with React context
- **Custom Hooks Documentation**: Available hooks and their usage
- **Storybook Guide**: Using Storybook for component development
- **Storybook Implementation Summary**: Overview of the Storybook structure

## Relationship to Memory Bank

The `/docs` directory and `/memory-bank` work together in complementary ways:

| Docs Directory (`/docs/`) | Memory Bank (`/memory-bank/`) |
|--------------------------|-------------------------------|
| Usage guides | Implementation details |
| Component API reference | Progress tracking |
| Best practices | Decision records |
| Integration examples | Technical context |
| Final documentation | Work-in-progress notes |
| Architecture overview | Implementation plans |

For implementation details, active development context, and progress tracking, refer to the Memory Bank. For usage guides and stable reference documentation, use the Docs directory.

## Contributing to Documentation

When adding or updating documentation:

1. **Focus on End Users**: Write with developers who will use your component in mind
2. **Include Examples**: Provide clear code examples showing usage
3. **Explain the Why**: Document not just how something works, but why it works that way
4. **Keep Updated**: Update documentation when components change
5. **Cross-reference**: Link to related documentation for additional context
6. **Maintain Consistency**: Follow established documentation formatting and structure