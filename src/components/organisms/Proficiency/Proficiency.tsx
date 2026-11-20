import React, { useRef } from 'react';
import { SkillBars } from "@/portfolio";
import { motion, useInView, Variants } from "framer-motion";
import { useAnimation } from "@context/AnimationContext";
import { slideUpVariants, STAGGER_DELAY } from "@utils/motion";

import Progress from '@atoms/Progress';
import Section from '../../layout/Section';
import type { SkillBar } from '@/types/portfolio';
import './Proficiency.css';

interface ProgressBarProps {
    /** Skill bar entry to render */
    skill: SkillBar;
    /** Position in the list, used to stagger the entrance */
    index: number;
}

const ProgressBar = ({ skill, index }: ProgressBarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
    const { animationEnabled } = useAnimation();
    
    // Create a custom variant based on the slideUpVariants but with x axis movement
    const slideInVariant: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.5,
                delay: STAGGER_DELAY * index,
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
            animate={!animationEnabled || shouldAnimate ? "visible" : "hidden"}
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
                aria-valuenow={parseInt(skill.progressPercentage, 10)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.Stack} proficiency: ${skill.progressPercentage}%`}
            />
        </motion.div>
    );
};

const Proficiency = () => {
    const { animationEnabled } = useAnimation();

    return ( 
        <Section
            id="proficiency"
            title="Proficiency"
            className="proficiency-section"
        >
            <div className="flex justify-center">
                <div className="w-full px-4 lg:w-8/12">
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
            </div>
        </Section>
     );
}
 
export default Proficiency;
