import { getServerSession } from "next-auth/next";
import { formatDistance } from "date-fns";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/models/db";
import List from "@/components/List";
import Title from "@/components/Title";
import Form from "./form";
import { worstCheck } from "@/utils/checks";

export default async function Page({ params }) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const repository = await prisma.repository.findUnique({
    where: { id, user: { id: session.user.id } },
    include: {
      user: true,
      checks: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <>
      <Title
        text={`Check list for the repo: ${repository.owner} / ${repository.repo}`}
      >
        <Form id={id} />
      </Title>
      <List
        data={repository.checks.map((check) => ({
          id: check.id,
          href: `/account/repo/report/${check.id}`,
          title: `Error: ${check.red}, Warning: ${check.amber}, Successful: ${check.green}`,
          status: worstCheck(check),
          extra: `Added ${formatDistance(check.createdAt, new Date(), {
            addSuffix: true,
          })}`,
          description: `Checks performed ${check.healthchecks.length}`,
        }))}
      />
    </>
  );
}
