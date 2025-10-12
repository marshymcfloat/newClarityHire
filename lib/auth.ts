// File: lib/auth.ts

import { prisma } from "@/prisma/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const userExists = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!userExists || !userExists.password) {
          throw new Error("No user found with this email.");
        }

        const isCorrect = await compare(
          credentials.password,
          userExists.password
        );

        if (!isCorrect) {
          throw new Error("Incorrect password. Please try again.");
        }

        // Return the full user object from your database
        return {
          id: userExists.id,
          email: userExists.email,
          name: userExists.name,
          role: userExists.role,
          image: userExists.image,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    // We must use the JWT strategy for the callbacks to be invoked.
    strategy: "jwt",
  },
  callbacks: {
    // This callback handles user creation/linking for Google sign-in
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email) return false;
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
          if (existingUser) {
            const existingAccount = await prisma.account.findUnique({
              where: {
                provider_providerAccountId: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                },
              },
            });
            if (!existingAccount) {
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  session_state: account.session_state,
                },
              });
            }
          } else {
            const newUser = await prisma.user.create({
              data: { email: user.email, name: user.name, image: user.image },
            });
            await prisma.account.create({
              data: {
                userId: newUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            });
          }
          return true;
        } catch (error) {
          console.error("Error during Google signIn callback:", error);
          return false;
        }
      }
      return true; // Allow sign-in for other providers (like credentials)
    },

    // ===== THE CRITICAL FIX IS HERE =====
    // This callback is invoked every time a JWT is created or updated.
    async jwt({ token, user }) {
      // The `user` object is only passed on the initial sign-in.
      if (user) {
        // Find the user in our database to get their true ID and role.
        // This works for both Google and Credentials sign-ins.
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (dbUser) {
          // Persist the database ID and role to the token
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }
      return token;
    },

    // This callback is invoked every time a session is accessed.
    // It receives the token from the `jwt` callback.
    async session({ session, token }) {
      if (token && session.user) {
        // Pass the ID and role from the token to the session object
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
