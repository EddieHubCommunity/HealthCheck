"use client";

import { useFormState } from "react-dom";

import { getRepo } from "./action";
import { SubmitButton } from "@/components/forms/SubmitButton";
import Input from "@/components/forms/Input";

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
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add GitHub Repo
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
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

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SubmitButton text="SAVE" />
      </div>
    </form>
  );
}
