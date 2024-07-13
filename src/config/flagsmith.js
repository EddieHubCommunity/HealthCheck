import { createFlagsmithInstance } from "flagsmith/isomorphic";

import config from "./flagsmith.json";

export default async function flagsmith() {
  const defaults = Object.fromEntries(
    config.map((flag) => [
      [flag.name],
      { enabled: flag.default_enabled, value: flag.value },
    ])
  );

  const flagsmith = createFlagsmithInstance();
  await flagsmith.init({
    environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENVIRONMENT_ID,
    defaultFlags: defaults,
  });
  const serverState = flagsmith.getState();
  console.log(serverState);

  return serverState;
}
