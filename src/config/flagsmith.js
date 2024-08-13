import { createFlagsmithInstance } from "flagsmith/isomorphic";

import config from "./flagsmith.json";

export default async function flagsmith(session) {
  const defaults = Object.fromEntries(
    config.map((flag) => [
      flag.name,
      { enabled: flag.default_enabled, value: flag.value },
    ]),
  );

  const flagsmith = createFlagsmithInstance();
  const initialise = {
    environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENVIRONMENT_ID,
  };

  // identity + traits
  // if (session) {
  //   initialise.identity = session.user.id;
  //   initialise.traits = {
  //     email: session.user.email,
  //     username: "eddiejaoude", // identity overrides
  //     isAdmin: false, // traits overrides
  //     isMaintainer: false, // traits overrides
  //   };
  // }

  if (process.env.APP_ENV === "test") {
    initialise.defaultFlags = defaults;
  }

  try {
    await flagsmith.init(initialise);
  } catch (e) {
    if (process.env.APP_ENV !== "test") {
      throw new Error(e);
    }
  }
  const serverState = flagsmith.getState();

  return { flagsmith, serverState };
}
