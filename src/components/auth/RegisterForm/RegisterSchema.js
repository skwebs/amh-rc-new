import * as z from "zod";

export const RegisterFormSchema = z.object({
  name: z
    .string({
      required_error: "Email is required",
    })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(30, { message: "Name must be less than 30 characters" }),

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
  confirm_password: z
    .string({
      required_error: "confirm_password is required",
    })
    .min(6, {
      message: "confirm_password must be atleast of 6 characters",
    }),
});
