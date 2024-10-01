export default function codeOfConduct(communityMetrics) {
  let response = {
    id: "code-of-conduct",
    href: "/repo/code-of-conduct",
    title: "Code of Conduct",
  };

  if (communityMetrics.files?.code_of_conduct) {
    response.status = "success";
    response.description = `You have a CoC ${communityMetrics.files.code_of_conduct.name}.`;
    response.extra = "No action required.";
  }

  if (!communityMetrics.files || !communityMetrics.files.code_of_conduct) {
    response.status = "error";
    response.description = "You do not have a CoC in your repo.";
    response.extra =
      "This is important for people to know your project and community is safe.";
  }

  return response;
}
