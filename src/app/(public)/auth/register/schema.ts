import { z } from "zod";

export const RegisterFormSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .min(1, { message: "Please input your username!" })
    .min(3, { message: "Username minimal 3 karakter" }),
  Fullname: z
    .string({ message: "Full name is required" })
    .min(1, { message: "Please input your full name!" }),
  email: z
    .string({ message: "Email is required" })
    .min(1, { message: "Please input your email!" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Invalid email format",
    }),
  password: z
    .string({ message: "Password is required" })
    .min(1, { message: "Please input your password!" })
    .min(8, { message: "Password minimal 8 karakter" }),
});

export type TRegisterFormData = z.infer<typeof RegisterFormSchema>;
