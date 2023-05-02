import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../prisma/prisma";

/**
 * @type {import("next-auth").NextAuthOptions}
 */
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, newSession }) {
      if (trigger == "update" && newSession) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            name: newSession.name ?? "",
            image: newSession.image ?? "",
            bio: newSession.bio ?? "",
          },
        });
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          bio: user.bio,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/getting-started",
  },
};

export const getServerAuthSession = (req, res) => {
  return getServerSession(req, res, authOptions);
};

export default NextAuth(authOptions);
