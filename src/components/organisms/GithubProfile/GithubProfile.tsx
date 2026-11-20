import React, { useState, useEffect, Suspense } from 'react';
import Loading from '@atoms/Loading'
import { greetings, securityFacts, openSource, profileLinks } from "@/portfolio";
import axios from 'axios';
import GithubProfileCard from '@molecules/GithubProfileCard';
import { motion } from "framer-motion";
import Section from '../../layout/Section';
import { useAnimation } from "@context/AnimationContext";
import { slideUpVariants } from "@utils/motion";
import './GithubProfile.css';

// Requests are deliberately unauthenticated. Anything in the browser bundle is
// public, so a token here would be handed to every visitor. The public API's
// anonymous rate limit is enough for one cached profile lookup.
export const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

/** The fields of a GitHub user response that are kept and cached */
export interface GithubProfileData {
  login?: string;
  avatar_url?: string;
  html_url?: string;
  name?: string | null;
  bio?: string | null;
  location?: string | null;
  company?: string | null;
}

interface CachedGithubProfile {
  data: GithubProfileData;
  timestamp: number;
}

export interface GithubProfileProps {
  /** Section ID for anchor links */
  id?: string;
}

/**
 * GitHub profile container. Renders the contact card immediately from site data and
 * fetches the GitHub profile in the background to fill in the avatar.
 *
 * @component
 * @returns {React.ReactElement} GithubProfile component
 */
const GithubProfile = ({ id = 'contact' }: GithubProfileProps) => {
    const [prof, setProf] = useState<GithubProfileData>({});

    // Use animation context for animation values
    const { animationEnabled } = useAnimation();

    // Validate GitHub username
    const validateGithubUsername = (username: string) => {
        const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
        if (!username || !githubUsernameRegex.test(username)) {
            throw new Error('Invalid GitHub username');
        }
        return username;
    };

    // Sanitize GitHub profile data
    const sanitizeProfileData = (data: Record<string, unknown>): GithubProfileData => {
        const allowedFields = ['login', 'avatar_url', 'html_url', 'name', 'bio', 'location', 'company'];
        // The values come straight from the API response and are not validated
        // beyond trimming strings, hence the cast.
        return Object.keys(data)
            .filter(key => allowedFields.includes(key))
            .reduce<Record<string, unknown>>((obj, key) => {
                const value = data[key];
                obj[key] = typeof value === 'string' ? value.trim() : value;
                return obj;
            }, {}) as GithubProfileData;
    };

    // The card renders immediately from site data. This fetch only supplies the
    // avatar, so a failure is logged and otherwise ignored.
    useEffect(() => {
        const controller = new AbortController();
        let timeoutId: ReturnType<typeof setTimeout>;

        const fetchProfileData = async () => {
            try {
                // Validate username
                const username = validateGithubUsername(openSource.githubUserName);

                // Check cache
                const cachedData = localStorage.getItem(`github-profile-${username}`);
                if (cachedData) {
                    const { data, timestamp }: CachedGithubProfile = JSON.parse(cachedData);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        setProf(data);
                        return;
                    }
                }

                // Fetch new data
                const response = await githubApi.get<Record<string, unknown>>(`/users/${username}`, {
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
                    // Handled: the card falls back to site data, so this is a
                    // warning rather than an error.
                    console.warn('GitHub profile request failed:', err instanceof Error ? err.message : err);

                    // Use cached data as fallback if available
                    try {
                        const username = validateGithubUsername(openSource.githubUserName);
                        const cachedData = localStorage.getItem(`github-profile-${username}`);
                        if (cachedData) {
                            const { data }: CachedGithubProfile = JSON.parse(cachedData);
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
            <Suspense fallback={<div className="py-20 text-center"><Loading animated={animationEnabled} /></div>}>
                <motion.div
                    variants={slideUpVariants}
                    initial={animationEnabled ? "hidden" : "visible"}
                    animate="visible"
                    className="mt-8"
                >
                    <GithubProfileCard
                        prof={prof}
                        greetings={greetings}
                        securityFacts={securityFacts}
                        githubUserName={openSource.githubUserName}
                        links={profileLinks}
                        animated={animationEnabled}
                    />
                </motion.div>
            </Suspense>
        </Section>
     );
};

export default GithubProfile;
