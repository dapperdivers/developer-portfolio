// Mock for lottie-react
import React from 'react';
import { vi } from 'vitest';

const Lottie = ({ animationData, loop, autoplay, ...props }) => (
  <div
    data-testid="mock-lottie"
    data-animation={animationData ? 'present' : 'missing'}
    data-loop={loop ? 'true' : 'false'}
    data-autoplay={autoplay ? 'true' : 'false'}
    {...props}
  >
    Lottie Animation
  </div>
);

Lottie.defaultProps = {
  loop: true,
  autoplay: true,
  animationData: null,
};

export const useLottie = vi.fn().mockImplementation(({ animationData }) => ({
  View: () => <Lottie animationData={animationData} />,
}));

export default Lottie;