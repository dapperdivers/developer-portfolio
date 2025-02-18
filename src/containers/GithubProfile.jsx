import React, { useState, useEffect, Suspense } from 'react';
import Loading from '../components/Loading'
import { openSource } from "../portfolio";
import axios from 'axios';
import GithubProfileCard from '../components/GithubProfileCard';

// Create axios instance with base configuration
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

const GithubProfile = () => {
    const [prof, setProf] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
    }, []);

    if (error) {
        return <div className="text-center text-danger">Error: {error}</div>;
    }

    if (loading) {
        return <Loading />;
    }
    return ( 
        <Suspense fallback={<Loading />}>
           <GithubProfileCard prof={prof}/>
        </Suspense>
     );
}
 
export default GithubProfile;
