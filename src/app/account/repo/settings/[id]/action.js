"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import config from "@/config/app.json";
import prisma from "@/models/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function saveSettings(prevState, formData) {
  // check authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }

  const id = formData.get("id");
  const ignoreChecks = config.checks
    .map((option) => (formData.get(option) ? option : null))
    .filter((item) => item);

  // they are owner of the repo
  const repository = await prisma.repository.findUnique({
    where: { id, user: { id: session.user.id } },
    include: {
      user: true,
    },
  });

  if (!repository) {
    throw new Error("Authentication failed");
  }

  // update the repo with ignore checklist
  await prisma.repository.update({
    where: { id },
    data: { ignoreChecks },
  });

  redirect(`/account/repo/checks/${id}`);
}
