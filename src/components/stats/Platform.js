"use client";

import { format } from "date-fns";
import { Card } from "flowbite-react";
import { useFlags } from "flagsmith/react";

import Graph from "@/components/Graph";

export default function Platform({ repositories }) {
  const { platform_stats } = useFlags(["platform_stats"]);
  if (!platform_stats.enabled) {
    return;
  }

  const repoStats = Object.groupBy(repositories, ({ createdAt }) =>
    format(createdAt, "MM/dd/yyyy"),
  );

  return (
    <>
      {repositories.length && (
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Card className="basis-1/2 border rounded-lg shadow-sm border-gray-700 bg-gray-800 text-gray-200">
            <div className="flex justify-between">
              <div>
                <h5 className="leading-none text-3xl font-bold text-gray-200 pb-2">
                  {Object.keys(repoStats).length} days
                </h5>
                <p className="text-base font-normal text-gray-400">
                  Repos added per day
                </p>
              </div>
            </div>
            <Graph
              type="bar"
              xaxis={{
                categories: Object.keys(repoStats),
              }}
              series={[
                {
                  name: "Views",
                  data: Object.keys(repoStats).map(
                    (key) => repoStats[key].length,
                  ),
                },
              ]}
            />
          </Card>
          <Card className="basis-1/2 border rounded-lg shadow-sm border-gray-700 bg-gray-800 text-gray-200">
            <div className="flex justify-between">
              <div>
                <h5 className="leading-none text-3xl font-bold text-gray-200 pb-2">
                  {repositories.reduce((n, { _count }) => n + _count.checks, 0)}{" "}
                  total checks
                </h5>
                <p className="text-base font-normal text-gray-400">
                  Checks per Repo
                </p>
              </div>
            </div>
            <Graph
              type="bar"
              xaxis={{
                categories: repositories.map(({ repo }) => repo),
              }}
              series={[
                {
                  name: "Checks",
                  data: repositories.map(({ _count }) => _count.checks),
                },
              ]}
            />
          </Card>
        </div>
      )}
    </>
  );
}
