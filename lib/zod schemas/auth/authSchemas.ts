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

export const companyCreationStageOneSchema = z
  .object({
    fullname: z
      .string()
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name should not exceed 100 characters" }),
    workEmail: z
      .email()
      .min(1, { message: "Email is required" })
      .max(100, { message: "Email should not exceed 100 characters" }),
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 characters long" })
      .max(50, { message: "Password should not exceed 50 characters" })
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
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password dont match",
        path: ["confirmPassword"],
      });
    }
  });

export const companyCreationStageTwoSchema = z.object({
  companyName: z
    .string()
    .min(1, { message: "Company name is required" })
    .max(100, { message: "Company name should not exceed 100 characters" }),
  companySlug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters." })
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with words separated by dashes."
    ),
  companySize: z.string().min(1, { message: "Please select a company size." }),
});

export type AuthLoginValues = z.infer<typeof authLoginSchema>;
export type AuthRegisterValues = z.infer<typeof authRegisterSchema>;
export type CompanyCreationStageOneValues = z.infer<
  typeof companyCreationStageOneSchema
>;
export type CompanyCreationStageTwoValues = z.infer<
  typeof companyCreationStageTwoSchema
>;
