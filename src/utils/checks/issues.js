export default function issues(repo) {
  const min = 5;
  const max = 20;

  let response = {
    id: "issues",
    href: "/repo/status",
    title: "Issue",
  };

  if (repo.open_issues > max) {
    response.status = "success";
    response.description = "You have open issues.";
    response.extra = "No action required.";
  }

  if (repo.open_issues >= min && repo.open_issues <= max) {
    response.status = "warning";
    response.description = "You have some open issues.";
    response.extra = "Are there any bugs or features ideas you have?";
  }

  if (repo.open_issues < min) {
    response.status = "error";
    response.description = "There are not enough open issues.";
    response.extra =
      "Try creating some more, or asking the community for ideas.";
  }

  
  return response;
}
