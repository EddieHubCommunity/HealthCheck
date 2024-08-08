import activity from "./activity";
import branches from "./branches";
import codeOfConduct from "./codeOfConduct";
import contributing from "./contributing";
import defaultBranch from "./defaultBranch";
import description from "./description";
import goodFirstIssue from "./goodFirstIssue";
import issues from "./issues";
import issueTemplates from "./issueTemplates";
import labels from "./labels";
import license from "./license";
import projects from "./projects";
import pullRequestTemplate from "./pullRequestTemplate";
import readme from "./readme";
import release from "./release";
import topics from "./topics";
import url from "./url";

/*
 * Every check must return the following format
 * {
 *   id: "activity",            // unique id (use "-" if needed)
 *   href: "/repo/status",      // link to more info
 *   title: "Activity",         // display title
 *   status: "warning",         // success/warning/error
 *   description: "...",        // more info about the check
 *   extra: "...",              // suggestion on next steps
 * }
 */

export default function checks(data) {
  const checks = [
    description(data.repo),
    url(data.repo),
    topics(data.repo),
    activity(data.repo),
    issues(data.repo),
    defaultBranch(data.repo),
    goodFirstIssue(data.issues),
    branches(data.branches),
    release(data.release),
    readme(data.communityMetrics),
    license(data.communityMetrics),
    contributing(data.communityMetrics),
    // issueTemplates(data.communityMetrics), // TODO data from github json is always null
    pullRequestTemplate(data.communityMetrics),
    codeOfConduct(data.communityMetrics),
    labels(data.labels),
    projects(data.repo, data.projects),
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
  success = "success",
) {
  return check.red > 0 ? error : check.amber > 0 ? warning : success;
}
