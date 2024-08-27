import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: {
      firstName: string;
      lastName: string;
      emailVerified: Date;
      phone: string;
      email: string;
    };
  }
}
declare module "next-auth" {
  interface Session {
    user: {
      firstName: string;
      lastName: string;
      emailVerified: Date;
      phone: string;
      email: string;
    };
  } 
  interface User {
    firstName: string;
    lastName: string;
    emailVerified: Date;
    phone: string;
    email: string;
  }
}
