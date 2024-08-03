import { formatDistance } from "date-fns";

import prisma from "@/models/db";
import List from "@/components/List";
import Title from "@/components/Title";
import { worstCheck } from "@/utils/checks";

export default async function Page() {
  const repositories = await prisma.repository.findMany({
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
  });

  return (
    <>
      <Title text="Repo list" />
      <List
        data={repositories
          .filter((repo) => repo.checks.length > 0)
          .map((repo) => ({
            id: repo.id,
            href: `/repo/report/${repo.checks[0].id}`,
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
