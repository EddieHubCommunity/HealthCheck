"use client";

import { useFormState } from "react-dom";
import { useFlags } from "flagsmith/react";

import { saveSettings } from "./action";
import { SubmitButton } from "@/components/forms/SubmitButton";
import Input from "@/components/forms/Input";
import Checkbox from "@/components/forms/Checkbox";
import Select from "@/components/forms/Select";

const initialState = {
  ignore: undefined,
  success: undefined,
  errors: undefined,
};

export default function Form({ id, ignore, disabled = false }) {
  let { optionalchecks, schedule } = useFlags(["optionalchecks", "schedule"]);
  optionalchecks = JSON.parse(optionalchecks.value);
  schedule = JSON.parse(schedule.value);
  const [state, formAction] = useFormState(saveSettings, initialState);

  return (
    <form action={formAction}>
      <Input type="hidden" id="id" name="id" value={id} />

      <div className="border-b border-gray-700 pb-12 pt-4">
        <div className="border-b border-gray-900/10">
          <p className="mt-1 text-sm leading-6 text-gray-300">
            What checks do you wish to ignore from your report?
          </p>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold leading-6">
            Hide these checks
          </legend>
          {optionalchecks?.map((option) => (
            <div className="mt-2" key={option.id}>
              <Checkbox
                id={option.id}
                name={option.id}
                text={option.name}
                value={true}
                disabled={disabled}
                defaultChecked={ignore.includes(option.id)}
              />
            </div>
          ))}
        </fieldset>
      </div>

      <div className="border-b border-gray-700 pb-12 pt-4">
        <fieldset className="mb-6">
          <legend className="text-sm font-semibold leading-6">Automate</legend>
          <div className="mt-2">
            <Checkbox
              id="automate"
              name="automate"
              text="Automate"
              value={true}
              disabled={true}
              defaultChecked={true}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold leading-6">Frequency</legend>
          <div className="mt-2">
            <Select
              id="schedule"
              name="schedule"
              text="How often to perform these checks? (days)"
              options={schedule}
              value={7}
              // disabled={true}
              // defaultChecked={schedule}
              classNameSelect="max-w-32"
            />
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SubmitButton text="SAVE" />
      </div>
    </form>
  );
}
