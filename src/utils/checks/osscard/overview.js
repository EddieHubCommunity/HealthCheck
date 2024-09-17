export default function overview(data) {
  const min = 4;
  const max = 7;

  let response = {
    id: "osscard-overview",
    href: "/osscard/status",
    title: "OSSCard overview",
    status: "incomplete",
    description: "No OSSCard results found",
    extra: "Add OSSCard to your GitHub Actions.",
  };

  if (data.score >= max) {
    response.status = "success";
    response.description = "Your project is secure.";
    response.extra = "No action required.";
  }

  if (data.score > min && data.score < max) {
    response.status = "warning";
    response.description = `Your project needs more security. Your score is ${data.score}`;
    response.extra = "Have a look at your OSSCard for more details";
  }

  if (data.score <= min) {
    response.status = "error";
    response.description = `Your project is at risk with a scre of ${data.score}`;
    response.extra = "Go look at your OSSCard to take action.";
  }

  return response;
}
