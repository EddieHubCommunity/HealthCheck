export default function description(repo) {
  const min = 10;
  const max = 200;

  let response = {
    id: "description",
    href: "/repo/status",
    title: "Description",
  };

  if (repo.description) {
    response.status = "success";
    response.description = "You have a repo description.";
    response.extra = "No action required.";
  }

  if (!repo.description) {
    response.status = "error";
    response.description = "There is no repo description at the top right.";
    response.extra =
      "It is important to write a concise description about your repo.";
  }

  if (repo.description.length < min) {
    response.status = "warning";
    response.description = "Your description may be too short.";
    response.extra = "Try to include more information.";
  }

  if (repo.description.length > max) {
    response.status = "warning";
    response.description = "Your description may be too long.";
    response.extra = "Try reducing the length of your description.";
  }

  if (repo.homepage?.length > 0 && repo.description.includes(repo.homepage)) {
    response.status = "warning";
    response.description = "Your description contains a duplicate of the url.";
    response.extra = "You can remove the url from the description.";
  }

  return response;
}
