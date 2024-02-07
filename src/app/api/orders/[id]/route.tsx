import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "../../../../../prisma/client";

type TProps = {
	params: { id: string };
};

// ADD ORDER
export async function POST(req: Request, { params }: TProps) {
	console.log(params.id, "MASUK ID");
	try {
		const {
			pickup_date,
			dropoff_date,
			pickup_location,
			dropoff_location,
			carsId,
		} = (await req.json()) as {
			order_date: Date;
			pickup_date: Date;
			dropoff_date: Date;
			pickup_location: string;
			dropoff_location: string;
			carsId: number;
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
				carsId: car?.id,
			},
		});

		return NextResponse.json({
			order: {
				order_date: order.order_date,
				pickup_date: order.pickup_date,
				dropoff_date: order.dropoff_date,
				pickup_location: order.pickup_location,
				dropoff_location: order.dropoff_location,
				carsId: order.carsId,
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

// GET order by id
export async function GET(req: NextRequest, { params }: TProps) {
	const order = await prisma.orders.findUnique({
		where: { id: parseInt(params.id) },
		include: {
			car_id: true,
		},
	});

	if (!order) {
		return NextResponse.json({ error: "Order not found" }, { status: 404 });
	}

	return NextResponse.json(order);
}

// DELETE order by id
export async function DELETE(req: NextRequest, { params }: TProps) {
	const order = await prisma.orders.findUnique({
		where: { id: parseInt(params.id) },
	});

	console.log(params.id);

	await prisma.orders.delete({
		where: { id: order?.id },
	});

	return NextResponse.json({ message: "Order successfully deleted" });
}

// PUT order by id
export async function PUT(req: NextRequest, { params }: TProps) {
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

		const order = await prisma.orders.findUnique({
			where: { id: parseInt(params.id) },
		});

		const newOrder = await prisma.orders.update({
			where: { id: order?.id },
			data: {
				order_date: new Date(),
				pickup_date: new Date(pickup_date),
				dropoff_date: new Date(dropoff_date),
				pickup_location,
				dropoff_location,
			},
		});

		return NextResponse.json({
			order: {
				order_date: newOrder.order_date,
				pickup_date: newOrder.pickup_date,
				dropoff_date: newOrder.dropoff_date,
				pickup_location: newOrder.pickup_location,
				dropoff_location: newOrder.dropoff_location,
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
