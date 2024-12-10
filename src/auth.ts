/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "./lib/db";
import { User } from "./models/user.model";
import { validateUser } from "./lib/validateUser";

export interface userType {
  name?: string | null;
  image?: string | null;
  email?: string | null;
  id?: string | null;
  role?: string | null;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  providers: [
    // Google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Github provider
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),

    // Credential provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const user = await validateUser(credentials);
          if (user) return user;
          throw new Error("Invalid email or password");
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.role = token.role || "user";
      }
      return session;
    },

    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        token.id = profile.id || user?.id;
        token.role = token.role || "user";
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await dbConnect();
          const existingUser = await User.findOneAndUpdate(
            { email },
            { name, image, authProviderId: id },
            { upsert: true, new: true }
          );
          return !!existingUser;
        } catch (error) {
          console.error("Google sign-in error:", error);
          throw new Error("Error while processing Google sign-in");
        }
      }
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  theme: {
    colorScheme: "auto",
  },
});
