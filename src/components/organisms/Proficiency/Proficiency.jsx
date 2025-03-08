import React, { useRef } from 'react';
import { SkillBars } from "@/portfolio";
import { motion, useInView } from "framer-motion";

import DisplayLottie from '@molecules/DisplayLottie';
import Progress from '@atoms/Progress';
import Section from '@layout/Section';
import codingAnimation from '@assets/animations/lottie/dev-coding.json';
import './Proficiency.css';

const ProgressBar = ({ skill, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
    
    return (
        <motion.div 
            className="progress-info" 
            key={skill.Stack}
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="progress-label">
                <span className="text-cyan-400 font-semibold">{skill.Stack}</span>
            </div>
            <div className="progress-percentage">
                <span className="text-gray-300">{skill.progressPercentage}%</span>
            </div>
            <Progress 
                max={100} 
                value={isInView ? parseInt(skill.progressPercentage, 10) : 0} 
                color="primary"
                variant="security"
                animated={true}
                aria-valuenow={skill.progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.Stack} proficiency: ${skill.progressPercentage}%`}
            />
        </motion.div>
    );
};

const Proficiency = () => {
    const animation = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    return ( 
        <Section
            id="proficiency"
            title="Proficiency"
            className="proficiency-section"
            animation={animation}
        >
            <div className="flex flex-wrap -mx-4 items-center">
                <div className="w-full px-4 lg:w-6/12">
                    <div className="space-y-4">
                        {SkillBars.map((skill, index) => (
                            <ProgressBar key={skill.Stack} skill={skill} index={index} />
                        ))}
                    </div>
                </div>
                <div className="w-full px-4 lg:w-6/12">
                    <div className="proficiency-animation">
                        <DisplayLottie animationData={codingAnimation} />
                    </div>
                </div>
            </div>
        </Section>
     );
}
 
export default Proficiency;
