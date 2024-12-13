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
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await validateUser(credentials);
        if (!user) {
          throw new Error("Invalid email or password");
        }

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.image = user.image ?? "";
        token.role = user.role ?? "user";
        token.authProviderId = user.authProviderId ?? "";
      }
      return token;
    },

    async session({ session, token }) {
      // Pass token fields to the session user object
      if (token) {
        session.user._id = token._id as string;
        session.user.image = token.image as string;
        session.user.role = token.role as string;
        session.user.authProviderId = token.authProviderId as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      // google signIn
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await dbConnect();
          const existingUser = await User.findOneAndUpdate(
            { email },
            { name, image, authProviderId: id, authProviderName: "google" },
            { upsert: true, new: true }
          );

          user._id = existingUser?._id;
          user.authProviderId = existingUser?.authProviderId;
          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          throw new Error("Error while processing Google sign-in");
        }
      }
      // github signIn
      if (account?.provider === "github") {
        try {
          const { email, name, image, id } = user;
          await dbConnect();
          const existingUser = await User.findOneAndUpdate(
            { email },
            { name, image, authProviderId: id, authProviderName: "github" },
            { upsert: true, new: true }
          );

          user._id = existingUser?._id;
          user.authProviderId = existingUser?.authProviderId;
          return true;
        } catch (error) {
          console.error("github sign-in error:", error);
          throw new Error("Error while processing github sign-in");
        }
      }
      // provider signIn
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
