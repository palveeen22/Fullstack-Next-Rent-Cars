import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "../../../../prisma/client";

type TProps = {
	params: { id: string };
};

// GET ALL Orders
export async function GET(req: NextRequest) {
	const cars = await prisma.orders.findMany({
		orderBy: {
			id: "asc",
		},
	});
	return NextResponse.json(cars);
}

// ADD ORDER
export async function POST(req: Request, { params }: TProps) {
	console.log("masuk id", params.id);
	try {
		const { pickup_date, dropoff_date, pickup_location, dropoff_location } =
			(await req.json()) as {
				order_date: Date;
				pickup_date: Date;
				dropoff_date: Date;
				pickup_location: string;
				dropoff_location: string;
				carsId: string;
			};
		console.log("masuk");

		const car = await prisma.cars.findUnique({
			where: { id: parseInt(params.id) },
		});

		const order = await prisma.orders.create({
			data: {
				order_date: new Date(),
				pickup_date: new Date(pickup_date),
				dropoff_date: new Date(dropoff_date),
				pickup_location,
				dropoff_location,
				carsId: Number(car?.id),
			},
		});
		// console.log(project, "<<< project");

		return NextResponse.json({
			order: {
				order_date: order.order_date,
				pickup_date: order.pickup_date,
				dropoff_date: order.dropoff_date,
				pickup_location: order.pickup_location,
				dropoff_location: order.dropoff_location,
			},
		});
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				status: "error",
				message: error.message,
			}),
			{ status: 500 }
		);
	}
}
