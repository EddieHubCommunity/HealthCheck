import { encode } from "next-auth/jwt";
import prisma from "@/models/db";

const login = async (
  browser,
  user = {
    name: "Authenticated User",
    email: "authenticated-user@test.com",
  },
) => {
  const date = new Date();
  let testUser;

  const userData = {
    email: user.email,
    name: user.name,
    image: "https://github.com/mona.png",
    emailVerified: null,
  };

  try {
    testUser = await prisma.user.upsert({
      where: { email: user.email },
      update: userData,
      create: userData,
    });

    if (!testUser) {
      throw new Error("Failed to create or retrieve test authenticated user");
    }
  } catch (e) {
    const error = "Test authenticated user creation failed";
    console.error(error, e);
    throw new Error(error);
  }

  const sessionToken = await encode({
    token: {
      image: "https://github.com/mona.png",
      accessToken: "ggg_zZl1pWIvKkf3UDynZ09zLvuyZsm1yC0YoRPt",
      ...user,
      sub: testUser.id,
    },
    secret: process.env.NEXTAUTH_SECRET,
  });

  const session = {
    sessionToken,
    userId: testUser.id,
    expires: new Date(date.getFullYear(), date.getMonth() + 1, 0),
  };

  try {
    await prisma.session.upsert({
      where: {
        sessionToken: sessionToken,
      },
      update: session,
      create: session,
    });
  } catch (e) {
    const error = "Test authenticated session creation failed";
    console.error(error, e);
    throw new Error(error);
  }

  const account = {
    type: "oauth",
    provider: "github",
    providerAccountId: testUser.id,
    userId: testUser.id,
    access_token: "ggg_zZl1pWIvKkf3UDynZ09zLvuyZsm1yC0YoRPt",
    token_type: "bearer",
    scope: "read:org,read:user,repo,user:email,test:all",
  };

  try {
    await prisma.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: "github",
          providerAccountId: testUser.id,
        },
      },
      update: account,
      create: account,
    });
  } catch (e) {
    const error = "Test account creation failed";
    console.error(error, e);
    throw new Error(error);
  }

  const context = await browser.newContext();
  await context.addCookies([
    {
      name: "next-auth.session-token",
      value: sessionToken,
      domain: "127.0.0.1",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: true,
      expires: -1,
    },
  ]);

  const page = await context.newPage();

  return page;
};

const logout = async (browser) => {
  const context = await browser.newContext();
  await context.clearCookies();

  const page = await context.newPage();

  return page;
};

export { login, logout };
