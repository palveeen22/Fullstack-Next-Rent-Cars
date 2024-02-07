import { z } from "zod";

const schema = z.object({
  car_name: z.string().min(1).max(50), 
  day_rate: z.number(), 
  month_rate: z.number(), 
  image: z.string().min(1).max(256), 
});

export default schema;
