/**
 * D3.js Component Template Extension
 * 
 * This script extends the component generator with D3.js visualization component templates.
 * To use, copy this code into generate-component.js or require it from there.
 */

// D3 Component Template
// Add this to the template selection logic in generate-component.js
function generateD3ComponentTemplate(componentName, config) {
  const cssImportPath = config.importStyles
    ? `import '../assets/css/components/d3/${componentName.toLowerCase()}.css';`
    : '';
  
  return `import React, { useRef, useEffect${config.memoize ? ', memo' : ''} } from 'react';
${config.addPropTypes ? "import PropTypes from 'prop-types';" : ""}
${cssImportPath}
import * as d3 from 'd3';

${config.addJsDoc ? `/**
 * ${componentName} - D3.js visualization component
 * 
 * A security-focused visualization component using D3.js.
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} ${componentName} component
 */` : ""}
const ${componentName} = (props) => {
  const { 
    data,
    width = 500,
    height = 500,
    margin = { top: 20, right: 20, bottom: 30, left: 40 },
    className = '',
    ariaLabel = '${componentName} visualization',
    colorScale = d3.scaleOrdinal(d3.schemeCategory10),
    animated = true,
    onElementClick,
    ...rest 
  } = props;
  
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data || !svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    
    // Clear previous visualization
    svg.selectAll('*').remove();
    
    // Setup visualization
    const contentWidth = width - margin.left - margin.right;
    const contentHeight = height - margin.top - margin.bottom;
    
    const g = svg
      .append('g')
      .attr('transform', \`translate(\${margin.left},\${margin.top})\`);
    
    // Add accessible title and description
    svg.append('title').text(ariaLabel);
    svg.append('desc').text('${componentName} visualization of security data');
    
    // TODO: Implement visualization using D3.js
    // Example: create scales, axes, and visualization elements based on visualization type
    
    // Sample code for scales
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([0, contentWidth]);
      
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([contentHeight, 0]);
    
    // Sample code for axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', \`translate(0,\${contentHeight})\`)
      .call(xAxis);
      
    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);
    
    // Sample code for data visualization (e.g., scatter plot)
    const circles = g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5)
      .attr('fill', d => colorScale(d.category))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5);
    
    // Add interactions if needed
    if (onElementClick) {
      circles.style('cursor', 'pointer')
        .on('click', (event, d) => onElementClick(d));
    }
    
    // Add animations if enabled
    if (animated) {
      circles.attr('opacity', 0)
        .transition()
        .duration(750)
        .attr('opacity', 0.8);
    }
    
    // Add responsiveness with resize observer
    const resizeObserver = new ResizeObserver(() => {
      // Handle resize if needed
    });
    
    const container = svgRef.current.parentElement;
    if (container) {
      resizeObserver.observe(container);
    }
    
    // Cleanup
    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
      resizeObserver.disconnect();
    };
  }, [data, width, height, margin, colorScale, animated, onElementClick, ariaLabel]);
  
  return (
    <div 
      className={\`${componentName.toLowerCase()} \${className}\`}
      data-testid="${componentName.toLowerCase()}"
      {...rest}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        aria-label={ariaLabel}
        role="img"
      />
    </div>
  );
};

${config.addPropTypes ? `${componentName}.propTypes = {
  /** Data for the visualization */
  data: PropTypes.array.isRequired,
  /** Width of the SVG container in pixels or percentage */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Height of the SVG container in pixels */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Margins for the visualization */
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Accessibility label for the chart */
  ariaLabel: PropTypes.string,
  /** D3 color scale function */
  colorScale: PropTypes.func,
  /** Whether to animate the visualization */
  animated: PropTypes.bool,
  /** Click handler for data elements */
  onElementClick: PropTypes.func,
};` : ""}

${config.memoize ? `// Apply memoization for performance optimization
export default memo(${componentName});` : `export default ${componentName};`}
`;
}

// D3 Specialized Visualization Templates

