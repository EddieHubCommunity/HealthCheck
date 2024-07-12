"use client";

import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useFlags } from "flagsmith/react";

export default function News() {
  const { news } = useFlags(["news"]);

  if (!news.enabled) {
    return null;
  }

  return (
    <div className="rounded-md bg-blue-50 p-4 my-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            aria-hidden="true"
            className="h-5 w-5 text-blue-400"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700">{news.value}</p>
          <p className="mt-3 text-sm md:ml-6 md:mt-0">
            <a
              href="#"
              className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
            >
              Details
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
