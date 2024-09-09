"use client";

import {
  DocumentDuplicateIcon,
  CheckBadgeIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";

import { performChecks } from "./action";
import Input from "@/components/forms/Input";
import { SubmitButton } from "@/components/forms/SubmitButton";
import classNames from "@/utils/classNames";
import Image from "next/image";

export default function Form({ id }) {
  return (
    <form action={performChecks}>
      <Input type="hidden" id="id" name="id" value={id} />
      <SubmitButton text="Run Checks" />
    </form>
  );
}

export function FormBadge({ id, baseUrl }) {
  const src = `${baseUrl}/api/badges/report/${id}`;
  const url = `![HealthCheck](${src})`;
  const clickUrl = `[${url}](${baseUrl}/api/report/latest/${id})`;
  const [copy, setCopy] = useState(false);
  const copyHandle = async () => {
    await navigator.clipboard.writeText(clickUrl);
    setCopy(true);
  };

  return (
    <>
      <div>
        <label
          htmlFor="badge"
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
              value={clickUrl}
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={copyHandle}
          >
            <DocumentDuplicateIcon
              aria-hidden="true"
              className={classNames(
                "-ml-0.5 h-5 w-5 text-gray-400",
                copy && "text-green-400",
              )}
            />
            {copy === true ? (
              <span className="text-green-400">Copied!</span>
            ) : (
              <span className="text-gray-400">Copy</span>
            )}
          </button>
        </div>
      </div>
      <Image
        src={src}
        className="mt-2"
        alt="HealthCheck latest status badge"
        width={200}
        height={40}
      />
    </>
  );
}
