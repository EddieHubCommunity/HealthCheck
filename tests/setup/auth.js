import { encode } from "next-auth/jwt";
import prisma from "@/models/db";

const login = async (
  browser,
  user = {
    name: "Test User Name 6",
    email: "test-standard-user@test.com",
  },
) => {

  const date = new Date();
  let testUser;

  try {
    testUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        image: "https://github.com/eddiejaoude.png",
        emailVerified: null,
      },
      create: {
        email: user.email,
        name: user.name,
        image: "https://github.com/eddiejaoude.png",
        emailVerified: null,
      },
    });

    if (!testUser) {
      throw new Error("Failed to create or retrieve test user");
    }
    console.log("Test user created:", testUser);
  } catch (e) {
    console.error("Test user creation failed", e);
  }

  const sessionToken = await encode({
    token: {
      image: "https://github.com/eddiejaoude.png",
      accessToken: "ggg_zZl1pWIvKkf3UDynZ09zLvuyZsm1yC0YoRPt",
      ...user,
      sub: testUser?.id || user.email,
    },
    secret: process.env.NEXTAUTH_SECRET,
  });

  try {
    await prisma.session.upsert({
      where: {
        sessionToken: sessionToken
      },
      update: {
        expires: new Date(date.getFullYear(), date.getMonth() + 1, 0),
        sessionToken: sessionToken,
      },
      create: {
        userId: testUser.id,
        expires: new Date(date.getFullYear(), date.getMonth() + 1, 0),
        sessionToken: sessionToken,
      },
    });
  } catch (e) {
    console.log("Test session creation failed", e);
  }
  
  try {
    await prisma.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: "github",
          providerAccountId: testUser.id,
        }
      },
      update: {
        type: "oauth",
        provider: "github",
        userId: testUser.id,
        access_token: "ggg_zZl1pWIvKkf3UDynZ09zLvuyZsm1yC0YoRPt",
        token_type: "bearer",
        scope: "read:org,read:user,repo,user:email,test:all",
      },
      create: {
        userId: testUser.id,
        type: "oauth",
        provider: "github",
        providerAccountId: testUser.id,
        access_token: "ggg_zZl1pWIvKkf3UDynZ09zLvuyZsm1yC0YoRPt",
        token_type: "bearer",
        scope: "read:org,read:user,repo,user:email,test:all",
      },
    });
  } catch (e) {
    console.error(e, `Test Account creation failed`);
  }

  const context = await browser.newContext();
  await context.addCookies([
    {
      name: "next-auth.session-token",
      value: sessionToken,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: true,
      expires: -1,
    },
  ]);

  return context;
};
const logout = async (browser) => {
  const context = await browser.newContext();
  await context.clearCookies();
  return context;
};

export { login, logout };