"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import TableComponent from "@/app/components/TableOrder";
import AddOrder from "@/app/components/AddOrder";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";

const DetailsCar = ({ params }: { params: { id: string } }) => {
	const router = useRouter();
	const paramId = params.id;
	const [car, setCar] = useState({} as ListCarsDetails);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
		const response = await fetch(`http://localhost:3000/api/cars/${id}`, {
			method: "DELETE",
		});
		if (response.ok) {
			Swal.fire("successfully delete!");
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
			<div className="flex flex-col gap-4" key={car.id}>
				{/* <Image
					src={car.image}
					className="rounded-t-3xl"
					alt="rental-mobil-picture"
					width={400}
					height={400}
					layout="responsive"
				/> */}

				<img src={car.image} className="rounded-t-3xl h-2/3 object-cover" />

				{/* details card */}
				<div className="w-full bg-[#E5E4E2] flex justify-between gap-2 paddingX py-3 rounded-3xl">
					<div className="w-[50%] flex flex-col gap-4">
						<h3 className="text-2xl font-light font-mono">Details : </h3>
						<p className="font-mono">{car.car_name}</p>
						<div className="flex justify-between gap-2 items-center">
							<p className="font-semibold font-mono">Price : </p>
							<span className="flex justify-start gap-2">
								<p className="font-semibold font-mono">{car.day_rate}</p>
								<p className="text-[#353935] font-mono">/ Days</p>
							</span>
							<span className="flex justify-start gap-2">
								<p className="font-semibold font-mono">{car.month_rate}</p>
								<p className="text-[#353935] font-mono">/ Month</p>
							</span>
						</div>
					</div>
					<div className="w-[50%] flex flex-col justify-center gap-4">
						<AddOrder
							carId={car.id}
							refetch={fetchData}
							open={isModalOpen}
							onOk={closeModal}
							onCancel={closeModal}
						/>
						<button
							className="flex justify-start gap-4 items-center w-[20%] mx-auto bg-red-600 text-white p-2 rounded-xl"
							onClick={() => handleDelete(car.id)}
						>
							<Icon icon="basil:folder-delete-solid" width={25} />
							Delete Car
						</button>
					</div>
				</div>

				<div className="flex justify-between items-center">
					<p>List Order with this Car</p>
				</div>
				{car?.Orders?.map((order) => {
					return <TableComponent order={order} refetch={fetchData} />;
				})}
			</div>
		</section>
	);
};

export default DetailsCar;
