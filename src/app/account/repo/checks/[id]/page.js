import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { formatDistance } from "date-fns";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/models/db";
import List from "@/components/List";
import Title from "@/components/Title";
import Form, { FormBadge } from "./form";
import { worstCheck } from "@/utils/checks";
import ActionPanel from "@/components/ActionPanel";

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

  const badgeSrc = `${process.env.NEXTAUTH_URL}/api/badges/report/${id}`;

  return (
    <>
      <Title
        text={`Check list for the repo: ${repository.owner} / ${repository.repo}`}
      >
        <Form id={id} />
      </Title>
      <ActionPanel>
        <FormBadge id={id} src={badgeSrc} />
        <img src={badgeSrc} className="mt-2" />
      </ActionPanel>
      <List
        data={repository.checks.map((check) => ({
          id: check.id,
          href: `/repo/report/${check.id}`,
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