// Radar Chart Component Template (for skills visualization)
function generateRadarChartTemplate(componentName, config) {
  const cssImportPath = config.importStyles
    ? `import '../assets/css/components/d3/${componentName.toLowerCase()}.css';`
    : '';
  
  return `import React, { useRef, useEffect${config.memoize ? ', memo' : ''} } from 'react';
${config.addPropTypes ? "import PropTypes from 'prop-types';" : ""}
${cssImportPath}
import * as d3 from 'd3';

${config.addJsDoc ? `/**
 * ${componentName} - Radar/Spider Chart Visualization
 * 
 * A radar chart visualization component for displaying multi-dimensional data like security skill domains.
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} ${componentName} component
 */` : ""}
const ${componentName} = (props) => {
  const { 
    data,
    domains,
    width = 500,
    height = 500,
    margin = { top: 50, right: 50, bottom: 50, left: 50 },
    maxValue = 100,
    levels = 5,
    className = '',
    colorScale = d3.scaleOrdinal(d3.schemeCategory10),
    highlightedDomain = null,
    onDomainClick,
    animated = true,
    legendPosition = 'bottom',
    ariaLabel = '${componentName} radar chart',
    ...rest 
  } = props;
  
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data || !domains || !domains.length || !svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    
    // Clear previous visualization
    svg.selectAll('*').remove();
    
    // Setup visualization
    const contentWidth = width - margin.left - margin.right;
    const contentHeight = height - margin.top - margin.bottom;
    const radius = Math.min(contentWidth, contentHeight) / 2;
    
    // Calculate center position
    const centerX = margin.left + contentWidth / 2;
    const centerY = margin.top + contentHeight / 2;
    
    const g = svg
      .append('g')
      .attr('transform', \`translate(\${centerX},\${centerY})\`);
    
    // Add accessible title and description
    svg.append('title').text(ariaLabel);
    svg.append('desc').text('Radar chart visualizing security domain expertise');
    
    // Calculate angles for each axis
    const angleSlice = (Math.PI * 2) / domains.length;
    
    // Create scales
    const rScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, radius]);
    
    // Draw circular grid lines
    for (let level = 1; level <= levels; level++) {
      const levelFactor = level / levels;
      
      // Draw level circles
      g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radius * levelFactor)
        .attr('class', 'radar-grid-circle')
        .style('fill', 'none')
        .style('stroke', 'gray')
        .style('stroke-opacity', 0.15)
        .style('stroke-dasharray', '3,3');
      
      // Add level labels
      g.append('text')
        .attr('x', 0)
        .attr('y', -radius * levelFactor)
        .attr('dy', '0.35em')
        .style('font-size', '10px')
        .style('fill', 'gray')
        .style('text-anchor', 'middle')
        .text(Math.round(maxValue * levelFactor));
    }
    
    // Draw axis lines
    const axes = g.selectAll('.axis')
      .data(domains)
      .enter()
      .append('g')
      .attr('class', 'radar-axis');
    
    // Draw axis lines
    axes.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y2', (d, i) => rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
      .style('stroke', 'gray')
      .style('stroke-opacity', 0.3)
      .style('stroke-width', '1px');
    
    // Add axis labels
    axes.append('text')
      .attr('x', (d, i) => rScale(maxValue * 1.15) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y', (d, i) => rScale(maxValue * 1.15) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('dy', '0.35em')
      .style('font-size', '11px')
      .style('fill', (d) => highlightedDomain === d.id ? colorScale(d.id) : '#333')
      .style('font-weight', (d) => highlightedDomain === d.id ? 'bold' : 'normal')
      .style('text-anchor', (d, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        if (Math.abs(angle) < 0.1 || Math.abs(angle - Math.PI) < 0.1) return 'middle';
        return angle > Math.PI / 2 && angle < 3 * Math.PI / 2 ? 'end' : 'start';
      })
      .text(d => d.name)
      .style('cursor', onDomainClick ? 'pointer' : 'default')
      .on('click', (event, d) => {
        if (onDomainClick) onDomainClick(d);
      });
    
    // Function to create radar paths
    const radarLine = d3.lineRadial()
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveCardinalClosed);
    
    // Process the data for the chart
    const radarData = data.map(domain => {
      // Map the domain skills to the format needed for the radar chart
      const points = domains.map(axis => {
        // Find the skill that matches this axis
        const skill = domain.skills.find(s => s.id === axis.id) || { level: 0 };
        return { axis: axis.id, value: skill.level };
      });
      
      return {
        id: domain.id,
        name: domain.name,
        color: domain.color || colorScale(domain.id),
        points: points
      };
    });
    
    // Draw the radar chart paths
    const radarPaths = g.selectAll('.radar-path')
      .data(radarData)
      .enter()
      .append('path')
      .attr('class', 'radar-path')
      .attr('d', d => radarLine(d.points))
      .style('fill', d => d.color)
      .style('fill-opacity', (d) => highlightedDomain === d.id ? 0.8 : 0.4)
      .style('stroke', d => d.color)
      .style('stroke-width', (d) => highlightedDomain === d.id ? 3 : 2)
      .style('pointer-events', 'all')
      .style('cursor', onDomainClick ? 'pointer' : 'default')
      .on('mouseenter', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('fill-opacity', 0.8);
      })
      .on('mouseleave', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('fill-opacity', highlightedDomain === d.id ? 0.8 : 0.4);
      })
      .on('click', (event, d) => {
        if (onDomainClick) onDomainClick(d);
      });
    
    // Add animation if enabled
    if (animated) {
      radarPaths.style('stroke-dasharray', function() {
          const length = this.getTotalLength();
          return \`\${length} \${length}\`;
        })
        .style('stroke-dashoffset', function() {
          return this.getTotalLength();
        })
        .style('opacity', 0)
        .transition()
        .duration(1000)
        .style('stroke-dashoffset', 0)
        .style('opacity', 1);
    }
    
    // Add legend if there are multiple domains
    if (radarData.length > 1) {
      const legendG = svg.append('g')
        .attr('class', 'radar-legend');
      
      // Position the legend based on the legendPosition prop
      let legendX, legendY;
      switch (legendPosition) {
        case 'top':
          legendX = width / 2;
          legendY = margin.top / 2;
          break;
        case 'right':
          legendX = width - margin.right / 2;
          legendY = height / 2;
          break;
        case 'left':
          legendX = margin.left / 2;
          legendY = height / 2;
          break;
        case 'bottom':
        default:
          legendX = width / 2;
          legendY = height - margin.bottom / 2;
      }
      
      legendG.attr('transform', \`translate(\${legendX},\${legendY})\`);
      
      const legendItems = legendG.selectAll('.legend-item')
        .data(radarData)
        .enter()
        .append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => \`translate(\${(i - radarData.length / 2) * 100}, 0)\`);
      
      legendItems.append('circle')
        .attr('r', 5)
        .attr('fill', d => d.color);
      
      legendItems.append('text')
        .attr('x', 10)
        .attr('y', 0)
        .attr('dy', '0.35em')
        .style('font-size', '12px')
        .style('fill', d => highlightedDomain === d.id ? d.color : '#333')
        .style('font-weight', d => highlightedDomain === d.id ? 'bold' : 'normal')
        .text(d => d.name);
    }
    
    // Add responsiveness with resize observer
    const resizeObserver = new ResizeObserver(() => {
      // Handle resize if needed
    });
    
    const container = svgRef.current.parentElement;
    if (container) {
      resizeObserver.observe(container);
    }
    
    // Cleanup
    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
      resizeObserver.disconnect();
    };
  }, [data, domains, width, height, margin, maxValue, levels, colorScale, highlightedDomain, onDomainClick, animated, legendPosition, ariaLabel]);
  
  return (
    <div 
      className={\`${componentName.toLowerCase()} \${className}\`}
      data-testid="${componentName.toLowerCase()}"
      {...rest}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        aria-label={ariaLabel}
        role="img"
      />
    </div>
  );
};

${config.addPropTypes ? `${componentName}.propTypes = {
  /** Domain data for the radar chart */
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      level: PropTypes.number.isRequired
    })).isRequired
  })).isRequired,
  /** Domain axes for the chart */
  domains: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  /** Width of the SVG container */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Height of the SVG container */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Margins for the visualization */
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  /** Maximum value for the radar scales */
  maxValue: PropTypes.number,
  /** Number of concentric circles in the grid */
  levels: PropTypes.number,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** D3 color scale function */
  colorScale: PropTypes.func,
  /** ID of the domain to highlight */
  highlightedDomain: PropTypes.string,
  /** Handler for domain click events */
  onDomainClick: PropTypes.func,
  /** Whether to animate the chart */
  animated: PropTypes.bool,
  /** Position of the legend */
  legendPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Accessibility label for the chart */
  ariaLabel: PropTypes.string,
};` : ""}

${config.memoize ? `// Apply memoization for performance optimization
export default memo(${componentName});` : `export default ${componentName};`}
`;
}

