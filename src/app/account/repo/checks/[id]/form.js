"use client";

import {
  DocumentDuplicateIcon,
  CheckBadgeIcon,
} from "@heroicons/react/20/solid";

import { performChecks } from "./action";
import Input from "@/components/forms/Input";
import { SubmitButton } from "@/components/forms/SubmitButton";

export default function Form({ id }) {
  return (
    <form action={performChecks}>
      <Input type="hidden" id="id" name="id" value={id} />
      <SubmitButton text="Run Checks" />
    </form>
  );
}

export function FormBadge({ prepend, id }) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-white"
      >
        Add badge to your Repo&lsquo;s README to show the latest check status
      </label>
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <CheckBadgeIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </div>
          <input
            readOnly={true}
            id="badge"
            name="badge"
            type="text"
            value={`![HealthCheck](${prepend}/api/badges/report/${id})`}
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {/* <button
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <DocumentDuplicateIcon
            aria-hidden="true"
            className="-ml-0.5 h-5 w-5 text-gray-400"
          />
          Copy
        </button> */}
      </div>
    </div>
  );
}
