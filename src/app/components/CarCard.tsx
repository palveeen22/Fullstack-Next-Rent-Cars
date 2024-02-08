import formatCurrency from "@/helpers";
import React, { useState } from "react";
import EditCar from "./EditCar";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type props = {
	car: ListCars;
	refetch: Function;
};

const CarCard = ({ car, refetch }: props) => {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeModal = () => {
		setIsModalOpen(false);
	};
	return (
		<div key={car.id} className="flex flex-col gap-4 border shadow rounded-3xl">
			<img
				src={car.image}
				alt="Car"
				className="h-48 object-cover rounded-t-3xl"
			/>
			<p className="text-[#252525] font-semibold">{car.car_name}</p>
			{/* <div className="flex justify-around gap-2">
				<div className="flex flex-col gap-2">
					<span className="flex justify-center gap-2">
						<p>{formatCurrency(car.day_rate)}</p>
						<p>/ Day</p>
					</span>
					<span className="flex justify-center gap-2">
						<p>{formatCurrency(car.month_rate)}</p>
						<p>/ Month</p>
					</span>
				</div>
			</div> */}
			<div className="flex justify-center items-center px-4">
				<EditCar
					refetch={refetch}
					carId={car.id}
					open={isModalOpen}
					onOk={closeModal}
					onCancel={closeModal}
				/>
				<button
					className="flex justify-start gap-4 w-[40%] items-center m-4 mx-auto bg-blue-600 text-white p-2 rounded-xl"
					onClick={() => {
						router.push(`/list-cars/${car.id}`);
					}}
				>
					See Details
					<Icon icon="solar:arrow-right-outline" width={25} />
				</button>
			</div>
		</div>
	);
};

export default CarCard;
