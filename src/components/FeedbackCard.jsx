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
			<Card className="shadow mt-4 transition-hover">
				<CardBody className="p-4">
					<h5 className="text-info mb-3">{data.name}</h5>
					<p className="mb-0">{data.feedback}</p>
				</CardBody>
			</Card>
		</motion.div>
	);
};

export default FeedbackCard;
