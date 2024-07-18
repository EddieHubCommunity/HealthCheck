import { getServerSession } from "next-auth/next";
import { formatDistance } from "date-fns";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/models/db";
import List from "@/components/List";
import Title from "@/components/Title";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      repositories: true,
    },
  });

  return (
    <>
      <Title text="Repo list" />
      <List
        data={user.repositories.map((repo) => ({
          id: repo.id,
          href: `/account/repo/checks/${repo.id}`,
          title: `${repo.owner} / ${repo.repo}`,
          status: "-",
          extra: `Added ${formatDistance(repo.createdAt, new Date(), {
            addSuffix: true,
          })}`,
          description: "-",
        }))}
      />
    </>
  );
}
