"use client";
import React from "react";
import Lottie from "lottie-react";
import loading from "@/app/assets/loading.json";

const Animation = () => {
	return (
		<div className="flex justify-center items-center">
			<Lottie animationData={loading} loop={true} />
		</div>
	);
};

export default Animation;
