import React, { useRef } from 'react';
import { SkillBars } from "@/portfolio";
import { motion, useInView } from "framer-motion";
import { useAnimation } from "@context/AnimationContext";

import DisplayLottie from '@molecules/DisplayLottie';
import Progress from '@atoms/Progress';
import Section from '@layout/Section';
import codingAnimation from '@assets/animations/lottie/dev-coding.json';
import './Proficiency.css';

const ProgressBar = ({ skill, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
    const { slideUpVariants, animationEnabled, animationStaggerDelay } = useAnimation();
    
    // Create a custom variant based on the slideUpVariants but with x axis movement
    const slideInVariant = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.5,
                delay: animationStaggerDelay * index,
                ease: "easeOut"
            }
        }
    };
    
    const shouldAnimate = animationEnabled && isInView;
    
    return (
        <motion.div 
            className="progress-info" 
            key={skill.Stack}
            ref={ref}
            variants={slideInVariant}
            initial={animationEnabled ? "hidden" : "visible"}
            animate={shouldAnimate ? "visible" : "hidden"}
        >
            <div className="progress-label">
                <span className="text-cyan-400 font-semibold">{skill.Stack}</span>
            </div>
            <div className="progress-percentage">
                <span className="text-gray-300">{skill.progressPercentage}%</span>
            </div>
            <Progress 
                max={100} 
                value={shouldAnimate ? parseInt(skill.progressPercentage, 10) : 0} 
                color="primary"
                variant="security"
                animated={animationEnabled}
                aria-valuenow={skill.progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.Stack} proficiency: ${skill.progressPercentage}%`}
            />
        </motion.div>
    );
};

const Proficiency = () => {
    const { animationEnabled, slideUpVariants } = useAnimation();

    return ( 
        <Section
            id="proficiency"
            title="Proficiency"
            className="proficiency-section"
        >
            <div className="flex flex-wrap -mx-4 items-center">
                <div className="w-full px-4 lg:w-6/12">
                    <motion.div 
                        className="space-y-4"
                        initial={animationEnabled ? "hidden" : "visible"}
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { 
                                opacity: 1,
                                transition: { 
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                    >
                        {SkillBars.map((skill, index) => (
                            <ProgressBar key={skill.Stack} skill={skill} index={index} />
                        ))}
                    </motion.div>
                </div>
                <div className="w-full px-4 lg:w-6/12">
                    <motion.div 
                        className="proficiency-animation"
                        variants={slideUpVariants}
                        initial={animationEnabled ? "hidden" : "visible"}
                        animate="visible"
                    >
                        <DisplayLottie animationData={codingAnimation} />
                    </motion.div>
                </div>
            </div>
        </Section>
     );
}
 
export default Proficiency;
