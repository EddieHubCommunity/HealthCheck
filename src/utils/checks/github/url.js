export default function url(repo) {
  let response = {
    id: "url",
    href: "/repo/status",
    title: "Url",
  };

  if (repo.homepage) {
    response.status = "success";
    response.description = "You have a project url.";
    response.extra = "No action required.";
  }

  if (!repo.homepage) {
    response.status = "error";
    response.description =
      "There is no repo url under the description at the top right.";
    response.extra =
      "If you do not have a project url, you can add the website or docs url.";
  }

  return response;
}
