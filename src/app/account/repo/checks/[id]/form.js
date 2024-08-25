"use client";

import {
  DocumentDuplicateIcon,
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";

import { performChecks } from "./action";
import Input from "@/components/forms/Input";
import { SubmitButton } from "@/components/forms/SubmitButton";
import classNames from "@/utils/classNames";

export default function Form({ id }) {
  return (
    <form action={performChecks}>
      <Input type="hidden" id="id" name="id" value={id} />
      <SubmitButton text="Run Checks" />
    </form>
  );
}

export function FormBadge({ src }) {
  const [copy, setCopy] = useState(false);
  const copyHandle = async () => {
    const url = `![HealthCheck](${src})`;
    await navigator.clipboard.writeText(url);
    setCoppy(true);
  };
  return (
    <div>
      <label>
        Add badge to your Repo&lsquo;s README to show the latest check status
      </label>
      <div className="mt-2  rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className=" absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer">
            <ClipboardDocumentCheckIcon
              aria-hidden="true"
              className={classNames("h-5 w-5", copy ? "text-green-400 " : "text-gray-500 ")}
              onClick={copyHandle}
            />
          </div>
          <Input
            readOnly={true}
            id="badge"
            name="badge"
            type="text"
            value={`![HealthCheck](${src})`}
            className="w-full -z-30"
            inputClassName="pl-10 py-1.5"
            labelClassName="hidden"
          />
        </div>
        {copy && <p className="text-green-400 mt-2">Copied!</p>}
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
