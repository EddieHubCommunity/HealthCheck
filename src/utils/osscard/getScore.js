import extractOwnerRepo from "../github/extractOwnerRepo";

export default async function getOSSCardApi(url) {
  // get owner and repo name from url
  const { owner, repo } = extractOwnerRepo(url);

  let response;
  let data;
  try {
    response = await fetch(
      `https://api.scorecard.dev/projects/github.com/${owner}/${repo}`,
    );
    data = await response.json();
  } catch (e) {
    console.error(e);
    data = {};
  }

  return data;
}
