export default function extractOwnerRepo(url) {
  const urlObject = new URL(url);
  const path = urlObject.pathname.split("/");
  const owner = path[1];
  const repo = path[2];

  return { owner, repo };
}
