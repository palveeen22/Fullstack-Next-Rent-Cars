"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

const OrderPage = () => {
	return (
		<section className="paddingX paddingYShorter">
			<div className="flex flex-col text-center gap-8">
				<p className="text-xl text-blue-700">Collection</p>
				<h3 className="text-5xl font-semibold">Explore Our collection Cars</h3>
				<div className="border-b"></div>
				<Link href="/">
					<div className="m-4 flex justify-end gap-2 items-center cursor-pointer">
						<Icon icon="ep:back" width={30} color="#000" />
						<p className="text-xl font-mono text-[#000] hover:underline">
							Back
						</p>
					</div>
				</Link>
			</div>
		</section>
	);
};

export default OrderPage;
