"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { differenceInHours } from "date-fns";

import prisma from "@/models/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import checks from "@/utils/checks";
import getAllRepoData from "@/utils/github";

export async function performChecks(formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Not authenticated");
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
  if (differenceInHours(new Date(), githubResponseRepo.createdAt) > 24) {
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

  // perform check
  const results = checks(githubResponseRepo);

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
    },
  });

  redirect(`/repo/report/${check.id}`);
}
