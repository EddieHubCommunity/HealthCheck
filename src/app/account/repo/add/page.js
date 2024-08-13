import { redirect } from "next/navigation";
import prisma from "@/models/db";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Title from "@/components/Title";
import Form from "./form";
import Alert from "@/components/Alert";
import RepoLimit from "@/components/RepoLimit";

export default async function Page() {
  // check authentication
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
    <div>
      <Title text="Add your GitHub repo" />
      <Alert>
        You have <RepoLimit usage={user.repositories.length} /> repos remaining
      </Alert>
      <Form usage={user.repositories.length} />
    </div>
  );
}
