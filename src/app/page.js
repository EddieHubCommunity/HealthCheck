import Tagline from "@/components/Tagline";
import News from "@/components/News";
import {
  ArrowTrendingUpIcon,
  PencilSquareIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const incentives = [
  {
    name: "Welcoming",
    icon: UserGroupIcon,
    description:
      "Is the Repo setup in a way, which is friendly, inclusive and welcoming to contributors?",
  },
  {
    name: "Recommendations",
    icon: PencilSquareIcon,
    description:
      "Recommendations to achieve or improve the Repo's friendliness.",
  },
  {
    name: "Growth",
    icon: ArrowTrendingUpIcon,
    description:
      "What would promote discoverability (trending on GitHub and Stars).",
  },
];

export default function Page() {
  return (
    <div>
      <News />
      <Tagline />
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight">
                Is your GitHub Repo
                <br />
                <span className="text-red-700">RED</span>,{" "}
                <span className="text-orange-500">AMBER</span> or{" "}
                <span className="text-green-600">GREEN</span>?
              </h2>
              <p className="mt-4 text-gray-300">
                Whether you are looking for funding or running a community
                project, it is important that your GitHub Repo is discoverable
                and set up to attract visitors, stars and contributors.
              </p>
              <p className="mt-4 text-gray-300">
                By using the GitHub API for your Repo, data is analysed to
                produce a RAG report and recommendations.
              </p>
            </div>
            <div className="aspect-h-6 aspect-w-11 overflow-hidden rounded-lg border-slate-400 border">
              <Image
                alt="Screenshot of Open Source HealthCheck repo report"
                width={500}
                height={265}
                src="https://github.com/EddieHubCommunity/HealthCheck/assets/624760/c2fba520-d426-4c90-bce1-17fe9fb00041"
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:flex-shrink-0">
                  <incentive.icon className="h-16 w-16" />
                </div>
                <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-sm font-medium">{incentive.name}</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    {incentive.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
