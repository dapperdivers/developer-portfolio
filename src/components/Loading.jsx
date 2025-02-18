import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div 
            className="loading-container"
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="loading-spinner">
                <span className="visually-hidden">Content is loading...</span>
            </div>
        </div>
    );
};

export default Loading;
