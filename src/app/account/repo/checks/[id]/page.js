import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { format, formatDistance } from "date-fns";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/models/db";
import List from "@/components/List";
import Title from "@/components/Title";
import Form, { FormBadge } from "./form";
import { worstCheck } from "@/utils/checks";
import ActionPanel from "@/components/ActionPanel";
import Graph from "@/components/Graph";
import { Card } from "flowbite-react";
import Alert from "@/components/Alert";

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
      githubResponses: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
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

      {repository.githubResponses[0].referrers?.length &&
      repository.githubResponses[0].views.views ? (
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Card className="basis-1/2 border rounded-lg shadow-sm border-gray-700 bg-gray-800 text-gray-200">
            <div className="flex justify-between">
              <div>
                <h5 className="leading-none text-3xl font-bold text-gray-200 pb-2">
                  {repository.githubResponses[0].views.count}
                </h5>
                <p className="text-base font-normal text-gray-400">
                  Views this week
                </p>
              </div>
            </div>
            <Graph
              type="line"
              xaxis={{
                categories: repository.githubResponses[0].views.views.map(
                  ({ timestamp }) => format(timestamp, "MM/dd/yyyy"),
                ),
              }}
              series={[
                {
                  name: "Views",
                  data: repository.githubResponses[0].views.views.map(
                    ({ count }) => count,
                  ),
                },
                {
                  name: "Unique",
                  data: repository.githubResponses[0].views.views.map(
                    ({ uniques }) => uniques,
                  ),
                },
              ]}
            />
          </Card>
          <Card className="basis-1/2 border rounded-lg shadow-sm border-gray-700 bg-gray-800 text-gray-200">
            <div className="flex justify-between">
              <div>
                <h5 className="leading-none text-3xl font-bold text-gray-200 pb-2">
                  {repository.githubResponses[0].referrers.reduce(
                    (n, { count }) => n + count,
                    0,
                  )}
                </h5>
                <p className="text-base font-normal text-gray-400">
                  Referred this week
                </p>
              </div>
            </div>
            <Graph
              type="bar"
              xaxis={{
                categories: repository.githubResponses[0].referrers.map(
                  ({ referrer }) => referrer,
                ),
              }}
              series={[
                {
                  name: "Referrers",
                  data: repository.githubResponses[0].referrers.map(
                    ({ count }) => count,
                  ),
                },
                {
                  name: "Unique",
                  data: repository.githubResponses[0].referrers.map(
                    ({ uniques }) => uniques,
                  ),
                },
              ]}
            />
          </Card>
        </div>
      ) : (
        <Alert text="You do not have permission to see the analytics for this repo" />
      )}

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
