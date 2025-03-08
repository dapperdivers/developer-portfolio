# Timeline Component

This is a generic, reusable Timeline component with a cyberpunk hacker aesthetic.

## Features

- Displays any data in a vertical timeline format
- Supports multiple themes: security, terminal, cyberpunk
- Configurable decorative elements
- Handles loading, error, and empty states
- Fully customizable with composition pattern

## Usage

The Timeline component is designed to be highly reusable. It accepts any data structure through the `TimelineItem` interface and a custom component for rendering each item:

```jsx
import Timeline from '@molecules/Timeline';
import MyCustomTimelineEntry from './MyCustomTimelineEntry';

const MyTimeline = ({ items }) => {
  // Transform your data to TimelineItem format
  const timelineItems = items.map(item => ({
    id: item.id,
    date: item.date,
    content: item // Pass your full item as content
  }));

  // Define how to render each entry
  const renderTimelineEntry = (props) => (
    <MyCustomTimelineEntry
      data={props.data}
      index={props.index}
      formatDate={formatDate}
      variant={props.variant}
      id={props.id}
    />
  );

  return (
    <Timeline
      items={timelineItems}
      entryComponent={renderTimelineEntry}
      formatDate={formatDate}
      variant="security"
      // ...other options
    />
  );
};
```

## Customization

The Timeline component supports many customization options:

- `variant`: Visual theme ('security', 'terminal', 'cyberpunk')
- `showDecorations`: Toggle decorative elements
- `showMatrixBg`: Toggle matrix background effect
- `showBinaryStreams`: Toggle binary streams
- Custom connection header and footer
- Custom loading, error, and empty states