import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email is required" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Invalid email format",
    }),
  password: z
    .string({ message: "Password is required" })
    .min(1, { message: "Please input your password!" }),
});

export type TLoginFormData = z.infer<typeof LoginFormSchema>;
