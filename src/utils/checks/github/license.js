export default function license(communityMetrics) {
  let response = {
    id: "license",
    href: "/repo/license",
    title: "License",
  };

  if (communityMetrics.files.license) {
    response.status = "success";
    response.description = `You have a license ${communityMetrics.files.license.spdx_id}.`;
    response.extra = "No action required.";
  }

  if (!communityMetrics.files.license) {
    response.status = "error";
    response.description = "You do not have a license in your repo.";
    response.extra = "This does not mean it is moe Open Source but less.";
  }

  return response;
}
