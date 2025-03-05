import { useCallback } from 'react';

/**
 * Custom hook providing optimized callback handlers for common portfolio actions.
 * Uses useCallback to memoize functions, preventing unnecessary re-renders.
 * 
 * @function useCallbackHandlers
 * @returns {Object} Object containing memoized callback functions
 * @returns {Function} returns.handleExternalLink - Handler for external links
 * @returns {Function} returns.handleProjectClick - Handler for project clicks
 * @returns {Function} returns.handleContactSubmit - Handler for contact form submission
 * @returns {Function} returns.handleDownload - Handler for download buttons
 * 
 * @example
 * import { useCallbackHandlers } from '@hooks/useCallbackHandlers';
 * 
 * const Component = () => {
 *   const { handleExternalLink, handleDownload } = useCallbackHandlers();
 *   
 *   return (
 *     <div>
 *       <a onClick={(e) => handleExternalLink(e, 'https://example.com')}>Link</a>
 *       <button onClick={() => handleDownload('/files/resume.pdf')}>Download</button>
 *     </div>
 *   );
 * };
 */
const useCallbackHandlers = () => {
  /**
   * Handle external link clicks with security best practices
   * 
   * @param {Event} e - Click event
   * @param {string} url - URL to navigate to
   * @param {boolean} [newTab=true] - Whether to open in new tab
   */
  const handleExternalLink = useCallback((e, url, newTab = true) => {
    if (!url) return;
    
    if (newTab) {
      e.preventDefault();
      const newWindow = window.open(url, '_blank');
      newWindow.opener = null;
      newWindow.rel = 'noopener noreferrer';
    }
  }, []);
  
  /**
   * Handle project card clicks
   * 
   * @param {Event} e - Click event
   * @param {Object} project - Project data object
   * @param {string} actionType - Type of action ('view', 'github', 'demo')
   */
  const handleProjectClick = useCallback((e, project, actionType) => {
    if (!project) return;
    
    let url;
    switch(actionType) {
      case 'github':
        url = project.github;
        break;
      case 'demo':
        url = project.url;
        break;
      case 'view':
      default:
        url = project.url || project.github;
    }
    
    if (url) {
      e.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');
      
      // Analytics tracking if implemented
      if (window.gtag) {
        window.gtag('event', 'project_click', {
          event_category: 'Projects',
          event_label: project.name,
          action_type: actionType
        });
      }
    }
  }, []);
  
  /**
   * Handle contact form submission
   * 
   * @param {Event} e - Form submit event
   * @param {Object} formData - Form data object
   * @returns {Promise} Promise resolving to submission result
   */
  const handleContactSubmit = useCallback(async (e, formData) => {
    e.preventDefault();
    
    try {
      // Form validation
      if (!formData.email || !formData.message) {
        return { success: false, error: 'Please fill in all required fields' };
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }
      
      // Here you would typically make an API call to submit the form
      // This is a placeholder for the actual implementation
      console.log('Form submitted:', formData);
      
      // Simulate API call success
      return { success: true, message: 'Message sent successfully!' };
    } catch (error) {
      console.error('Error submitting form:', error);
      return {
        success: false,
        error: 'There was an error sending your message. Please try again.'
      };
    }
  }, []);
  
  /**
   * Handle file download with tracking
   * 
   * @param {string} filePath - Path to file
   * @param {string} [fileName] - Custom filename for download
   */
  const handleDownload = useCallback((filePath, fileName) => {
    if (!filePath) return;
    
    // Create anchor element to trigger download
    const link = document.createElement('a');
    link.href = filePath;
    if (fileName) {
      link.download = fileName;
    }
    
    // Append to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Analytics tracking if implemented
    if (window.gtag) {
      window.gtag('event', 'download', {
        event_category: 'Resources',
        event_label: fileName || filePath
      });
    }
  }, []);

  /**
   * Toggle theme mode (dark/light)
   * 
   * @param {string} [mode] - Force specific mode, or toggle if not provided
   * @returns {string} The resulting theme mode
   */
  const handleThemeToggle = useCallback((mode) => {
    const htmlEl = document.documentElement;
    const currentMode = htmlEl.getAttribute('data-theme') || 'light';
    const newMode = mode || (currentMode === 'light' ? 'dark' : 'light');
    
    htmlEl.setAttribute('data-theme', newMode);
    localStorage.setItem('theme-preference', newMode);
    
    // Dispatch theme change event for other components to react
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newMode } }));
    
    return newMode;
  }, []);
  
  return {
    handleExternalLink,
    handleProjectClick,
    handleContactSubmit,
    handleDownload,
    handleThemeToggle
  };
};

export default useCallbackHandlers;
