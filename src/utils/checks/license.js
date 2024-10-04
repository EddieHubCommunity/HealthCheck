export default function license(communityMetrics) {
  let response = {
    id: "license",
    href: "/repo/license",
    title: "License",
  };

  if (communityMetrics.files?.license) {
    response.status = "success";
    response.description = `You have a license ${communityMetrics.files.license.spdx_id}.`;
    response.extra = "No action required.";
  }

  if (!communityMetrics.files || !communityMetrics.files.license) {
    response.status = "error";
    response.description = "You do not have a license in your repo.";
    response.extra = "This does not make it more Open Source, but less.";
  }

  return response;
}
