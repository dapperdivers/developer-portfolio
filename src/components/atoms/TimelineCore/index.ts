import TimelineNode from './Node';
import BinaryStream from '../BinaryStream';
import ConnectionHeader from '../ConnectionHeader';
import MatrixBackground from '../MatrixBackground';
import TimelineDecorations from '../TimelineDecorations';

// Re-export types
import type { ConnectionHeaderProps } from '../ConnectionHeader';
import type { BinaryStreamProps } from '../BinaryStream';
import type { MatrixBackgroundProps } from '../MatrixBackground';
import type { TimelineDecorationsProps } from '../TimelineDecorations';

// Export all components
export {
  TimelineNode,
  ConnectionHeader,
  BinaryStream,
  MatrixBackground,
  TimelineDecorations
};

// Export types
export type {
  ConnectionHeaderProps,
  BinaryStreamProps,
  MatrixBackgroundProps,
  TimelineDecorationsProps
};

// Default export with all components
export default {
  TimelineNode,
  ConnectionHeader,
  BinaryStream,
  MatrixBackground,
  TimelineDecorations
}; 