// Network Graph Component Template (for Kubernetes architecture)
function generateNetworkGraphTemplate(componentName, config) {
  const cssImportPath = config.importStyles
    ? `import '../assets/css/components/d3/${componentName.toLowerCase()}.css';`
    : '';
  
  return `import React, { useRef, useEffect, useState${config.memoize ? ', memo' : ''} } from 'react';
${config.addPropTypes ? "import PropTypes from 'prop-types';" : ""}
${cssImportPath}
import * as d3 from 'd3';

${config.addJsDoc ? `/**
 * ${componentName} - Network/Force-Directed Graph Visualization
 * 
 * A network graph visualization for showing relationships between components,
 * like Kubernetes architecture or security infrastructure relationships.
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} ${componentName} component
 */` : ""}
const ${componentName} = (props) => {
  const { 
    nodes,
    links,
    width = 800,
    height = 600,
    nodeTypes = {},
    linkTypes = {},
    nodeRadius = 20,
    nodeLabelSize = 10,
    linkDistance = 100,
    charge = -300,
    className = '',
    selectedNode = null,
    onNodeSelect,
    animated = true,
    showLabels = true,
    zoomable = true,
    ariaLabel = '${componentName} network graph',
    ...rest 
  } = props;
  
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({ show: false, content: null, x: 0, y: 0 });
  
  useEffect(() => {
    if (!nodes || !links || !svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    
    // Clear previous visualization
    svg.selectAll('*').remove();
    
    // Add accessible title and description
    svg.append('title').text(ariaLabel);
    svg.append('desc').text('Network graph visualization of component relationships');
    
    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    
    if (zoomable) {
      svg.call(zoom);
    }
    
    // Main visualization group
    const g = svg.append('g')
      .attr('class', 'network-container');
    
    // Initialize the simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(linkDistance))
      .force('charge', d3.forceManyBody().strength(charge))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(nodeRadius * 1.5));
    
    // Create arrow markers for directed links
    svg.append('defs').selectAll('marker')
      .data(Object.keys(linkTypes))
      .enter().append('marker')
      .attr('id', d => \`arrow-\${d}\`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', nodeRadius + 12)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', d => linkTypes[d]?.color || '#999');
    
    // Draw the links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('path')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('stroke', d => linkTypes[d.type]?.color || '#999')
      .attr('stroke-width', d => linkTypes[d.type]?.width || 1)
      .attr('stroke-dasharray', d => linkTypes[d.type]?.dashed ? '5,5' : null)
      .attr('opacity', d => linkTypes[d.type]?.opacity || 0.6)
      .attr('marker-end', d => \`url(#arrow-\${d.type})\`);
    
    // Create node groups
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('data-id', d => d.id)
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));
    
    // Add circles for nodes
    node.append('circle')
      .attr('r', d => nodeTypes[d.type]?.radius || nodeRadius)
      .attr('fill', d => nodeTypes[d.type]?.color || '#1f77b4')
      .attr('stroke', d => d.id === selectedNode ? '#ff4d4d' : '#fff')
      .attr('stroke-width', d => d.id === selectedNode ? 3 : 1.5)
      .attr('opacity', d => nodeTypes[d.type]?.opacity || 0.8);
    
    // Add icons or symbols inside nodes
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', d => nodeTypes[d.type]?.iconColor || '#fff')
      .attr('font-family', 'FontAwesome')
      .attr('font-size', d => nodeTypes[d.type]?.iconSize || 12)
      .text(d => nodeTypes[d.type]?.icon || '');
    
    // Add text labels for nodes if enabled
    if (showLabels) {
      node.append('text')
        .attr('dy', d => nodeTypes[d.type]?.radius || nodeRadius + 12)
        .attr('text-anchor', 'middle')
        .attr('font-size', nodeLabelSize)
        .attr('fill', '#333')
        .text(d => d.name)
        .style('pointer-events', 'none')
        .each(function(d) {
          const text = d3.select(this);
          const words = d.name.split(/\\s+/);
          
          if (words.length > 1) {
            text.text(null);
            words.forEach((word, i) => {
              text.append('tspan')
                .attr('x', 0)
                .attr('dy', i ? '1.2em' : 0)
                .text(word);
            });
          }
        });
    }
    
    // Add hover behavior
    node
      .on('mouseenter', function(event, d) {
        // Highlight node
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('stroke-width', 3)
          .attr('r', (nodeTypes[d.type]?.radius || nodeRadius) * 1.1);
        
        // Highlight connected links and nodes
        const connectedNodeIds = new Set();
        link.each(function(l) {
          if (l.source.id === d.id || l.target.id === d.id) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('stroke-width', (linkTypes[l.type]?.width || 1) * 2)
              .attr('opacity', 1);
            
            connectedNodeIds.add(l.source.id === d.id ? l.target.id : l.source.id);
          }
        });
        
        node.each(function(n) {
          if (connectedNodeIds.has(n.id)) {
            d3.select(this).select('circle')
              .transition()
              .duration(200)
              .attr('stroke-width', 2);
          }
        });
        
        // Show tooltip
        setTooltip({
          show: true,
          content: (
            <div>
              <div className="font-bold">{d.name}</div>
              {d.description && <div>{d.description}</div>}
              {d.type && <div className="text-xs mt-1">Type: {d.type}</div>}
            </div>
          ),
          x: event.pageX,
          y: event.pageY
        });
      })
      .on('mouseleave', function(event, d) {
        // Reset node
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('stroke-width', d.id === selectedNode ? 3 : 1.5)
          .attr('r', nodeTypes[d.type]?.radius || nodeRadius);
        
        // Reset links and connected nodes
        link
          .transition()
          .duration(200)
          .attr('stroke-width', l => linkTypes[l.type]?.width || 1)
          .attr('opacity', l => linkTypes[l.type]?.opacity || 0.6);
        
        node.select('circle')
          .transition()
          .duration(200)
          .attr('stroke-width', n => n.id === selectedNode ? 3 : 1.5);
        
        // Hide tooltip
        setTooltip({ show: false, content: null, x: 0, y: 0 });
      })
      .on('click', (event, d) => {
        if (onNodeSelect) {
          onNodeSelect(d);
        }
      });
    
    // Animation tick function
    simulation.on('tick', () => {
      // Update link positions
      link.attr('d', d => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        
        // Straight line for short links, curved for longer ones
        return dr < 100
          ? \`M\${d.source.x},\${d.source.y} L\${d.target.x},\${d.target.y}\`
          : \`M\${d.source.x},\${d.source.y} A\${dr},\${dr} 0 0,1 \${d.target.x},\${d.target.y}\`;
      });
      
      // Update node positions
      node.attr('transform', d => \`translate(\${d.x},\${d.y})\`);
    });
    
    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    // Add animation if enabled
    if (animated) {
      node.attr('opacity', 0)
        .transition()
        .duration(750)
        .attr('opacity', 1);
        
      link.style('opacity', 0)
        .transition()
        .duration(750)
        .style('opacity', d => linkTypes[d.type]?.opacity || 0.6);
    }
    
    // Add responsiveness with resize observer
    const resizeObserver = new ResizeObserver(() => {
      // Handle resize if needed
    });
    
    const container = svgRef.current.parentElement;
    if (container) {
      resizeObserver.observe(container);
    }
    
    // Cleanup
    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
      resizeObserver.disconnect();
    };
  }, [nodes, links, width, height, nodeTypes, linkTypes, nodeRadius, linkDistance, charge, selectedNode, animated, showLabels, zoomable, ariaLabel, nodeLabelSize]);
  
  return (
    <div 
      className={\`${componentName.toLowerCase()} \${className}\`}
      data-testid="${componentName.toLowerCase()}"
      {...rest}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        aria-label={ariaLabel}
        role="img"
      />
      
      {tooltip.show && (
        <div
          className="network-tooltip absolute z-10 p-2 bg-white rounded shadow-lg text-sm max-w-xs"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y + 10
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

${config.addPropTypes ? `${componentName}.propTypes = {
  /** Nodes for the network graph */
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    description: PropTypes.string
  })).isRequired,
  /** Links/edges between nodes */
  links: PropTypes.arrayOf(PropTypes.shape({
    source: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    type: PropTypes.string
  })).isRequired,
  /** Width of the SVG container */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Height of the SVG container */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Node type styling configurations */
  nodeTypes: PropTypes.objectOf(PropTypes.shape({
    color: PropTypes.string,
    radius: PropTypes.number,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    opacity: PropTypes.number
  })),
  /** Link type styling configurations */
  linkTypes: PropTypes.objectOf(PropTypes.shape({
    color: PropTypes.string,
    width: PropTypes.number,
    dashed: PropTypes.bool,
    opacity: PropTypes.number
  })),
  /** Base node radius */
  nodeRadius: PropTypes.number,
  /** Node label font size */
  nodeLabelSize: PropTypes.number,
  /** Distance between linked nodes */
  linkDistance: PropTypes.number,
  /** Strength of the repulsive force */
  charge: PropTypes.number,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** ID of the selected node */
  selectedNode: PropTypes.string,
  /** Handler for node selection */
  onNodeSelect: PropTypes.func,
  /** Whether to animate the graph */
  animated: PropTypes.bool,
  /** Whether to show node labels */
  showLabels: PropTypes.bool,
  /** Whether the graph is zoomable/pannable */
  zoomable: PropTypes.bool,
  /** Accessibility label for the graph */
  ariaLabel: PropTypes.string,
};` : ""}

${config.memoize ? `// Apply memoization for performance optimization
export default memo(${componentName});` : `export default ${componentName};`}
`;
}

// Export the template functions
module.exports = {
  generateD3ComponentTemplate,
  generateRadarChartTemplate,
  generateNetworkGraphTemplate
};
