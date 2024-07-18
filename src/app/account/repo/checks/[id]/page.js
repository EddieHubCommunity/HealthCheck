import { getServerSession } from "next-auth/next";
import { formatDistance } from "date-fns";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/models/db";
import List from "@/components/List";
import Title from "@/components/Title";
import Form from "./form";

const repos = [
  {
    id: 1,
    href: "/repo/status",
    title: "10/5/2024",
    status: "success",
    extra: "Initiated 1m 32s ago",
    description: "Deploys from GitHub",
  },
  {
    id: 2,
    href: "/repo/status",
    title: "2/3/2024",
    status: "warning",
    extra: "Initiated 1m 32s ago",
    description: "Deploys from GitHub",
  },
  {
    id: 3,
    href: "/repo/status",
    title: "1/1/2024",
    status: "error",
    extra: "Initiated 1m 32s ago",
    description: "Deploys from GitHub",
  },
];

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
  console.log("======", repository);
  return (
    <>
      <Title text="Check list">
        <Form id={id} />
      </Title>
      <List
        data={repository.checks.map((check) => ({
          id: check.id,
          href: `/account/repo/status/${check.id}`,
          title: "1/1/2024",
          status: "error",
          extra: `Added ${formatDistance(check.createdAt, new Date(), {
            addSuffix: true,
          })}`,
          description: `Checks performed ${check.healthchecks.length}`,
        }))}
      />
    </>
  );
}
