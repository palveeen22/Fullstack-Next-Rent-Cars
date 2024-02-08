"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import AddCar from "../components/AddCar";

const ListCars = () => {
	const [cars, setCars] = useState([] as ListCars[]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const fetchData = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/cars");

			if (!response.ok) {
				throw new Error("Failed fetching data");
			}

			const responseJSON = await response.json();
			setCars(responseJSON);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			} else {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const closeModal = () => {
		setIsModalOpen(false);
	};

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
				<AddCar
					open={isModalOpen}
					onOk={closeModal}
					onCancel={closeModal}
					refetch={fetchData}
				/>
				<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
					{cars.map((car) => (
						<CarCard car={car} refetch={fetchData} />
					))}
				</div>
			</div>
		</section>
	);
};

export default ListCars;
