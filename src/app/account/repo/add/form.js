"use client";

import { useFormState } from "react-dom";

import { getRepo } from "./action";
import { SubmitButton } from "@/components/forms/SubmitButton";
import Input from "@/components/forms/Input";
import Checkbox from "@/components/forms/Checkbox";
import Alert from "@/components/Alert";

const initialState = {
  data: undefined,
  success: undefined,
  errors: undefined,
};

export default function Form({ usage }) {
  const [state, formAction] = useFormState(getRepo, initialState);
  const disabled = usage >= process.env.NEXT_PUBLIC_REPO_LIMIT ? true : false;

  return (
    <form action={formAction}>
      <Alert>
        You have ({usage}/{process.env.NEXT_PUBLIC_REPO_LIMIT}) repos remaining
      </Alert>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm leading-6 text-gray-300">
            This will load the GitHub repo information from the GitHub API
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Input
              id="url"
              name="url"
              text="GitHub repo URL"
              error={state?.errors?.url}
              value={state?.data?.url}
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold leading-6">Visibility</legend>
        <div className="mt-6 space-y-6">
          <Checkbox
            id="isPrivate"
            name="isPrivate"
            text="Private"
            value={true}
            description="Do NOT display your GitHub repo on the homepage"
            disabled={true}
          />
        </div>
      </fieldset>

      <fieldset className="mt-12">
        <legend className="text-sm font-semibold leading-6">
          Notifications
        </legend>
        <div className="mt-6 space-y-6">
          <Checkbox
            id="trending"
            name="trending"
            text="Trending"
            description="Get notified when you are trending on GitHub"
            disabled={true}
          />
          <Checkbox
            id="change"
            name="change"
            text="Status change"
            description="Get notified when a status degrades and goes down a level"
            disabled={true}
          />
        </div>
      </fieldset>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SubmitButton text="SAVE" disabled={disabled} />
      </div>
    </form>
  );
}
