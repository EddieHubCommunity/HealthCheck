"use client";

import { useFlags } from "flagsmith/react";

export default function RepoLimit({ usage }) {
  const { repolimit } = useFlags(["repolimit"]);

  return <>{`(${usage}/${repolimit.value})`}</>;
}
