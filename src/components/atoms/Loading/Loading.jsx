import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

/**
 * Loading component with security-themed variants
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.variant=''] - Visual variant ('', 'security', 'terminal')
 * @param {string} [props.type='spinner'] - Loading animation type ('spinner', 'pulse', 'dots')
 * @param {string} [props.size='md'] - Size of the loading indicator (sm, md, lg)
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement} Loading component
 */
const Loading = ({ 
    variant = '', 
    type = 'spinner', 
    size = 'md',
    className = '' 
}) => {
    // Size classes
    const sizeMap = {
        sm: 'loading-sm',
        md: '',
        lg: 'loading-lg'
    };
    
    const sizeClass = sizeMap[size] || '';
    
    // Base classes
    const containerClasses = [
        'loading-container',
        variant ? `loading-${variant}` : '',
        className
    ].filter(Boolean).join(' ');
    
    const loadingClasses = [
        `loading-${type}`,
        sizeClass
    ].filter(Boolean).join(' ');
    
    return (
        <div 
            className={containerClasses}
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div className={loadingClasses}>
                <span className="visually-hidden">Content is loading...</span>
            </div>
        </div>
    );
};

Loading.propTypes = {
    variant: PropTypes.oneOf(['', 'security', 'terminal']),
    type: PropTypes.oneOf(['spinner', 'pulse', 'dots']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string
};

export default Loading;
