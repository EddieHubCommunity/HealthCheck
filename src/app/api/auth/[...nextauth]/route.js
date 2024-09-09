import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email public_repo read:project",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = user.id;

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      await prisma.account.update({
        where: {
          provider_providerAccountId: {
            provider: "github",
            providerAccountId: account.providerAccountId,
          },
        },
        data: { access_token: account.access_token },
      });

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
