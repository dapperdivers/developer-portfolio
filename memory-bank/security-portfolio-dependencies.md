# Security Portfolio Dependencies

This document outlines the additional dependencies needed to implement the security-focused portfolio redesign according to our `security-portfolio-design-plan.md`.

## Core Visualization Libraries

### D3.js and Related Packages
- **d3**: Main D3.js library for creating data visualizations
- **d3-geo**: For geographical visualizations (attack maps, threat intelligence)
- **d3-force**: For force-directed graph visualizations (Kubernetes architecture, network diagrams)
- **d3-scale-chromatic**: For color scales in visualizations
- **topojson-client**: For working with TopoJSON data in geographical visualizations

```bash
- [ ] yarn add d3 d3-geo d3-force d3-scale-chromatic topojson-client
```

### Integration with React
- **react-d3-library**: For easier integration of D3 visualizations in React components
- **@visx/visx**: React-based visualization components built on D3

```bash
- [ ] yarn add react-d3-library @visx/visx
```

## Data Fetching and Real-time Updates

### Data Fetching
- **react-query**: For data fetching, caching, and state management
- **swr**: Alternative to React Query for data fetching with stale-while-revalidate strategy

```bash
- [ ] yarn add react-query swr
```

### Real-time Updates
- **socket.io-client**: For WebSocket connections to real-time security data feeds
- **pusher-js**: Alternative for real-time updates with less overhead

```bash
- [ ] yarn add socket.io-client pusher-js
```

## Typography and UI Enhancements

### Fonts
- **@fontsource/jetbrains-mono**: JetBrains Mono for headings
- **@fontsource/inter**: Inter for body text
- **@fontsource/fira-code**: Fira Code for code snippets
- **@fontsource/ibm-plex-mono**: IBM Plex Mono for terminal output

```bash
- [ ] yarn add @fontsource/jetbrains-mono @fontsource/inter @fontsource/fira-code @fontsource/ibm-plex-mono
```

### Animation and Interaction
- **framer-motion**: Already installed, will be used for micro-animations
- **react-spring**: For physics-based animations in security visualizations
- **use-gesture**: For advanced gestures like pinch-zoom in architecture diagrams

```bash
- [ ] yarn add react-spring @use-gesture/react
```

## Security Feed Integration

### API Clients and Parsers
- **axios**: Already installed, will be used for API requests
- **xml2js**: For parsing XML responses from security feeds
- **fast-xml-parser**: Alternative to xml2js with better performance
- **papaparse**: For parsing CSV data from security feeds

```bash
- [ ] yarn add xml2js fast-xml-parser papaparse
```

### Security Data Processing
- **fuzzysort**: For fuzzy searching in security data
- **jsonpath**: For extracting specific data from complex security API responses
- **lodash**: For general utility functions

```bash
- [ ] yarn add fuzzysort jsonpath lodash
```

## Code Syntax Highlighting

### Code Display
- **prism-react-renderer**: For syntax highlighting of code snippets
- **react-syntax-highlighter**: Alternative with more themes

```bash
- [ ] yarn add prism-react-renderer react-syntax-highlighter
```

## Performance Optimization

### Web Workers and Optimization
- **comlink**: For easier communication with Web Workers
- **web-worker**: For offloading heavy data processing from the main thread
- **react-window**: For virtualizing long lists of security events
- **react-virtualized-auto-sizer**: For responsive virtualized components

```bash
- [ ] yarn add comlink web-worker react-window react-virtualized-auto-sizer
```

## Testing Libraries for Visualizations

### Visualization Testing
- **@testing-library/react**: Already installed
- **@testing-library/user-event**: For testing interactions with visualizations
- **@testing-library/react-hooks**: For testing custom hooks for data processing

```bash
- [ ] yarn add -D @testing-library/user-event @testing-library/react-hooks
```

## Development Tools for D3.js

### Development Experience
- **d3-array**: For advanced array operations in D3
- **d3-selection**: For working with DOM selections in D3
- **d3-transition**: For managing transitions in D3
- **d3-hierarchy**: For hierarchical data visualizations

```bash
- [ ] yarn add -D d3-array d3-selection d3-transition d3-hierarchy
```

## Implementation Strategy

We'll adopt a phased approach to adding these dependencies:

1. **Base Dependencies**:
   - [ ] Install core D3.js libraries and React integration packages
   - [ ] Add essential visualization capabilities
   - [ ] Set up basic typography and styling requirements

2. **Enhanced Visualization**:
   - [ ] Add data fetching and real-time update libraries
   - [ ] Implement advanced D3.js capabilities
   - [ ] Add performance optimization libraries

3. **User Experience Enhancement**:
   - [ ] Add typography and UI enhancement packages
   - [ ] Implement animation and interaction libraries
   - [ ] Add accessibility support libraries

4. **Data Integration**:
   - [ ] Add security feed integration libraries
   - [ ] Implement data processing capabilities
   - [ ] Add testing and development tools

This approach will allow us to incrementally implement features while maintaining a stable development environment.
