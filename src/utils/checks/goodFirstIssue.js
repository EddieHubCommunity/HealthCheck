export default function goodFirstIssue(issues) {
  const min = 3;

  let response = {
    id: "good-first-issue",
    href: "/repo/status",
    title: "Good First Issue",
  };

  if (issues.length === 0) {
    response.status = "error";
    response.description = "You have no open and unassigned good first issues";
    response.extra =
      "You will not be appearing in the issue and label search on GitHub";
  }

  if (issues.length > 0 && issues.length <= min) {
    response.status = "warning";
    response.description = `You currently only have ${issues.length} issue that has the label good first issue and is not already assigned`;
    response.extra = "These need to be open and not already assigned";
  }

  if (issues.length > min) {
    response.status = "success";
    response.description =
      "Great you have open issues with the label good first issue that are ready to be assigned";
    response.extra = "No action required";
  }

  return response;
}
