"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import prisma from "@/models/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Repository from "@/models/Repository";
import getRepoApi from "@/utils/github/getRepoApi";
import getIssuesApi from "@/utils/github/getIssuesApi";

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
      accounts: true,
    },
  });

  const response = await getRepoApi(url, user.accounts[0].access_token);

  // if repo not found show error
  if (!response || response.status !== 200)
    return {
      data: { url },
      succcess: false,
      errors: { url: ["GitHub repository not found"] },
    };

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

  const issuesResponse = await getIssuesApi(url, user.accounts[0].access_token);

  // save github api data
  await prisma.githubResponse.create({
    data: {
      repository: {
        connect: {
          id: userRepo.id,
        },
      },
      repo: response.data,
      issues: issuesResponse.data,
    },
  });

  // redirect to Repo results list page
  redirect("/account/repo/list");
}
