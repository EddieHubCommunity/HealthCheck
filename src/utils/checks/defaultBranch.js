export default function defaultBranch(repo) {
  const defaultBranchName = "main";

  let response = {
    id: "defaultBranch",
    href: "/repo/status",
    title: "Default Branch",
  };

  if (repo.default_branch === defaultBranchName) {
    response.status = "success";
    response.description = "You are using the recommend default branch name.";
    response.extra = "No action required.";
  }

  if (!repo.default_branch !== defaultBranchName) {
    response.status = "warning";
    response.description =
      "You are not using the recommended default branch name.";
    response.extra = "This may confuse contributors on your project.";
  }

  return response;
}
