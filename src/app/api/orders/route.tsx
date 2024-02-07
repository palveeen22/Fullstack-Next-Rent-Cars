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
