import { TeamRole } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

/**
 * This module declaration extends the built-in NextAuth types.
 */

declare module "next-auth" {
  /**
   * The Session object returned by `useSession`, `getSession`, `getServerSession`, etc.
   */
  interface Session {
    user: {
      id: string;

      activeCompanyId?: string;
      activeCompanyRole?: TeamRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * The JWT token object that is created in the `jwt` callback.
   */
  interface JWT {
    id: string;
    activeCompanyId?: string;
    activeCompanyRole?: TeamRole;
  }
}
