"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Icon } from "@iconify/react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface AddOrder {
	open: boolean;
	onOk: () => void;
	onCancel: () => void;
	carId: number;
	refetch: Function;
}

const AddOrder: React.FC<AddOrder> = ({
	open,
	onOk,
	onCancel,
	carId,
	refetch,
}) => {
	const [input, setInput] = useState({
		pickup_date: "",
		dropoff_date: "",
		pickup_location: "",
		dropoff_location: "",
		carsId: carId,
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [error, setError] = useState("");

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
	const handleSubmit = async (e: React.SyntheticEvent) => {
		try {
			e.preventDefault();
			const formData = { ...input, carsId: carId };
			// console.log(formData, "FORM");

			const parsed = OrderInput.safeParse(formData);
			// console.log(parsed, "<<<");

			if (parsed.success == false) {
				setError(parsed.error.issues[0].message);
			} else {
				const finalInput = JSON.stringify(formData);
				console.log(finalInput);
				const response = await fetch(
					`http://localhost:3000/api/orders/${carId}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: finalInput,
					}
				);
				// console.log(response);

				if (!response.ok) {
					throw new Error("Add order Failed");
				}
				Swal.fire("successfully booked!");
				onOk();
				await refetch();
				router.refresh();
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.log(error.issues);
			} else {
				console.log(error);
			}
		}
	};

	return (
		<>
			<button
				onClick={showModal}
				className="flex justify-start gap-4 items-center w-[20%] mx-auto bg-blue-600 text-white p-2 rounded-xl"
			>
				<Icon icon="game-icons:car-key" width={25} />
				Book Now!
			</button>
			<Modal
				title="Input Your Order Here.."
				open={isModalOpen}
				onOk={handleOk}
				footer={null}
				onCancel={handleCancel}
			>
				<form className="mx-auto pt-9 pb-9" onSubmit={handleSubmit}>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="date"
							name="pickup_date"
							id="pickup_date"
							className="text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							onChange={(e) =>
								setInput({ ...input, pickup_date: e.target.value })
							}
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
							placeholder=" "
							onChange={(e) =>
								setInput({ ...input, dropoff_date: e.target.value })
							}
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
							placeholder=" "
							onChange={(e) =>
								setInput({ ...input, pickup_location: e.target.value })
							}
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
							placeholder=" "
							onChange={(e) =>
								setInput({ ...input, dropoff_location: e.target.value })
							}
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Dropoff Location
						</label>
					</div>

					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-[#ffcd3c] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					>
						Create
					</button>
				</form>
			</Modal>
		</>
	);
};

export default AddOrder;
