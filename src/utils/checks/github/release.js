import { differenceInDays } from "date-fns";

export default function release(release) {
  const min = 30; // days
  const max = 90; // days
  const now = new Date();
  const last = new Date(release.created_at);
  const diff = differenceInDays(now, last);

  let response = {
    id: "release",
    href: "/repo/status",
    title: "Release",
  };

  if (!release.created_at) {
    response.status = "error";
    response.description = "There are no releases.";
    response.extra =
      "If your project is ready for people to use, it is recommended to create a release.";
  }

  if (diff <= min) {
    response.status = "success";
    response.description = "Your project has a recent release.";
    response.extra = "No action required.";
  }

  if (diff > min && diff < max) {
    response.status = "warning";
    response.description = "Your project might need a more recent release.";
    response.extra =
      "Are there any improvments you wish to collect together and release?";
  }

  if (diff >= max) {
    response.status = "error";
    response.description = `There has been no release for ${diff} days.`;
    response.extra = "Are there any features or bugs that can be implemented?";
  }

  return response;
}
