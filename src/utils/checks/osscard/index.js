export default function scores(data) {
  const min = 4;
  const max = 7;

  const checks = data.checks.map((check) => {
    if (diff <= min) {
      response.status = "success";
      response.description = "Your project is active.";
      response.extra = "No action required.";
    }

    if (diff > min && diff < max) {
      response.status = "warning";
      response.description = "Your project needs more recent activity.";
      response.extra = "Are there any bugs that can be fixed?";
    }

    if (diff >= max) {
      response.status = "error";
      response.description = `There has been no activity for ${diff} days.`;
      response.extra = "Are there any features that can be implemented?";
    }
  });

  return response;
}
