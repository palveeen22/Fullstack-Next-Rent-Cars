import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "../../../../../prisma/client";

type TProps = {
	params: { id: string };
};

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

	await prisma.orders.delete({
		where: { id: order?.id },
	});

	return NextResponse.json({ message: "Order successfully deleted" });
}

// PUT order by id
// export async function PUT(req: NextRequest, { params }: TProps) {
// 	const body = await req.json();
// 	const validation = schema.safeParse(body);

// 	if (!validation.success) {
// 		return NextResponse.json(validation.error.errors, { status: 400 });
// 	}

// 	const order = await prisma.order.findUnique({
// 		where: { id: parseInt(params.id) },
// 	});

// 	const updatedOrder = await prisma.order.update({
// 		where: { id: order?.id },
// 		data: {
// 			pickUpLoc: body.pickUpLoc,
// 			dropOffLoc: body.dropOffLoc,
// 			pickUpTime: body.pickUpTime,
// 			pickUpDate: body.pickUpDate,
// 			dropOffDate: body.dropOffDate,
// 		},
// 	});

// 	return NextResponse.json(updatedOrder);
// }
