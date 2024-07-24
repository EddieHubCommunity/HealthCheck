export default function branches(branches) {
  const min = 5;
  const max = 10;

  let response = {
    id: "branches",
    href: "/repo/status",
    title: "Branches",
  };

  if (branches.length <= min) {
    response.status = "success";
    response.description = "You have a small amount of branches.";
    response.extra = "No action required";
  }

  if (branches.length > min && branches.length <= max) {
    response.status = "warning";
    response.description = `You have ${branches.length} number of branches which is higher than the recommended`;
    response.extra = "Are any of these branhes stale and can be deleted?";
  }

  if (branches.length > max) {
    response.status = "error";
    response.description =
      "You have a high number of branches, which can cause confusion.";
    response.extra = "Can any of these branches be removed?";
  }

  return response;
}
