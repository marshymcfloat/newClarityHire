// /lib/actions/authActions.ts

"use server";

import { prisma } from "@/prisma/prisma";
import {
  authRegisterSchema,
  AuthRegisterValues,
} from "../zod schemas/auth/authSchemas";
import { hash } from "bcryptjs";
import { UserRoleEnum } from "@prisma/client";

export async function authRegisterAction(values: AuthRegisterValues) {
  try {
    const validationResult = authRegisterSchema.safeParse(values);

    if (!validationResult.success) {
      return {
        success: false,
        error: "Validation Error",
      };
    }

    const { email, name, password } = validationResult.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, error: "User with this email already exists." };
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: [UserRoleEnum.APPLICANT],
      },
    });

    const { password: _, ...user } = newUser;

    return {
      success: true,
      message: "User Created Successfully!",
      data: user,
    };
  } catch (err) {
    console.error("An unexpected error occured in authRegisterAction:", err);
    return { success: false, error: "An unexpected error occured" };
  }
}
