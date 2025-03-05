import { useState, useCallback } from 'react';
import ColorThief from "colorthief";

/**
 * Custom hook to extract dominant color from an image.
 * 
 * @function useImageColor
 * @param {Array<number>} [defaultColor=[0, 110, 230]] - Default RGB color to use before extraction or on error
 * @returns {Object} Object containing color extraction state and handlers
 * @returns {Array<number>} returns.color - The current RGB color array
 * @returns {Function} returns.getColorFromImage - Handler to extract color from an image element
 * @returns {Function} returns.resetToDefaultColor - Handler to reset to the default color
 * @returns {Function} returns.rgbToString - Utility to convert RGB array to CSS color string
 * 
 * @example
 * import { useImageColor } from '@hooks/useImageColor';
 * 
 * const Component = () => {
 *   const { color, getColorFromImage, rgbToString } = useImageColor([50, 100, 200]);
 *   
 *   const handleImageLoad = (e) => {
 *     getColorFromImage(e.target);
 *   };
 *   
 *   return (
 *     <div style={{ backgroundColor: rgbToString(color) }}>
 *       <img 
 *         src="/logo.png" 
 *         onLoad={handleImageLoad}
 *       />
 *     </div>
 *   );
 * };
 */
const useImageColor = (defaultColor = [0, 110, 230]) => {
  const [color, setColor] = useState(defaultColor);
  
  /**
   * Extract dominant color from an image element
   * 
   * @param {HTMLImageElement} imgElement - The image element to extract color from
   */
  const getColorFromImage = useCallback((imgElement) => {
    try {
      if (imgElement && imgElement.complete) {
        const colorThief = new ColorThief();
        const extractedColor = colorThief.getColor(imgElement);
        setColor(extractedColor);
      }
    } catch (error) {
      console.error("Error getting color from image:", error);
      // Fallback to default color
      setColor(defaultColor);
    }
  }, [defaultColor]);
  
  /**
   * Reset color to the default
   */
  const resetToDefaultColor = useCallback(() => {
    setColor(defaultColor);
  }, [defaultColor]);
  
  /**
   * Convert RGB array to CSS color string
   * 
   * @param {Array<number>} values - RGB array [r, g, b]
   * @returns {string} CSS RGB color string
   */
  const rgbToString = useCallback((values) => {
    return typeof values === "undefined" || !values
      ? `rgb(${defaultColor.join(', ')})`
      : `rgb(${values.join(', ')})`;
  }, [defaultColor]);
  
  return {
    color,
    getColorFromImage,
    resetToDefaultColor,
    rgbToString
  };
};

export default useImageColor;
