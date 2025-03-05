import React, { useRef } from 'react';
import build from "../assets/lottie/build";
import { SkillBars } from "../portfolio";
import { motion, useInView } from "framer-motion";

import GreetingLottie from "../components/DisplayLottie";
import Progress from "../components/ui/Progress";

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
                <span>{skill.Stack}</span>
            </div>
            <div className="progress-percentage">
                <span>{skill.progressPercentage}%</span>
            </div>
            <Progress 
                max={100} 
                value={isInView ? skill.progressPercentage : 0} 
                color="info"
                aria-valuenow={skill.progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.Stack} proficiency: ${skill.progressPercentage}%`}
            />
        </motion.div>
    );
};

const Proficiency = () => {
    return ( 
        <div className="container mx-auto px-4 py-16 section proficiency-section">
           <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
           >
            <div className="flex flex-wrap -mx-4 items-center">
                    <div className="w-full px-4 lg:w-6/12">
                        <h1 className="h1" tabIndex="0">Proficiency</h1>
                        {
                            SkillBars.map((skill, index) => (
                                <ProgressBar key={skill.Stack} skill={skill} index={index} />
                            ))
                        }
                    </div>
                    <div className="w-full px-4 lg:w-6/12">
                        <div className="proficiency-animation">
                            <GreetingLottie animationData={build}/>
                        </div>
                    </div>
                </div>
           </motion.div>
        </div>
     );
}
 
export default Proficiency;
