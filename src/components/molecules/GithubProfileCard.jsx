import React from 'react';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from "framer-motion";
import SocialLinks from "@molecules/SocialLinks";
import Button from "@atoms/Button";

/**
 * GitHub profile card component for displaying user information from GitHub API.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.prof - GitHub profile data
 * @param {string} props.error - Error message if API call failed
 * @param {Function} props.onRetry - Callback function to retry API call
 * @returns {React.ReactElement} GithubProfileCard component
 */
const GithubProfileCard = ({ prof, error, onRetry }) => {
    // Check if profile data exists
    const hasProfile = prof && Object.keys(prof).length > 0;
    
    return (
        <div className="bg-gradient-to-r from-primary-700 to-primary-900 shadow-lg rounded-lg py-10 text-white" data-testid="github-profile-card">
            <div className="container mx-auto px-4">
                {!hasProfile || error ? (
                    // Fallback UI when GitHub API fails
                    <div className="py-12 px-6 text-center max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-primary-600/30 rounded-full mx-auto flex items-center justify-center mb-6">
                            <FaMapMarkerAlt size={32} className="text-primary-300" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">GitHub Profile Unavailable</h3>
                        <p className="text-primary-100 mb-8 text-lg">
                            {error || "Unable to load GitHub profile data. Please try again later."}
                        </p>
                        {onRetry && (
                            <Button 
                                className="px-6 py-2 bg-white text-primary-700 hover:bg-primary-50 font-semibold rounded-md transition-colors duration-200" 
                                onClick={onRetry}
                                variant="primary"
                            >
                                Retry
                            </Button>
                        )}
                    </div>
                ) : (
                    <motion.div 
                        className="py-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-wrap -mx-4 items-center">
                            <div className="w-full px-4 lg:w-4/12 order-2 lg:order-1 text-center mb-8 lg:mb-0">
                                <motion.div 
                                    className="inline-block"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <img 
                                        src={prof.avatar_url} 
                                        alt={`${prof.name || 'Profile'} avatar`}
                                        className="w-40 h-40 rounded-full border-4 border-primary-300 shadow-lg object-cover"
                                        loading="lazy"
                                    />
                                </motion.div>
                            </div>
                            <div className="w-full px-4 lg:w-8/12 order-1 lg:order-2 text-center lg:text-left">
                                <h2 className="text-3xl font-bold mb-3">
                                    Reach Out to Me!
                                </h2>
                                <p className="text-xl text-primary-100 mb-4">
                                    Discuss a project or just want to say hi? My inbox is open for all
                                </p>
                                {prof.bio && (
                                    <p className="text-primary-200 mb-4 text-lg">
                                        {prof.bio}
                                    </p>
                                )}
                                {prof.location && (
                                    <div className="inline-flex items-center bg-primary-800/50 px-4 py-2 rounded-full mb-6">
                                        <FaMapMarkerAlt className="text-primary-300 mr-2" aria-hidden="true" />
                                        <span className="text-primary-100">{prof.location}</span>
                                    </div>
                                )}
                                <div className="mt-6">
                                    <SocialLinks />
                                </div>
                            </div>                    
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
     );
};

GithubProfileCard.propTypes = {
    prof: PropTypes.object,
    error: PropTypes.string,
    onRetry: PropTypes.func
};

export default GithubProfileCard;
