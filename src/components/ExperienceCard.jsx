import React, {useState, createRef} from 'react';

import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardHeader,
    Col
} from "reactstrap"; 

import ColorThief from "colorthief";
import { motion } from "framer-motion";

const ExperienceCard = ({data}) => {
    const [colorArrays, setColorArrays] = useState([]);
    const imgRef = createRef();

    function getColorArrays() {
        const colorThief = new ColorThief();
        setColorArrays(colorThief.getColor(imgRef.current));
    }

    function rgb(values) {
        return typeof values === "undefined" ? null : "rgb(" + values.join(', ') + ")";
    }

    return ( 
        <Col lg="4">
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="shadow-lg--hover shadow border-0 text-center rounded h-100 transition-hover">
                <CardHeader 
                    style={{background: rgb(colorArrays)}} 
                    className="py-3"
                >
                    <h5 className="text-white mb-0">{data.company}</h5>
                </CardHeader>
                <CardBody className="d-flex flex-column p-4">
                    <img 
                        ref={imgRef} 
                        className="bg-white rounded-circle mb-4 img-center img-fluid shadow-lg" 
                        src={data.companylogo} 
                        style={{ width: "100px", height: "100px", objectFit: "contain" }} 
                        onLoad={() => getColorArrays()} 
                        alt={`${data.company} logo`}
                        loading="lazy"
                    />
                    <CardTitle tag="h5" className="mb-2">{data.role}</CardTitle>
                    <CardSubtitle className="mb-4">{data.date}</CardSubtitle>
                    <CardText className="description text-start flex-grow-1">
                        {data.desc}
                        {data.descBullets && (
                            <ul className="mt-3 mb-0">
                                {data.descBullets.map((desc) => (
                                    <li key={desc}>{desc}</li>
                                ))}
                            </ul>
                        )}
                    </CardText>
                </CardBody>
            </Card>
        </motion.div>
        </Col>
     );
}
 
export default ExperienceCard;
