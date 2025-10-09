import { z } from "zod";

export const authLoginSchema = z.object({
  email: z
    .email({ message: "Please make sure to pass a valid email" })
    .min(1, { message: "Email is required" })
    .max(50, { message: "Email should not exceed of 50 characters" }),
  password: z
    .string({ message: "Please make sure to pass a valid string" })
    .min(1, { message: "Password is required" })
    .max(50, { message: "Password should not exceed 50 characters" }),
});

export const authRegisterSchema = z
  .object({
    email: z
      .email({ message: "Please make sure to pass a valid email" })
      .min(1, { message: "Email is required" })
      .max(50, { message: "Email should not exceed 50 characters" }),
    name: z
      .string({ message: "Please make sure to pass a valid string" })
      .min(1, { message: "Name is  required" })
      .max(100, { message: "Name should not exceed 100 characters" }),
    password: z
      .string({ message: "Please make sure to pass a valid string" })
      .regex(/[a-z]/, {
        message: "Password should have at least one lowercase character",
      })
      .regex(/[A-Z]/, {
        message: "Password should have at least one uppercase character",
      })
      .regex(/[0-9]/, {
        message: "Password should have at least one number character",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password should have at least one special character",
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export type AuthLoginValues = z.infer<typeof authLoginSchema>;
export type AuthRegisterValues = z.infer<typeof authRegisterSchema>;
