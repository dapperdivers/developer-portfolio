import React from 'react';
import './timelineCore.css';
import {
  TimelineNode,
  ConnectionHeader,
  BinaryStream,
  MatrixBackground,
  TimelineDecorations
} from './';

/**
 * # TimelineCore Component Library
 * 
 * The TimelineCore library provides building blocks for creating cyberpunk-themed
 * timelines with a variety of customizable components.
 * 
 * ## Component Categories
 * 
 * - **Node Components**: `TimelineNode`
 * - **Decoration Components**: `ConnectionHeader`, `BinaryStream`, `MatrixBackground`, `TimelineDecorations`
 * 
 * ## Theming
 * 
 * Components support multiple themes including default, security, and terminal variants.
 * 
 * ## Individual Component Stories
 * 
 * Each component has its own story file with detailed documentation:
 * 
 * - [TimelineNode](/story/atoms-timelinecore-node-timelinenode--docs)
 * - [BinaryStream](/story/atoms-timelinecore-decorations-binarystream--docs)
 * - [ConnectionHeader](/story/atoms-timelinecore-decorations-connectionheader--docs)
 * - [MatrixBackground](/story/atoms-timelinecore-decorations-matrixbackground--docs)
 * - [TimelineDecorations](/story/atoms-timelinecore-decorations-timelinedecorations--docs)
 */

const meta = {
  title: 'Atoms/TimelineCore',
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Core components for building interactive timelines with cyberpunk aesthetics',
    docs: {
      description: {
        component: 'The TimelineCore components provide building blocks for creating cyberpunk-themed timelines. It includes nodes, decorative elements, and connection indicators with customizable variants, animations, and accessibility features. Perfect for creating interactive timelines, progress indicators, and futuristic navigation elements.'
      }
    }
  }
};

export default meta;

// Container for consistent display
const TimelineContainer = ({ children, background = 'var(--color-background)' }) => (
  <div style={{
    padding: '2rem',
    background,
    borderRadius: '8px',
    margin: '1rem 0',
    maxWidth: '800px',
    position: 'relative',
    overflow: 'hidden'
  }}>
    {children}
  </div>
);

// Basic Timeline Node
export const BasicNode = {
  render: () => (
    <TimelineContainer>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <TimelineNode size="sm" />
        <TimelineNode size="md" />
        <TimelineNode size="lg" />
      </div>
    </TimelineContainer>
  )
};

// Node Variants
export const NodeVariants = {
  render: () => (
    <TimelineContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Default</h4>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <TimelineNode size="md" />
            <TimelineNode size="md" active />
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Security</h4>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <TimelineNode size="md" variant="security" />
            <TimelineNode size="md" variant="security" active />
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Terminal</h4>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <TimelineNode size="md" variant="terminal" />
            <TimelineNode size="md" variant="terminal" active />
          </div>
        </div>
      </div>
    </TimelineContainer>
  )
};

// Interactive Timeline
export const InteractiveNodes = {
  render: () => (
    <TimelineContainer>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <ConnectionHeader 
          title="INTERACTIVE TIMELINE" 
          statusCode="[0xF1] ACTIVE"
          variant="security"
        />
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          padding: '2rem 0'
        }}>
          <div style={{
            position: 'absolute',
            left: '0',
            right: '0',
            top: '50%',
            height: '2px',
            background: 'var(--color-border)',
            transform: 'translateY(-50%)'
          }} />
          <TimelineNode 
            size="md" 
            variant="security" 
            active 
            interactive 
            id="node-1"
          />
          <TimelineNode 
            size="md" 
            variant="security" 
            interactive 
            id="node-2"
          />
          <TimelineNode 
            size="md" 
            variant="security" 
            interactive 
            id="node-3"
          />
        </div>
      </div>
    </TimelineContainer>
  )
};

// Decorative Elements
export const Decorations = {
  render: () => (
    <TimelineContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Binary Streams</h4>
          <div style={{ 
            position: 'relative', 
            height: '100px',
            border: '1px solid var(--color-border)',
            borderRadius: '4px'
          }}>
            <BinaryStream position="left" count={20} />
            <BinaryStream position="right" count={20} baseDelay={0.2} />
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Matrix Background</h4>
          <div style={{ 
            position: 'relative', 
            height: '100px',
            border: '1px solid var(--color-border)',
            borderRadius: '4px'
          }}>
            <MatrixBackground characterCount={30} />
          </div>
        </div>
      </div>
    </TimelineContainer>
  )
};

// Timeline with Decorations
export const DecoratedTimeline = {
  render: () => (
    <TimelineContainer>
      <div style={{ 
        position: 'relative',
        padding: '2rem',
        border: '1px solid var(--color-border)',
        borderRadius: '8px'
      }}>
        <TimelineDecorations 
          variant="security"
          showLeft
          showRight
          showTop
          showBottom
        />
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1
        }}>
          <TimelineNode size="md" variant="security" active />
          <TimelineNode size="md" variant="security" />
          <TimelineNode size="md" variant="security" />
        </div>
      </div>
    </TimelineContainer>
  )
};

// Connection Headers
export const Headers = {
  render: () => (
    <TimelineContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Security Variant</h4>
          <ConnectionHeader 
            title="SECURE CONNECTION ESTABLISHED" 
            statusCode="[0xFF2941] VERIFIED"
            variant="security"
          />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Terminal Variant</h4>
          <ConnectionHeader 
            title="TERMINAL ACCESS GRANTED" 
            statusCode="[0xA1B2] CONNECTED"
            variant="terminal"
          />
        </div>
      </div>
    </TimelineContainer>
  )
};

// Complete Example
export const CompleteExample = {
  render: () => (
    <TimelineContainer background="var(--color-background-dark, #121212)">
      <div style={{ 
        position: 'relative',
        padding: '2rem',
        border: '1px solid var(--color-accent, #05d5fa)',
        borderRadius: '8px',
        color: 'var(--color-text-light, #e1e1e1)'
      }}>
        <TimelineDecorations 
          variant="security"
          showLeft
          showRight
          showTop
          showBottom
        />
        <div style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
          <ConnectionHeader 
            title="CYBERPUNK TIMELINE" 
            statusCode="[0xF1] INITIALIZED"
            variant="security"
          />
        </div>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <TimelineNode size="md" variant="security" active animated />
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Phase One: Initialization</h4>
              <p style={{ margin: 0, opacity: 0.8 }}>System protocols activated</p>
            </div>
          </div>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <TimelineNode size="md" variant="security" />
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Phase Two: Data Processing</h4>
              <p style={{ margin: 0, opacity: 0.8 }}>Core systems online</p>
            </div>
          </div>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <TimelineNode size="md" variant="security" />
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Phase Three: Authentication</h4>
              <p style={{ margin: 0, opacity: 0.8 }}>Awaiting authorization</p>
            </div>
          </div>
        </div>
      </div>
    </TimelineContainer>
  )
}; 