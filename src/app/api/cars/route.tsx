import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "../../../../prisma/client";

// GET ALL CARS
export async function GET(req: NextRequest) {
	const cars = await prisma.cars.findMany();
	return NextResponse.json(cars);
}

// ADD CAR
export async function POST(req: NextRequest) {
	const body = await req.json();
	const validation = schema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(validation.error.errors, { status: 400 });
	}

	const carNew = await prisma.cars.create({
		data: {
			car_name: body.car_name,
			day_rate: body.day_rate,
			month_rate: body.month_rate,
			image: body.image,
		},
	});

	return NextResponse.json(carNew, { status: 201 });
}
