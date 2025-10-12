// File: types/next-auth.d.ts

// IMPORTANT: Make sure you import your UserRoleEnum from Prisma
import { UserRoleEnum } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

/**
 * This module declaration extends the built-in NextAuth types.
 * This is crucial for type safety and autocompletion in your project.
 */

declare module "next-auth" {
  /**
   * The Session object returned by `useSession`, `getSession`, `getServerSession`, etc.
   * We are extending the user object to include the properties we added in the `session` callback.
   */
  interface Session {
    user: {
      id: string;
      role: UserRoleEnum[];
    } & DefaultSession["user"]; // This keeps the default properties like name, email, image
  }
}

declare module "next-auth/jwt" {
  /**
   * The JWT token object that is created in the `jwt` callback.
   * We are adding the properties here that we will later pass to the `session` callback.
   */
  interface JWT {
    id: string;
    role: UserRoleEnum[];
  }
}
