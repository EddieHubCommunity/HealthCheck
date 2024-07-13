"use client";

import { useFlags } from "flagsmith/react";

export default function Tagline() {
  const { tagline } = useFlags(["tagline"]);

  return (
    <div className="border-b border-gray-200 py-5">
      <h2 className="text-base font-semibold leading-6">{tagline.value}</h2>
    </div>
  );
}
