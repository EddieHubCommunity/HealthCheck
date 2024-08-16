import { redirect } from "next/navigation";
import prisma from "@/models/db";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Title from "@/components/Title";
import Form from "./form";

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
      <Form usage={user.repositories.length} />
    </div>
  );
}
