import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "../../../../prisma/client";

// GET ALL Orders
export async function GET(req: NextRequest) {
	const cars = await prisma.orders.findMany({
		include: {
			car_id: true,
		},
		orderBy: {
			id: "asc",
		},
	});
	return NextResponse.json(cars);
}

// ADD ORDER
export async function POST(req: NextRequest) {
	const body = await req.json();
	const validation = schema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(validation.error.errors, { status: 400 });
	}

	const orderNew = await prisma.orders.create({
		data: {
			order_date: body.order_date,
			pickup_date: body.pickup_date,
			dropoff_date: body.dropoff_date,
			pickup_location: body.pickup_location,
			dropoff_location: body.dropoff_location,
			carsId: body.carsId,
		},
	});

	return NextResponse.json(orderNew, { status: 201 });
}
