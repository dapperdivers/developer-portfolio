# Memory Bank

This directory contains the Memory Bank - a comprehensive documentation system that maintains context between development sessions and tracks the active state of the project. These files provide the necessary context to understand the project and continue work effectively.

## Purpose

The Memory Bank is a project-specific documentation system for tracking implementation progress, decisions, and context that is primarily useful **during active development**. Unlike the `/docs` directory, which contains final, polished documentation for users and developers, the Memory Bank is intended as a working area for development notes, progress tracking, and decision records.

## Memory Bank vs Docs Directory

| Memory Bank (`/memory-bank/`) | Docs Directory (`/docs/`) |
|-------------------------------|--------------------------|
| Implementation details | Usage guides |
| Progress tracking | Component API reference |
| Decision records | Best practices |
| Technical context | Integration examples |
| Work-in-progress notes | Final documentation |
| Implementation plans | Architecture overview |

## Core Files

### 1. projectbrief.md
The foundation document that shapes all other files. Defines core requirements and goals for the developer portfolio project.

### 2. productContext.md
Explains why this project exists, the problems it solves, how it should work, and user experience goals.

### 3. activeContext.md
Documents current work focus, recent changes, next steps, and active decisions/considerations.

### 4. systemPatterns.md
Defines system architecture, key technical decisions, design patterns in use, and component relationships.

### 5. techContext.md
Lists technologies used, development setup, technical constraints, and dependencies.

### 6. progress.md
Tracks what works, what's left to build, current status, and known issues.

### 7. testing/
Contains testing documentation, best practices and patterns used in the project:
- **component-testing-best-practices.md**: Guidelines for component testing

### 8. .clinerules
Project intelligence capturing important patterns, preferences, and project-specific knowledge.

## How to Use the Memory Bank

### When Starting a New Task
1. Cline will automatically read ALL memory bank files at the start of EACH task
2. No need to manually provide previous context as these files maintain continuity

### When Updates Are Needed
1. Request Cline to "update memory bank" when significant changes occur
2. Cline will review all files and update them to reflect current project state

### Extending the Memory Bank
If needed, create additional files/folders within memory-bank/ to organize:
- Complex feature documentation
- Integration specifications
- API documentation
- Testing strategies
- Deployment procedures

## Documentation Guidelines

1. **Memory Bank Content**: Should be updated frequently during active development.
2. **Avoid Duplication**: Content should not duplicate what's in the `/docs` directory.
3. **Graduate Content**: When content becomes stable and useful as reference, move it to `/docs`.
4. **Keep Updated**: Remove outdated content, especially after features are completed and properly documented in `/docs`.

## Relationship to Docs

The Memory Bank and `/docs` directory should work together:

1. Memory Bank focuses on the "why" and "how" of implementation decisions.
2. Docs focuses on the "what" and "how to use" of completed features.
3. When implementation notes become valuable as reference documentation, they should be cleaned up and moved to `/docs`.

This separation helps maintain clear documentation boundaries and ensures that each type of documentation serves its intended audience and purpose.

## Memory Bank Maintenance

The Memory Bank should be maintained through these workflows:

### Planning
Used for project planning, strategy development, and approach consideration.

### Development
During implementation:
1. Check the Memory Bank for context before starting work
2. Update documentation as features are completed
3. Document new decisions and patterns
4. Track progress
5. Update technical details as they evolve

Remember: The effectiveness of future development depends on the accuracy and completeness of the Memory Bank's documentation.
