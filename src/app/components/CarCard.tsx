import formatCurrency from "@/helpers";
import React from "react";

type props = {
	car: ListCars;
	// refetch: Function;
};

const CarCard = ({ car }: props) => {
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

			{/* <button className="bg-[#ffcd3c] text-[#fff] m-2 w-[40%] mx-auto rounded-xl p-1">
				BOOK NOW
			</button> */}
		</div>
	);
};

export default CarCard;
