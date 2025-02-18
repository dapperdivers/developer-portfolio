import React, { Suspense } from 'react';
import Lottie from 'lottie-react';
import Loading from './Loading';

const GreetingLottie = ({ animationData }) => {
    return (
        <Suspense fallback={<Loading />}>
            <div 
                className="lottie-container"
                role="img"
                aria-label="Animation illustrating coding and development"
            >
                <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                    rendererSettings={{
                        preserveAspectRatio: 'xMidYMid slice',
                        progressiveLoad: true
                    }}
                />
            </div>
        </Suspense>
    );
};
 
export default GreetingLottie;
