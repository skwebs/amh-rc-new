import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "password must be atleast of 6 characters",
    }),
});
