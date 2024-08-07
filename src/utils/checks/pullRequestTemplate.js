export default function pullRequestTemplate(communityMetrics) {
  let response = {
    id: "pull-request-template",
    href: "/repo/pull-request-template",
    title: "Pull Request template",
  };

  if (communityMetrics.files.pull_request_template) {
    response.status = "success";
    response.description = "You have a Pull Request template.";
    response.extra = "No action required.";
  }

  if (!communityMetrics.files.pull_request_template) {
    response.status = "error";
    response.description =
      "You do not have a pull request template in your repo.";
    response.extra = "This helps people create better pull requests.";
  }

  return response;
}
