import Link from "next/link";
import classNames from "@/utils/classNames";

export default function Button({ url, type = "primary", children }) {
  return (
    <Link
      href={url}
      className={classNames(
        "inline-flex items-center gap-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        type === "primary" &&
          "text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600",
        type === "secondary" &&
          "text-white bg-violet-600 hover:bg-violet-500 focus-visible:outline-violet-600",
      )}
    >
      {children}
    </Link>
  );
}
