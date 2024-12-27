import { z } from "zod";

export const registrationSchema = z.object({
  userName: z.string().min(1, { message: "User name is required." }),
  email: z
    .string()
    .email({ message: "Invalid email format." })
    .min(1, { message: "Email is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .min(1, { message: "Password is required." }),
  // terms: z.boolean().refine((val) => val === true, {
  //   message: "You must accept the terms and conditions.",
  // }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format." })
    .min(1, { message: "Email is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .min(1, { message: "Password is required." }),
});
