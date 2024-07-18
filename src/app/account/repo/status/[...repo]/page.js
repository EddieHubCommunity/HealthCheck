import {
  ClockIcon,
  CodeBracketIcon,
  LanguageIcon,
  StarIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";
import { getServerSession } from "next-auth/next";
import { formatDistance } from "date-fns";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/models/db";
import Heading from "@/components/Heading";
import List from "@/components/List";
import Stats from "@/components/Stats";

export default async function Page({ params }) {
  const repositoryId = params.repo[0];
  const checkId = params.repo[1];
  const session = await getServerSession(authOptions);

  const repository = await prisma.repository.findUnique({
    where: {
      id: repositoryId,
      user: { id: session.user.id },
      checks: { id: checkId },
    },
    include: {
      user: true,
      checks: true,
    },
  });

  const results = repository.checks[0].data;

  console.log("======", repository);

  // 3. if no check id perform check
  // 4. validate if can use existing github api data (5mins?)
  // 5. inform user what was used: new/exiting check/github api

  return (
    <>
      <Heading
        title={`${repository.owner} / ${repository.repo}`}
        actions={[
          { text: "GitHub Repo", url: repo.html_url, icon: CodeBracketIcon },
        ]}
        extras={[
          { icon: StarIcon, text: repo.stargazers_count },
          { icon: LanguageIcon, text: repo.language },
          {
            icon: ClockIcon,
            text: formatDistance(repo.updated_at, new Date(), {
              addSuffix: true,
            }),
          },
          { icon: TicketIcon, text: repo.open_issues },
        ]}
      />
      <Stats
        data={[
          { name: "Success", stat: results.summary.success?.length || 0 },
          { name: "Warning", stat: results.summary.warning?.length || 0 },
          { name: "Error", stat: results.summary.error?.length || 0 },
        ]}
      />
      <List data={results.checks} />
    </>
  );
}
