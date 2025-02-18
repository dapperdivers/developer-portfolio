import React from 'react';
import build from "../assets/lottie/build";
import { SkillBars } from "../portfolio";
import {
    Container,
    Row,
    Progress,
    Col
} from "reactstrap";
import { motion } from "framer-motion";

import GreetingLottie from "../components/DisplayLottie";

const Proficiency = () => {
    return ( 
        <Container className="section section-lg">
           <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
           >
            <Row>
                    <Col lg="6">
                        <h1 className="h1">Proficiency</h1>
                        {
                            SkillBars.map(skill => {
                                return <div className="progress-info" key={skill.Stack}>
                                            <div className="progress-label">
                                            <span>{skill.Stack}</span>
                                            </div>
                                            <div className="progress-percentage">
                                            <span>{skill.progressPercentage}%</span>
                                            </div>
                                            <Progress max="100" value={skill.progressPercentage} color="info" />
                                        </div>
                            })
                        }
                    </Col>
                    <Col lg="6">
                        <GreetingLottie animationData={build}/>
                    </Col>
                </Row>
           </motion.div>
        </Container>
     );
}
 
export default Proficiency;
