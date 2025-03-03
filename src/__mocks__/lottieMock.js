// Mock for lottie-react
import React from 'react';

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

export default Lottie;