"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { differenceInHours } from "date-fns";
import Flagsmith from "flagsmith-nodejs";

import prisma from "@/models/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import checks from "@/utils/checks";
import getAllRepoData from "@/utils/github";
import getOSSCardApi from "@/utils/osscard/getScore";

// TODO: move to a reusable location (server-side only)
const flagsmith = new Flagsmith({
  environmentKey: process.env.FLAGSMITH_ENVIRONMENT_API_KEY,
});

export async function performChecks(formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Not authenticated");
  }

  let flags;
  let githbCacheDuration;
  try {
    flags = await flagsmith.getEnvironmentFlags();
    githbCacheDuration = flags.getFeatureValue("github_cache");
  } catch (e) {
    console.log(e);
    githbCacheDuration = process.env.NEXT_PUBLIC_GITHUB_CACHE;
  }

  const id = formData.get("id");

  const repository = await prisma.repository.findUnique({
    where: { id, user: { id: session.user.id } },
    include: {
      user: true,
      githubResponses: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  // if github data is older than 24 hours fetch again
  let githubResponseRepo = repository.githubResponses[0];
  if (
    !githubResponseRepo ||
    differenceInHours(new Date(), githubResponseRepo.createdAt) >=
      githbCacheDuration
  ) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        accounts: true,
      },
    });
    const responses = await getAllRepoData(
      repository.url,
      user.accounts[0].access_token,
    );

    githubResponseRepo = await prisma.githubResponse.create({
      data: {
        repository: {
          connect: {
            id: repository.id,
          },
        },
        ...responses,
      },
    });
  }

  // check for OSSCard
  const osscard = await getOSSCardApi(repository.url);

  // perform check
  const results = checks({
    github: githubResponseRepo,
    osscard,
    ignoreChecks: repository.ignoreChecks,
  });

  // save results
  const check = await prisma.check.create({
    data: {
      repository: {
        connect: { id },
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
      osscard,
    },
  });

  redirect(`/repo/report/${check.id}`);
}
