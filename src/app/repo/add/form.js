"use client";

import { useFormState } from "react-dom";

import { getRepo } from "./action";
import { SubmitButton } from "@/components/forms/SubmitButton";
import Input from "@/components/forms/Input";
import classNames from "@/utils/classNames";

const initialState = {
  data: undefined,
  success: undefined,
  errors: undefined,
};

export default function Form() {
  const [state, formAction] = useFormState(getRepo, initialState);
  console.log(state);
  return (
    <form action={formAction}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm leading-6 text-gray-300">
            This will load the GitHub repo information from the GitHub API
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Input
              id="url"
              name="url"
              error={state?.errors?.url}
              value={state?.data?.url}
            />
          </div>
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold leading-6">
          Notifications
        </legend>
        <div className="mt-6 space-y-6">
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id="comments"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-600 disabled:bg-gray-400"
                disabled={true}
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="comments" className="font-medium">
                Trending
              </label>
              <p className="text-gray-500">
                Get notified when you are trending on GitHub
              </p>
            </div>
          </div>
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id="candidates"
                name="candidates"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-600 disabled:bg-gray-400"
                disabled={true}
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="candidates" className="font-medium">
                Status change
              </label>
              <p className="text-gray-500">
                Get notified when a status degrades and goes down a level
              </p>
            </div>
          </div>
        </div>
      </fieldset>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SubmitButton text="SAVE" />
      </div>
    </form>
  );
}
