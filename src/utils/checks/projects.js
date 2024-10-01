export default function projects(repo, projectsData) {
  let response = {
    id: "projects",
    href: "/repo/projects",
    title: "Projects",
  };

  if (!repo.has_projects) {
    response.status = "success";
    response.description = "You are not using the project board.";
    response.extra = "No action required.";
  }

  const filteredProjectsData = projectsData.filter(
    (project) => !project.closed,
  ); // filter out closed projects

  if (repo.has_projects && filteredProjectsData.length > 0) {
    response.status = "success";
    response.description =
      "You have project boards enabled and it is being used.";
    response.extra = "No action required.";
  }

  if (repo.has_projects && filteredProjectsData.length === 0) {
    response.status = "error";
    response.description =
      "You have project boards enabled but it is not being used.";
    response.extra = "Hide projects boards in settings.";
  }

  return response;
}
