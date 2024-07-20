import activity from "./activity";
import defaultBranch from "./defaultBranch";
import description from "./description";
import issues from "./issues";
import topics from "./topics";
import url from "./url";

export default function checks(repo) {
  const checks = [
    description(repo),
    url(repo),
    topics(repo),
    activity(repo),
    issues(repo),
    defaultBranch(repo),
  ];

  const summary = checkSummary(checks);

  return { checks, summary };
}

export function checkSummary(checks) {
  return Object.groupBy(checks, ({ status }) => status);
}

export function worstCheck(
  check,
  error = "error",
  warning = "warning",
  success = "success"
) {
  return check.red > 0 ? error : check.amber > 0 ? warning : success;
}
