export default function contributing(communityMetrics) {
  let response = {
    id: "contributing",
    href: "/repo/contributing",
    title: "Contributing",
  };

  if (communityMetrics.files?.contributing) {
    response.status = "success";
    response.description = "You have a contributing guide.";
    response.extra = "No action required.";
  }

  if (!communityMetrics.files || !communityMetrics.files.contributing) {
    response.status = "error";
    response.description = "You do not have a contributing guide in your repo.";
    response.extra =
      "This is important, so people know how to get started with your project.";
  }

  return response;
}
