export default function readme(communityMetrics) {
  let response = {
    id: "readme",
    href: "/repo/readme",
    title: "Readme",
  };

  if (communityMetrics.files.readme) {
    response.status = "success";
    response.description = "You have a README file.";
    response.extra = "No action required.";
  }

  if (!communityMetrics.files.readme) {
    response.status = "error";
    response.description = "You do not have a readme.md file in your repo.";
    response.extra = "This is the most important file in your project.";
  }

  return response;
}
