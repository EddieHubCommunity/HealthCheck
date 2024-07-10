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

  const summary = Object.groupBy(checks, ({ status }) => status);

  return { checks, summary };
}
