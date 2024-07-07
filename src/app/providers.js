"use client";

import { FlagsmithProvider } from "flagsmith/react";
import { createFlagsmithInstance } from "flagsmith/isomorphic";
import { useRef } from "react";

export default function Providers({ serverState, children }) {
  const flagsmithInstance = useRef(createFlagsmithInstance());
  return (
    <FlagsmithProvider
      flagsmith={flagsmithInstance.current}
      serverState={serverState}
    >
      {children}
    </FlagsmithProvider>
  );
}
