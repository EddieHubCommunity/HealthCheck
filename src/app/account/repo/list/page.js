import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { formatDistance } from "date-fns";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/models/db";
import List from "@/components/List";
import Title from "@/components/Title";
import { worstCheck } from "@/utils/checks";
import Stats from "@/components/Stats";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      repositories: {
        include: {
          checks: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const summary = Object.groupBy(user.repositories, (repo) =>
    worstCheck(repo.checks[0]),
  );

  return (
    <>
      <Title
        text={`Repo list (${user.repositories.length}/${process.env.NEXT_PUBLIC_REPO_LIMIT})`}
      />
      <Stats
        data={[
          {
            name: "Success",
            stat: summary.success?.length || 0,
            status: "success",
          },
          {
            name: "Warning",
            stat: summary.warning?.length || 0,
            status: "warning",
          },
          { name: "Error", stat: summary.error?.length || 0, status: "error" },
        ]}
      />
      <List
        data={user.repositories.map((repo) => ({
          id: repo.id,
          href: `/account/repo/checks/${repo.id}`,
          title: `${repo.owner} / ${repo.repo}`,
          status: repo.checks[0] ? worstCheck(repo.checks[0]) : "-",
          description: `Added ${formatDistance(repo.createdAt, new Date(), {
            addSuffix: true,
          })}`,
          extra: repo.checks[0]
            ? `Last check performed ${formatDistance(
                repo.checks[0].createdAt,
                new Date(),
                {
                  addSuffix: true,
                },
              )} with ${repo.checks[0].red} error(s), ${
                repo.checks[0].amber
              } warning(s), ${repo.checks[0].green} success(es)`
            : "No checks performed yet",
        }))}
      />
    </>
  );
}
