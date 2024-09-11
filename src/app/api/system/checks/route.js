import { differenceInHours } from "date-fns";

import prisma from "@/models/db";
import getAllRepoData from "@/utils/github";
import checks from "@/utils/checks";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  // protect for system calls only with valid token
  if (request.nextUrl.searchParams.get("token") !== process.env.API_TOKEN) {
    return Response.json({ error: "permission denied" }, { status: 401 });
  }

  // get all repositories
  const repos = await prisma.repository.findMany({
    include: {
      checks: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      user: {
        include: {
          accounts: true,
        },
      },
    },
  });

  // filter out repositories that had checks in the last X hours
  let repoStatus = { ignore: [], run: [], error: [] };
  repos.forEach((repo) => {
    try {
      if (
        !repo.checks[0] ||
        differenceInHours(new Date(), repo.checks[0].createdAt) >= 24 * 7 // TODO: move to Flagsmith
      ) {
        repoStatus.run.push({
          id: repo.id,
          url: repo.url,
          token: repo.user.accounts[0].access_token,
          lastChecked: repo.checks[0].createdAt,
        });
      } else {
        repoStatus.ignore.push({
          id: repo.id,
          url: repo.url,
          lastChecked: repo.checks[0].createdAt,
        });
      }
    } catch (e) {
      console.error(e);
      repoStatus.error.push({
        id: repo.id,
        url: repo.url,
      });
    }
  });

  console.log("CHECKS IGNORED", repoStatus.ignore);
  console.log("CHECKS ERRORED", repoStatus.error);

  // perform checks on these repositories
  // use the owners github token (repository->user->account.access_token)
  let runs = { attempted: [], sucessful: [] };
  repoStatus.run.map(async (repo) => {
    try {
      const responses = await getAllRepoData(repo.url, repo.token);

      // save github api data
      const githubResponseRepo = await prisma.githubResponse.create({
        data: {
          repository: {
            connect: {
              id: repo.id,
            },
          },
          ...responses,
        },
      });

      // perform check
      const results = checks(githubResponseRepo);

      // save results
      await prisma.check.create({
        data: {
          repository: {
            connect: { id: repo.id },
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

      runs.sucessful.push({ url: repo.url });
    } catch (e) {
      console.error(e);
      runs.attempted.push({ url: repo.url });
    }
  });

  console.log("CHECKS PERFORMED", runs);

  return Response.json({
    runs: runs.length,
    ignores: repoStatus.ignore.length,
    errors: repoStatus.error.length,
  });
}
