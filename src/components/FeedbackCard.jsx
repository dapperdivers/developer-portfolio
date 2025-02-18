import React from "react";
import { Card, CardBody, Badge } from "reactstrap";
import { motion } from "framer-motion";

const FeedbackCard = ({ data }) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: 40 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}
		>
			<Card className="card-lift--hover shadow mt-4">
				<CardBody>
					<div className="d-flex px-3">
						<div className="pl-4">
							<h5 className="text-info">{data.name}</h5>
							<p className="description mt-3">{data.feedback}</p>
						</div>
					</div>
				</CardBody>
			</Card>
		</motion.div>
	);
};

export default FeedbackCard;
