# Timeline Decorations

This folder contains atomic decorative components used in the timeline UI with a cyberpunk hacker aesthetic.

## Components

- **ConnectionHeader**: Displays a secure connection header with status code
- **BinaryStream**: Creates streams of binary digits (1s and 0s) for cyberpunk visual effects
- **MatrixBackground**: Creates a digital rain effect similar to "The Matrix" movie
- **SecurityDecorations**: Container that organizes multiple binary streams

## Usage

These components can be used independently in any UI that needs cyberpunk visual elements:

```jsx
import { 
  ConnectionHeader, 
  BinaryStream, 
  MatrixBackground, 
  SecurityDecorations 
} from '@atoms/TimelineDecorations';

// Example usage
<div className="my-cyberpunk-ui">
  <MatrixBackground characterCount={30} />
  <ConnectionHeader title="SYSTEM ONLINE" statusCode="[0xAF254]" />
  <div className="content">...</div>
  <SecurityDecorations showLeft showRight />
</div>
```

These components are designed to be atomic building blocks for more complex UI elements with a consistent cyberpunk hacker theme.