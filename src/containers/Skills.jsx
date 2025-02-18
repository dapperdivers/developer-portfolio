import React from 'react';
import DisplayLottie from '../components/DisplayLottie'
import { Icon } from '@iconify/react';
import webdev from '../assets/lottie/webdev.json';
import { motion, AnimatePresence } from "framer-motion";
import { Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import { skillsSection } from "../portfolio";
import './Skills.css';

const SkillIcon = ({ skill }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="skill-icon-wrapper"
        >
            <div
                className="icon icon-lg icon-shape shadow rounded-circle mb-5"
                id={skill.skillName}
                role="img"
                aria-label={skill.skillName}
            >
                <Icon 
                    icon={skill.fontAwesomeClassname} 
                    width="32" 
                    height="32"
                    style={{ color: 'currentColor' }}
                />
            </div>
            <UncontrolledTooltip
                delay={0}
                placement="bottom"
                target={skill.skillName}
            >
                {skill.skillName}
            </UncontrolledTooltip>
        </motion.div>
    );
};

const Skills = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
            <Container className="text-center my-5 section section-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="h1" tabIndex="0">{skillsSection.title}</h1>
                    <p className="lead" tabIndex="0">{skillsSection.subTitle}</p>
                </motion.div>
            <Row>
                <Col lg="6">
                    <DisplayLottie animationData={webdev} />
                </Col>
                <Col lg="6">
                    <motion.div 
                        className="skills-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {skillsSection.softwareSkills.map((skill, index) => (
                            <SkillIcon 
                                key={skill.skillName} 
                                skill={skill}
                            />
                        ))}
                    </motion.div>
                    <motion.div 
                        className="skills-description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {skillsSection.skills.map(skill => (
                            <p key={skill} className="skill-text" tabIndex="0">
                                {skill}
                            </p>
                        ))}
                    </motion.div>
                </Col>
            </Row>
            </Container>
            </motion.div>
        </AnimatePresence>
     );
}
 
export default Skills;
