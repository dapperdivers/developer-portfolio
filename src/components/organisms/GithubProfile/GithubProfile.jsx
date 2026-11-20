import React, { useState, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';
import Loading from '@atoms/Loading'
import { openSource } from "@/portfolio";
import axios from 'axios';
import GithubProfileCard from '@molecules/GithubProfileCard';
import { motion } from "framer-motion";
import Section from '../../layout/Section';
import envConfig from '@utils/envConfig';
import { useAnimation } from "@context/AnimationContext";
import './GithubProfile.css';

// Create axios instance with base configuration
export const githubApi = axios.create({
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
 * GitHub profile container. Renders the contact card immediately from site data and
 * fetches the GitHub profile in the background to fill in the avatar.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.id] - Section ID for anchor links
 * @returns {React.ReactElement} GithubProfile component
 */
const GithubProfile = ({ id = 'contact' }) => {
    const [prof, setProf] = useState({});

    // Use animation context for animation values
    const { slideUpVariants, animationEnabled } = useAnimation();

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

    // The card renders immediately from site data. This fetch only supplies the
    // avatar, so a failure is logged and otherwise ignored.
    useEffect(() => {
        const controller = new AbortController();
        let timeoutId;

        const fetchProfileData = async () => {
            try {
                // Validate username
                const username = validateGithubUsername(openSource.githubUserName);

                // Check cache
                const cachedData = localStorage.getItem(`github-profile-${username}`);
                if (cachedData) {
                    const { data, timestamp } = JSON.parse(cachedData);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        setProf(data);
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
                    console.error('GitHub Profile Error:', err);
                    
                    // Use cached data as fallback if available
                    try {
                        const username = validateGithubUsername(openSource.githubUserName);
                        const cachedData = localStorage.getItem(`github-profile-${username}`);
                        if (cachedData) {
                            const { data } = JSON.parse(cachedData);
                            setProf(data);
                        }
                    } catch (cacheErr) {
                        console.error('Cache fallback error:', cacheErr);
                    }
                }
            }
        };

        timeoutId = setTimeout(fetchProfileData, 0);

        return () => {
            controller.abort();
            clearTimeout(timeoutId);
        };
    }, []);

    return ( 
        <Section
            id={id}
            title="Contact Me"
            className="github-profile-section"
            data-testid="github-profile-section"
        >
            <Suspense fallback={<div className="py-20 text-center"><Loading /></div>}>
                <motion.div
                    variants={slideUpVariants}
                    initial={animationEnabled ? "hidden" : "visible"}
                    animate="visible"
                    className="mt-8"
                >
                    <GithubProfileCard prof={prof} />
                </motion.div>
            </Suspense>
        </Section>
     );
};

GithubProfile.propTypes = {
    id: PropTypes.string
};
 
export default GithubProfile;
