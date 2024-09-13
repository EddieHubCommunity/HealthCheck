import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/models/db";
import Title from "@/components/Title";
import Button from "@/components/Button";
import Form from "./form";

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
    },
  });

  return (
    <>
      <Title
        text={`Check list for the repo: ${repository.owner} / ${repository.repo}`}
      >
        <Button url={`/account/repo/checks/${id}`} type="secondary">
          Repo Check List
        </Button>
      </Title>
      <Form id={id} ignore={repository.ignoreChecks} />
    </>
  );
}
