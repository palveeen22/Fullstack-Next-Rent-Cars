"use client";
import { formatDate } from "@/helpers";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import EditOrder from "./EditOrder";

type props = {
	order: ListOrders;
	// refetch: Function;
};

const TableOrder = ({ order }: props) => {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleDelete = async (id: number) => {
		// console.log(id, "numnum");
		const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
			method: "DELETE",
		});
		if (response.ok) {
			// await refetch();
			router.refresh();
			router.push("/list-cars");
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left text-gray-500">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50">
					<tr>
						<th scope="col" className="py-3 px-6">
							Order Date
						</th>
						<th scope="col" className="py-3 px-6">
							Pick Up date
						</th>
						<th scope="col" className="py-3 px-6">
							Drop off Date
						</th>
						<th scope="col" className="py-3 px-6">
							Pick Up location
						</th>
						<th scope="col" className="py-3 px-6">
							Drop off Location
						</th>
						<th scope="col" className="py-3 px-6">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					<tr key={order.id} className="bg-white border-b ">
						<td className="py-4 px-6">{formatDate(order.order_date)}</td>
						<td className="py-4 px-6">{formatDate(order.pickup_date)}</td>
						<td className="py-4 px-6">{formatDate(order.dropoff_date)}</td>
						<td className="py-4 px-6">{order.pickup_location}</td>
						<td className="py-4 px-6">{order.dropoff_location}</td>
						<td className="flex justify-center">
							<button
								className="bg-red-700 text-[#fff] m-2 mx-auto rounded-xl"
								onClick={() => handleDelete(order.id)}
							>
								<Icon icon="openmoji:delete" width={40} />
							</button>
							<EditOrder
								open={isModalOpen}
								onOk={closeModal}
								onCancel={closeModal}
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default TableOrder;
