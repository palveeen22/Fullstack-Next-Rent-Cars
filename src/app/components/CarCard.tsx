import formatCurrency from "@/helpers";
import React, { useState } from "react";
import EditCar from "./EditCar";
import { Icon } from "@iconify/react";
import Link from "next/link";

type props = {
	car: ListCars;
	refetch: Function;
};

const CarCard = ({ car, refetch }: props) => {
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
			<div className="flex justify-around gap-2">
				<p>{car.car_name}</p>
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
			</div>
			<div className="flex justify-center gap-2 items-center px-4">
				<EditCar
					refetch={refetch}
					carId={car.id}
					open={isModalOpen}
					onOk={closeModal}
					onCancel={closeModal}
				/>
				<Link href={`/list-cars/${car.id}`}>
					<button
						className="flex justify-start gap-4 items-center m-4 mx-auto bg-blue-600 text-white p-2 rounded-xl"
						// onClick={showModal}
					>
						See Details
						<Icon icon="solar:arrow-right-outline" width={25} />
					</button>
				</Link>
			</div>
		</div>
	);
};

export default CarCard;
