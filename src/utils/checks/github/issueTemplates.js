export default function issueTemplates(communityMetrics) {
  let response = {
    id: "issue-templates",
    href: "/repo/issue-templates",
    title: "Issue templates",
  };

  if (communityMetrics.files.issue_template) {
    response.status = "success";
    response.description = "You have issue templates.";
    response.extra = "No action required.";
  }

  if (!communityMetrics.files.issue_template) {
    response.status = "error";
    response.description = "You do not have any issue templates in your repo.";
    response.extra =
      "This helps people create better issues, for example focused on a feature or bug.";
  }

  return response;
}
