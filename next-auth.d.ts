// /types/next-auth.d.ts or /lib/next-auth.d.ts
import "next-auth";

// Augmenting the NextAuth types
declare module "next-auth" {
  interface User {
    _id: string;
    image?: string;
    authProviderId?: string;
    role: string;
  }

  interface Session {
    user: {
      _id: string;
      image?: string;
      authProviderId?: string;
      role: string;
    };
  }

  interface JWT {
    _id?: string;
    image?: string;
    authProviderId?: string;
    role?: string;
  }
}
