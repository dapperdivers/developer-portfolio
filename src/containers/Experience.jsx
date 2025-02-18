import React from 'react';
import { Icon } from '@iconify/react';
import { experience } from "../portfolio";
import {
    Container,
    Row,
} from "reactstrap";
import { motion } from "framer-motion";

import ExperienceCard from "../components/ExperienceCard";

const Experience = () => {
    return ( 
        <section className="section section-lg">
            <Container>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
              <div className="d-flex align-items-center p-4">
                    <div className="me-4">
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info d-flex align-items-center justify-content-center">
                            <Icon icon="simple-icons:briefcase" className="text-info" style={{ fontSize: '2rem' }} />
                        </div>
                    </div>
                    <div>
                        <h4 className="display-3 text-info mb-0">Experience</h4>
                    </div>
                </div>
                <Row className="row-grid align-items-stretch g-4">
                    {
                        experience.map((data, i) => {
                            return <ExperienceCard key={i} data={data} />
                        })
                    }
                </Row>
              </motion.div>
            </Container>
          </section>
     );
}
 
export default Experience;
