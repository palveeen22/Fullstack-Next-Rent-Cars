import { z } from "zod";

const carSchema = z.object({
  car_name: z.string().min(1),
  day_rate: z.number(), 
  month_rate: z.number(), 
  image: z.string().url(), 
});

export default carSchema;
