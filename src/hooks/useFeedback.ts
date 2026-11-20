import { usePortfolio } from '@context/PortfolioContext';

/**
 * Custom hook to access feedback data from the portfolio context.
 * 
 * @function useFeedback
 * @returns {Array} Array of feedback objects
 * 
 * @example
 * import { useFeedback } from '@hooks/useFeedback';
 * 
 * const FeedbackList = () => {
 *   const feedbacks = useFeedback();
 *   
 *   return (
 *     <div>
 *       {feedbacks.map(feedback => (
 *         <div key={feedback.name}>{feedback.name}</div>
 *       ))}
 *     </div>
 *   );
 * };
 */
const useFeedback = () => {
  const { feedbacks } = usePortfolio();
  return feedbacks;
};

export default useFeedback;
