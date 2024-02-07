import React, { useState } from "react";
import { Modal } from "antd";
import { Icon } from "@iconify/react";

interface ModalLoginProps {
	open: boolean;
	onOk: () => void;
	onCancel: () => void;
}

const AddCar: React.FC<ModalLoginProps> = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<button
				className="bg-[#ffcd3c] text-[#fff] m-2  ml-auto p-2 flex items-center gap-2 rounded-xl hover:bg-blue-500"
				onClick={showModal}
			>
				<Icon icon="icon-park-solid:add" width={40} />
				Add Car
			</button>
			<Modal
				title="Input Your Car Here.."
				open={isModalOpen}
				onOk={handleOk}
				footer={null}
				onCancel={handleCancel}
			>
				<form
					className="mx-auto pt-9 pb-9"
					// onSubmit={onSubmit}
				>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="text"
							name="car_name"
							id="car_name"
							className=" text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							// value={form.project_name}
							// onChange={onHandlerForm}
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Car Name
						</label>
					</div>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="number"
							name="day_rate"
							id="day_rate"
							className="text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							// value={form.description_project}
							// onChange={onHandlerForm}
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Day Rate
						</label>
					</div>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="number"
							name="month_rate"
							id="month_rate"
							className="text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							// value={form.description_project}
							// onChange={onHandlerForm}
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Montly Rate
						</label>
					</div>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="text"
							name="image"
							id="image"
							className="text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							// value={form.project_image}
							// onChange={onHandlerForm}
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Image Car
						</label>
					</div>

					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-[#ffcd3c] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					>
						Create
					</button>
					{/* <button
						onClick={() => router.push("/welcome-investor")}
						className="ml-2 text-white bg-red-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					>
						Cancel
					</button> */}
				</form>
			</Modal>
		</>
	);
};

export default AddCar;
