import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from "framer-motion";
import SocialLinks from "../components/SocialLinks";
import Button from "./ui/Button";

const GithubProfileCard = ({ prof, error, onRetry }) => {
    // Check if profile data exists
    const hasProfile = prof && Object.keys(prof).length > 0;
    
    return (
        <div className="contact-card bg-gradient-accent shadow-lg border-0">
            <div className="container mx-auto px-4">
                {!hasProfile || error ? (
                    // Fallback UI when GitHub API fails
                    <div className="github-fallback">
                        <div className="fallback-image mx-auto flex items-center justify-center">
                            <FaMapMarkerAlt size={40} className="text-accent" />
                        </div>
                        <h3 className="fallback-title">GitHub Profile Unavailable</h3>
                        <p className="fallback-message">
                            {error || "Unable to load GitHub profile data. Please try again later."}
                        </p>
                        {onRetry && (
                            <Button 
                                className="refresh-button" 
                                onClick={onRetry}
                                variant="primary"
                            >
                                Retry
                            </Button>
                        )}
                    </div>
                ) : (
                    <motion.div 
                        className="contact-card-inner"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-wrap -mx-4 items-center">
                            <div className="w-full px-4 lg:w-4/12 order-2 lg:order-2 text-center">
                                <motion.div 
                                    className="profile-image-container"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <img 
                                        src={prof.avatar_url} 
                                        alt={`${prof.name || 'Profile'} avatar`}
                                        className="profile-image"
                                        loading="lazy"
                                    />
                                </motion.div>
                            </div>
                            <div className="w-full px-4 lg:w-8/12 order-1 lg:order-1">
                                <h2 className="profile-title">
                                    Reach Out to Me!
                                </h2>
                                <p className="profile-subtitle">
                                    Discuss a project or just want to say hi? My inbox is open for all
                                </p>
                                {prof.bio && (
                                    <p className="profile-bio">
                                        {prof.bio}
                                    </p>
                                )}
                                {prof.location && (
                                    <div className="location-badge">
                                        <FaMapMarkerAlt className="location-icon" aria-hidden="true" />
                                        <span className="location-text">{prof.location}</span>
                                    </div>
                                )}
                                <div className="contact-social-links">
                                    <SocialLinks />
                                </div>
                            </div>                    
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
     );
}
 
export default GithubProfileCard;
