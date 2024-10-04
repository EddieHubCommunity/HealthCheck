import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let githubProvierConfig = {
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  authorization: {
    params: {
      scope: "read:user user:email public_repo read:project",
    },
  },
};

if (process.env.NEXT_RUNTIME === "nodejs" && process.env.APP_ENV === "test") {
  githubProvierConfig.authorization.url =
    "http://localhost:3000/api/auth/callback/github?code=abcd";
}

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [GithubProvider(githubProvierConfig)],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = user.id;

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      const lookup = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: "github",
            providerAccountId: account.providerAccountId,
          },
        },
      });

      if (!lookup) {
        return true;
      }

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
