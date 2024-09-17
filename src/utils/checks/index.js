import activity from "./github/activity";
import branches from "./github/branches";
import codeOfConduct from "./github/codeOfConduct";
import contributing from "./github/contributing";
import defaultBranch from "./github/defaultBranch";
import description from "./github/description";
import goodFirstIssue from "./github/goodFirstIssue";
import issues from "./github/issues";
import issueTemplates from "./github/issueTemplates";
import labels from "./github/labels";
import license from "./github/license";
import projects from "./github/projects";
import pullRequestTemplate from "./github/pullRequestTemplate";
import readme from "./github/readme";
import release from "./github/release";
import topics from "./github/topics";
import url from "./github/url";
import overview from "./osscard/overview";

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

export default function checks({ github, osscard, ignoreChecks = [] }) {
  const allChecks = [
    // github checks
    description(github.repo),
    url(github.repo),
    topics(github.repo),
    activity(github.repo),
    issues(github.repo),
    defaultBranch(github.repo),
    goodFirstIssue(github.issues),
    branches(github.branches),
    release(github.release),
    readme(github.communityMetrics),
    license(github.communityMetrics),
    contributing(github.communityMetrics),
    // issueTemplates(github.communityMetrics), // TODO data from github json is always null
    pullRequestTemplate(github.communityMetrics),
    codeOfConduct(github.communityMetrics),
    labels(github.labels),
    // projects(github.repo, github.projects),
  ];

  // osscard checks
  if (osscard) {
    allChecks.push(overview(osscard));
  }

  const userChecks = filterIgnoredChecks(allChecks, ignoreChecks);

  const summary = checkSummary(userChecks);

  return { checks: userChecks, summary, allChecks, ignoreChecks };
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
  return check?.red > 0 ? error : check?.amber > 0 ? warning : success;
}

export function filterIgnoredChecks(checks, ignoredChecks) {
  return checks.filter((check) => !ignoredChecks.includes(check.id));
}
