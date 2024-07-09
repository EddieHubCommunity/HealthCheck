export default function topics(repo) {
  const min = 6;
  const max = 12;

  let response = {
    id: "topics",
    href: "/repo/status",
    title: "Topic",
  };

  if (repo.topics.length > 0) {
    response.status = "success";
    response.description = "You have a good number o repo topics.";
    response.extra = "No action required.";
  }

  if (repo.topics === 0) {
    response.status = "error";
    response.description = "There are no repo topics at the top right.";
    response.extra = "It is important to be discoverable using topics.";
  }

  if (repo.topics.length < min) {
    response.status = "warning";
    response.description = "You should add some more topics.";
    response.extra = "Try to include more topics.";
  }

  if (repo.topics.length > max) {
    response.status = "warning";
    response.description = "You may have too many topics.";
    response.extra = "Try reducing the amount of your topics.";
  }

  return response;
}
