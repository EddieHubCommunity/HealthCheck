import { Octokit } from "@octokit/rest";

export default async function getRepoApi(url, token) {
  // get owner and repo name from url
  const urlObject = new URL(url);
  const path = urlObject.pathname.split("/");
  const owner = path[1];
  const repo = path[2];

  // get data from github api using user's API
  const octokit = new Octokit({
    auth: token,
  });
  let response;
  try {
    response = await octokit.rest.repos.get({
      owner,
      repo,
    });
  } catch (e) {
    console.error(e);
  }

  return response;
}
