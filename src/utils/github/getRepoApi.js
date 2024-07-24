import { Octokit } from "@octokit/rest";
import extractOwnerRepo from "./extractOwnerRepo";

export default async function getRepoApi(url, token) {
  // get owner and repo name from url
  const { owner, repo } = extractOwnerRepo(url);

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
