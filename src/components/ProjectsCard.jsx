import React from "react";
import { Card, CardBody, Col, Button } from "reactstrap";
import { motion } from "framer-motion";

const ProjectsCard = ({ data }) => {
	return (
		<Col lg="6">
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Card className="shadow-lg--hover shadow mt-4 h-100">
					<CardBody className="d-flex flex-column">
						<div className="px-4">
							<h3 className="mb-3">{data.name}</h3>
							<p className="flex-grow-1 mb-4">{data.desc}</p>
							<div className="d-flex gap-3">
								{data.github && (
									<Button
										className="btn-icon"
										color="github"
										href={data.github}
										target="_blank"
										title="View on GitHub"
									>
										<span className="btn-inner--icon">
											<i className="fa fa-github" />
										</span>
									</Button>
								)}
								{data.link && (
									<Button
										className="btn-icon d-flex align-items-center"
										color="success"
										href={data.link}
										target="_blank"
									>
										<span className="btn-inner--icon">
											<i className="fa fa-arrow-right me-2" />
										</span>
										<span className="nav-link-inner--text">
											Demo
										</span>
									</Button>
								)}
							</div>
						</div>
					</CardBody>
				</Card>
			</motion.div>
		</Col>
	);
};

export default ProjectsCard;
