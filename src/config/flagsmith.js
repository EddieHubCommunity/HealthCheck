import { createFlagsmithInstance } from "flagsmith/isomorphic";

import config from "./flagsmith.json";

export default async function flagsmith() {
  const defaults = Object.fromEntries(
    config.map((flag) => [
      flag.name,
      { enabled: flag.default_enabled, value: flag.value },
    ]),
  );

  const flagsmith = createFlagsmithInstance();
  try {
    await flagsmith.init({
      environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENVIRONMENT_ID,
      defaultFlags: defaults,
    });
  } catch {
    // Handle unable to connect to Flagsmith or not having valid environment
    // Defaults will be used
  }
  const serverState = flagsmith.getState();

  return serverState;
}
