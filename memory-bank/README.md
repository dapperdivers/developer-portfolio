# Memory Bank

This directory contains Cline's Memory Bank - a comprehensive documentation system that maintains perfect context between development sessions. Cline reads these files at the start of each task to understand the project and continue work effectively.

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

## Memory Bank Maintenance

The Memory Bank is maintained through two workflows:

### Plan Mode
Used for project planning, strategy development, and approach consideration.

### Act Mode
Used for implementation, where Cline:
1. Checks the Memory Bank for context
2. Updates documentation as needed
3. Updates .clinerules if new patterns emerge
4. Executes the requested task
5. Documents changes

Remember: Cline's effectiveness depends entirely on the accuracy of the Memory Bank, as it starts completely fresh after each memory reset.
