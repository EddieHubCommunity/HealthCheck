import classNames from "@/utils/classNames";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const statuses = {
  success: "text-green-400 bg-green-400/10",
  warning: "text-orange-500 bg-orange-100/10",
  error: "text-rose-500 bg-rose-500/10",
};

const status = {
  success: "text-green-400 bg-green-400/10 ring-green-400/20",
  warning: "text-orange-400 bg-orange-400/10 ring-orange-400/30",
  error: "text-rose-500 bg-rose-500/10 ring-rose-500/30",
};

export default function List({ data }) {
  return (
    <ul role="list" className="divide-y divide-white/5">
      {data.map((item) => (
        <li key={item.id} className="relative flex items-center space-x-4 py-4">
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <div
                className={classNames(
                  statuses[item.status],
                  "flex-none rounded-full p-1",
                )}
              >
                <div className="h-2 w-2 rounded-full bg-current" />
              </div>
              <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                <Link href={item.href} className="flex gap-x-2">
                  <span className="truncate whitespace-nowrap">
                    {item.title}
                  </span>
                  <span className="absolute inset-0" />
                </Link>
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
              <p className="truncate">{item.description}</p>
              <svg
                viewBox="0 0 2 2"
                className="h-0.5 w-0.5 flex-none fill-gray-300"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              <p className="whitespace-nowrap">{item.extra}</p>
            </div>
          </div>
          <div
            className={classNames(
              status[item.status],
              "flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
            )}
          >
            {item.status.toUpperCase()}
          </div>
          <ChevronRightIcon
            aria-hidden="true"
            className="h-5 w-5 flex-none text-gray-400"
          />
        </li>
      ))}
    </ul>
  );
}
