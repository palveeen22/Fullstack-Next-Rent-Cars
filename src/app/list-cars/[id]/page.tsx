"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import TableComponent from "@/app/components/TableOrder";
import AddOrder from "@/app/components/AddOrder";
import { useRouter } from "next/navigation";

const DetailsCar = ({ params }: { params: { id: string } }) => {
	const router = useRouter();
	const paramId = params.id;
	const [car, setCar] = useState({} as ListCarsDetails);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchData = async () => {
		try {
			const response = await fetch(`http://localhost:3000/api/cars/${paramId}`);

			if (!response.ok) {
				throw new Error("Failed fetching data");
			}

			const responseJSON = await response.json();
			setCar(responseJSON);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			} else {
				console.log(error);
			}
		}
	};

	const handleDelete = async (id: number) => {
		console.log(id, "numnum");
		const response = await fetch(`http://localhost:3000/api/cars/${id}`, {
			method: "DELETE",
		});
		if (response.ok) {
			router.refresh();
			router.push("/list-cars");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<section className="paddingX paddingYShorter2">
			<div className="border-b"></div>
			<Link href="/list-cars">
				<div className="m-4 flex justify-end gap-2 items-center cursor-pointer">
					<Icon icon="ep:back" width={30} color="#000" />
					<p className="text-xl font-mono text-[#000] hover:underline">Back</p>
				</div>
			</Link>
			<div className="flex flex-col gap-4">
				<img src={car.image} className="rounded-t-3xl h-2/3 object-cover" />
				<button onClick={() => handleDelete(car.id)}>Delete car</button>
				<div className="flex justify-between items-center">
					<p>List Order with this Car</p>
					<AddOrder
						carId={car.id}
						open={isModalOpen}
						onOk={closeModal}
						onCancel={closeModal}
					/>
				</div>
				{car?.Orders?.map((order) => {
					return <TableComponent order={order} />;
				})}
			</div>
		</section>
	);
};

export default DetailsCar;
