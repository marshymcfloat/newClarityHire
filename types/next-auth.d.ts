// /types/next-auth.d.ts

// IMPORTANT: Import your Prisma-generated types
import { UserRoleEnum } from "@prisma/client";
import { DefaultSession, User as DefaultUser } from "next-auth";
import { AdapterUser as DefaultAdapterUser } from "next-auth/adapters";
import { DefaultJWT, JWT } from "next-auth/jwt";

// Make sure to use your actual enum name if it's different from UserRoleEnum

declare module "next-auth" {
  /**
   * The User object returned by the `authorize` callback.
   */
  interface User extends DefaultUser {
    // Update 'role' to be an array of your enum
    role: UserRoleEnum[];
  }

  /**
   * The Session object returned by `useSession`, `getSession`, etc.
   */
  interface Session {
    user: {
      id: string;
      // Also update 'role' here
      role: UserRoleEnum[];
    } & DefaultSession["user"]; // Keep default properties
  }
}

declare module "next-auth/adapters" {
  /**
   * The AdapterUser object received by the `jwt` callback.
   */
  interface AdapterUser extends DefaultAdapterUser {
    // And here
    role: UserRoleEnum[];
  }
}

declare module "next-auth/jwt" {
  /**
   * The JWT token object.
   */
  interface JWT extends DefaultJWT {
    id: string;
    // And finally, here
    role: UserRoleEnum[];
  }
}
