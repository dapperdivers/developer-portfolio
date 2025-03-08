# TimelineCore Component Library

The TimelineCore component library provides building blocks for creating cyberpunk-themed timelines, progress indicators, and interactive navigation elements.

## Structure

The library is organized into the following sections:

- **Node**: Core timeline node components
- **Decorations**: Visual enhancements for timelines
  - BinaryStream: Animated binary digit streams
  - ConnectionHeader: Headers for timeline sections
  - MatrixBackground: Matrix-style background effects
  - TimelineDecorations: Container for timeline decorative elements

## Usage

Import components directly:

```jsx
import { 
  TimelineNode, 
  BinaryStream, 
  ConnectionHeader,
  MatrixBackground,
  TimelineDecorations 
} from '@components/atoms/TimelineCore';
```

Or import individual components:

```jsx
import TimelineNode from '@components/atoms/TimelineCore/Node';
import { BinaryStream } from '@components/atoms/TimelineCore/Decorations';
```

## Examples

See the TimelineCore story file for usage examples.

## Variants

Most components support these variants:
- Default
- Security (cybersecurity theme)
- Terminal (console/terminal theme) 