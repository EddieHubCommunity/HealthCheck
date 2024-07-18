"use client";

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
