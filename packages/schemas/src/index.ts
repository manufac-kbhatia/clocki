import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password must be atleast 8 characters long"),
  companyName: z.string().min(1, "Organisation must be provided"),
  address: z.string().optional(),
});
