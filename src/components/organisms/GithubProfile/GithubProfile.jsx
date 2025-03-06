import React, { useState, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';
import Loading from '@atoms/Loading'
import { openSource } from "@/portfolio";
import axios from 'axios';
import GithubProfileCard from '@molecules/GithubProfileCard';
import { motion } from "framer-motion";
import Section from '@layout/Section';
import envConfig from '@utils/envConfig';

// Create axios instance with base configuration
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    // Add Authorization header if GitHub token is available
    ...(envConfig.githubToken && {
      'Authorization': `token ${envConfig.githubToken}`
    })
  }
});

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * GitHub profile container that fetches and displays user profile data.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.id] - Section ID for anchor links
 * @returns {React.ReactElement} GithubProfile component
 */
const GithubProfile = ({ id = 'contact' }) => {
    const [prof, setProf] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    // Validate GitHub username
    const validateGithubUsername = (username) => {
        const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
        if (!username || !githubUsernameRegex.test(username)) {
            throw new Error('Invalid GitHub username');
        }
        return username;
    };

    // Sanitize GitHub profile data
    const sanitizeProfileData = (data) => {
        const allowedFields = ['login', 'avatar_url', 'html_url', 'name', 'bio', 'location', 'company'];
        return Object.keys(data)
            .filter(key => allowedFields.includes(key))
            .reduce((obj, key) => {
                obj[key] = typeof data[key] === 'string' ? data[key].trim() : data[key];
                return obj;
            }, {});
    };

    // Handle retry action
    const handleRetry = () => {
        setRetryCount(prevCount => prevCount + 1);
    };

    // Animation config for framer-motion
    const animation = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5 }
    };

    useEffect(() => {
        const controller = new AbortController();
        let timeoutId;

        const fetchProfileData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Validate username
                const username = validateGithubUsername(openSource.githubUserName);

                // Check cache
                const cachedData = localStorage.getItem(`github-profile-${username}`);
                if (cachedData) {
                    const { data, timestamp } = JSON.parse(cachedData);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        setProf(data);
                        setLoading(false);
                        return;
                    }
                }

                // Fetch new data
                const response = await githubApi.get(`/users/${username}`, {
                    signal: controller.signal
                });

                // Sanitize and cache data
                const sanitizedData = sanitizeProfileData(response.data);
                localStorage.setItem(`github-profile-${username}`, JSON.stringify({
                    data: sanitizedData,
                    timestamp: Date.now()
                }));

                setProf(sanitizedData);
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setError(err.response?.data?.message || 'Failed to fetch GitHub profile');
                    console.error('GitHub Profile Error:', err);
                    
                    // Use cached data as fallback if available
                    try {
                        const username = validateGithubUsername(openSource.githubUserName);
                        const cachedData = localStorage.getItem(`github-profile-${username}`);
                        if (cachedData) {
                            const { data } = JSON.parse(cachedData);
                            setProf(data);
                            setError('Using cached data. Current GitHub data unavailable.');
                        }
                    } catch (cacheErr) {
                        console.error('Cache fallback error:', cacheErr);
                    }
                }
            } finally {
                setLoading(false);
            }
        };

        timeoutId = setTimeout(fetchProfileData, 0);

        return () => {
            controller.abort();
            clearTimeout(timeoutId);
        };
    }, [retryCount]);

    return ( 
        <Section
            id={id}
            title="Contact Me"
            icon="mdi:contact-mail"
            animation={animation}
            className="py-16"
            data-testid="github-profile-section"
        >
            <Suspense fallback={<div className="py-20 text-center"><Loading /></div>}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8"
                >
                    {loading ? (
                        <div className="min-h-[300px] flex items-center justify-center">
                            <Loading />
                        </div>
                    ) : (
                        <GithubProfileCard 
                            prof={prof} 
                            error={error} 
                            onRetry={handleRetry}
                        />
                    )}
                </motion.div>
            </Suspense>
        </Section>
     );
};

GithubProfile.propTypes = {
    id: PropTypes.string
};

// Note: defaultProps is deprecated, using parameter default value instead (line 36)
 
export default GithubProfile;
