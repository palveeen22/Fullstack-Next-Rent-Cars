"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

const data = [
	{ id: 1, name: "Car 1", type: "SUV", price: "$20,000" },
	{ id: 2, name: "Car 2", type: "Sedan", price: "$15,000" },
	{ id: 3, name: "Car 3", type: "Coupe", price: "$25,000" },
];

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
				<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="py-3 px-6">
									Car Name
								</th>
								<th scope="col" className="py-3 px-6">
									Type
								</th>
								<th scope="col" className="py-3 px-6">
									Price
								</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item) => (
								<tr
									key={item.id}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								>
									<td className="py-4 px-6">{item.name}</td>
									<td className="py-4 px-6">{item.type}</td>
									<td className="py-4 px-6">{item.price}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default OrderPage;
