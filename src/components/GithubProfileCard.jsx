import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {
    Card,
    Col,
    Row,
    Container,
    Button
} from "reactstrap";
import { motion } from "framer-motion";
import SocialLinks from "../components/SocialLinks";
import "../assets/css/contact-section.css";

const GithubProfileCard = ({ prof, error, onRetry }) => {
    // Check if profile data exists
    const hasProfile = prof && Object.keys(prof).length > 0;
    
    return (
        <Card className="contact-card bg-gradient-accent shadow-lg border-0">
            <Container>
                {!hasProfile || error ? (
                    // Fallback UI when GitHub API fails
                    <div className="github-fallback">
                        <div className="fallback-image mx-auto d-flex align-items-center justify-content-center">
                            <FaMapMarkerAlt size={40} className="text-accent" />
                        </div>
                        <h3 className="fallback-title">GitHub Profile Unavailable</h3>
                        <p className="fallback-message">
                            {error || "Unable to load GitHub profile data. Please try again later."}
                        </p>
                        {onRetry && (
                            <Button className="refresh-button" onClick={onRetry}>
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
                        <Row className="align-items-center">
                            <Col className="order-lg-2 text-center" lg="4">
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
                            </Col>
                            <Col lg="8" className="order-lg-1">
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
                            </Col>                    
                        </Row>
                    </motion.div>
                )}
            </Container>
        </Card>
     );
}
 
export default GithubProfileCard;
