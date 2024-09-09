import { redirect } from "next/navigation";

import prisma from "@/models/db";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { id } = params;

  const repository = await prisma.repository.findUnique({
    where: { id },
    include: {
      checks: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  if (repository?.checks[0]) {
    const check = repository.checks[0];
    redirect(`/repo/report/${check.id}`);
  } else {
    redirect("/repo/list");
  }
}
