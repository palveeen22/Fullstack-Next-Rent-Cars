import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "../../../../../prisma/client";

type TProps = {
	params: { id: string };
};

// GET car by id
export async function GET(req: NextRequest, { params }: TProps) {
	const car = await prisma.cars.findUnique({
		where: { id: parseInt(params.id) },
		include: {
			Orders: true,
		},
	});

	if (!car) {
		return NextResponse.json({ error: "Car not found" }, { status: 404 });
	}

	return NextResponse.json(car);
}

// DELETE car by id
export async function DELETE(req: NextRequest, { params }: TProps) {
	const car = await prisma.cars.findUnique({
		where: { id: parseInt(params.id) },
	});

	await prisma.cars.delete({
		where: { id: car?.id },
	});

	return NextResponse.json({ message: "car successfully deleted" });
}

// PUT car by id
export async function PUT(req: NextRequest, { params }: TProps) {
	const body = await req.json();
	const validation = schema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(validation.error.errors, { status: 400 });
	}

	const car = await prisma.cars.findUnique({
		where: { id: parseInt(params.id) },
	});

	console.log("masukk>>");

	const updateCar = await prisma.cars.update({
		where: { id: car?.id },
		data: {
			car_name: body.car_name,
			day_rate: body.day_rate,
			month_rate: body.month_rate,
			image: body.image,
		},
	});

	return NextResponse.json(updateCar);
}
