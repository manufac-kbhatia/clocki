import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password must be atleast 8 characters long"),
  companyName: z.string().min(1, "Organisation must be provided"),
  address: z.string().nullable(),
  city: z.string().nullable(),
  vatNumber: z.string().min(1, "VAT number is needed to register the organisation"),
  authorizedRepresentative: z.string().min(1, "Authroized Represntative is needed to register the organisation"),
  firstName: z.string().min(1, "Please provide you first name"),
  lastName: z.string().nullable(),
});

export type RegisterPayload = z.infer<typeof registerSchema>