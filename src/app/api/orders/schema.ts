import { z } from "zod";

const schema = z.object({
	order_date: z.string(),
	pickup_date: z.string(),
	dropoff_date: z.string(),
	pickup_location: z.string(),
	dropoff_location: z.string(),
});

export default schema;
