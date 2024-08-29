"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import prisma from "@/models/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Repository from "@/models/Repository";
import getRepoApi from "@/utils/github/getRepoApi";
import getAllRepoData from "@/utils/github";
import checks from "@/utils/checks";

export async function getRepo(prevState, formData) {
  // check authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }

  const url = formData.get("url");

  const validate = Repository({ url });

  if (!validate.success) {
    return validate;
  }

  // get user's account
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      repositories: true,
      accounts: true,
    },
  });

  const response = await getRepoApi(url, user.accounts[0].access_token);

  // if repo not found show error
  if (!response || response.status !== 200) {
    console.log(
      "repo not found ------------>>>>",
      url,
      `...by user ${session.user.name}`,
    );
    return {
      data: { url },
      succcess: false,
      errors: { url: ["GitHub repository not found"] },
    };
  }

  // check if user has repo url already
  let userRepo = await prisma.repository.findFirst({
    where: { url, userId: session.user.id },
  });

  // save repo url to db if doesn't exist for user
  if (!userRepo) {
    userRepo = await prisma.repository.create({
      data: {
        user: {
          connect: {
            id: session.user.id,
          },
        },
        url,
        owner: response.data.owner.login,
        repo: response.data.name,
      },
    });
  }

  const responses = await getAllRepoData(url, user.accounts[0].access_token);

  // save github api data
  const githubResponseRepo = await prisma.githubResponse.create({
    data: {
      repository: {
        connect: {
          id: userRepo.id,
        },
      },
      ...responses,
    },
  });

  // perform check
  const results = checks(githubResponseRepo);

  // save results
  const check = await prisma.check.create({
    data: {
      repository: {
        connect: { id: userRepo.id },
      },
      githubResponse: {
        connect: { id: githubResponseRepo.id },
      },
      red: results.summary.error?.length || 0,
      amber: results.summary.warning?.length || 0,
      green: results.summary.success?.length || 0,
      healthchecks: results.checks.map((check) => check.id),
      data: results.checks,
      allData: results.allChecks,
      ignoreChecks: results.ignoreChecks,
    },
  });

  redirect(`/repo/report/${check.id}`);
}
