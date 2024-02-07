import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Icon } from "@iconify/react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { formatDate } from "@/helpers";

interface orderEdit {
	orderId: number;
	open: boolean;
	onOk: () => void;
	onCancel: () => void;
}

const EditOrder: React.FC<orderEdit> = ({ open, onOk, onCancel, orderId }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [order, setOrder] = useState({} as ListOrders);
	const [input, setInput] = useState({
		pickup_date: "",
		dropoff_date: "",
		pickup_location: "",
		dropoff_location: "",
	});
	const [error, setError] = useState("");

	const fetchData = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/orders/${orderId}`
			);
			if (!response.ok) {
				throw new Error("Failed fetching data");
			}
			const data = await response.json();
			setOrder(data);

			// Convert  to YYYY-MM-DD format
			const formattedPickupDate = data.pickup_date
				? new Date(data.pickup_date).toISOString().split("T")[0]
				: "";
			const formattedDropoffDate = data.dropoff_date
				? new Date(data.dropoff_date).toISOString().split("T")[0]
				: "";
			setInput({
				pickup_date: formattedPickupDate,
				dropoff_date: formattedDropoffDate,
				pickup_location: data.pickup_location || "",
				dropoff_location: data.dropoff_location || "",
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [orderId]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setInput((prevInput) => ({
			...prevInput,
			[name]: value,
		}));
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const OrderInput = z.object({
		pickup_date: z
			.string({
				invalid_type_error: "Pickup Date is Required",
				required_error: "Pickup Date is Required",
			})
			.min(1, { message: "Pickup Date is Required" }),
		dropoff_date: z
			.string({
				invalid_type_error: "Dropoff Date is Required",
				required_error: "Dropoff Date is Required",
			})
			.min(1, { message: "Dropoff Date is Required" }),
		pickup_location: z
			.string({
				invalid_type_error: "Pickup Location is Required",
				required_error: "Pickup Location is Required",
			})
			.min(1, { message: "Pickup Location is Required" }),
		dropoff_location: z
			.string({
				invalid_type_error: "Dropoff Location is Required",
				required_error: "Dropoff Location is Required",
			})
			.min(1, { message: "Dropoff Location is Required" }),
		carsId: z.number(),
	});

	const router = useRouter();

	return (
		<>
			<button
				className="bg-blue-700 text-[#fff] m-2 mx-auto rounded-xl"
				onClick={showModal}
			>
				<Icon icon="mingcute:edit-fill" width={40} />
			</button>
			<Modal
				title="Edit Your Order Here.."
				open={isModalOpen}
				onOk={handleOk}
				footer={null}
				onCancel={handleCancel}
			>
				<form
					className="mx-auto pt-9 pb-9"
					// onSubmit={handleSubmit}
				>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="date"
							name="pickup_date"
							id="pickup_date"
							className="text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							value={input.pickup_date}
							onChange={handleInputChange}
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Pickup Date
						</label>
					</div>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="date"
							name="dropoff_date"
							id="dropoff_date"
							className="text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							value={input.dropoff_date}
							onChange={handleInputChange}
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Dropoff Date
						</label>
					</div>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="text"
							name="pickup_location"
							id="pickup_location"
							className="text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							value={input.pickup_location}
							onChange={handleInputChange}
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Pickup Location
						</label>
					</div>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="text"
							name="dropoff_location"
							id="dropoff_location"
							className="text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							value={input.dropoff_location}
							onChange={handleInputChange}
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Dropoff Location
						</label>
					</div>

					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-[#ffcd3c] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					>
						Edit
					</button>
				</form>
			</Modal>
		</>
	);
};

export default EditOrder;
