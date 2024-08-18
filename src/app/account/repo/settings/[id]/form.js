"use client";

import { useFormState } from "react-dom";
import { useFlags } from "flagsmith/react";

import config from "@/config/app.json";
import { saveSettings } from "./action";
import { SubmitButton } from "@/components/forms/SubmitButton";
import Input from "@/components/forms/Input";
import Checkbox from "@/components/forms/Checkbox";

const initialState = {
  data: undefined,
  success: undefined,
  errors: undefined,
};

export default function Form({ id, data, disabled = false }) {
  let { optionalchecks } = useFlags(["optionalchecks"]);
  optionalchecks = JSON.parse(optionalchecks.value);
  const [state, formAction] = useFormState(saveSettings, initialState);

  return (
    <form action={formAction}>
      <Input type="hidden" id="id" name="id" value={id} />
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm leading-6 text-gray-300">
            Hide any checks you wish to ignore.
          </p>
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold leading-6">Checks</legend>
        {optionalchecks.map((option) => (
          <div className="mt-6 space-y-6" key={option.id}>
            <Checkbox
              id={option.id}
              name={option.id}
              text={option.name}
              value={true}
              disabled={disabled}
              defaultChecked={data.includes(option.id)}
            />
          </div>
        ))}
      </fieldset>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SubmitButton text="SAVE" />
      </div>
    </form>
  );
}
