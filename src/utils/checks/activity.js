import { differenceInDays } from "date-fns";

export default function activity(repo) {
  const min = 7; // days
  const max = 30; // days
  const now = new Date();
  const last = new Date(repo.pushed_at);
  const diff = differenceInDays(now, last);

  let response = {
    id: "activity",
    href: "/repo/status",
    title: "Activity",
  };

  if (diff <= min) {
    response.status = "success";
    response.description = "Your project is active.";
    response.extra = "No action required.";
  }

  if (diff > min && diff < max) {
    response.status = "warning";
    response.description = "Your project needs more recent activity.";
    response.extra = "Are there any bugs that can be fixed.";
  }

  if (diff >= max) {
    response.status = "error";
    response.description = "There has been no recent activity.";
    response.extra = "Are there any features that can be implemented.";
  }

  return response;
}
