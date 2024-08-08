import { Octokit } from "@octokit/rest";
import extractOwnerRepo from "./extractOwnerRepo";

export default async function getProjectsApi(url, token) {
  // get owner and repo name from url
  const { owner, repo } = extractOwnerRepo(url);

  // get data from github api using user's API
  const octokit = new Octokit({
    auth: token,
  });
  let response;
  try {
    response = await octokit.rest.projects.listForRepo({
      owner,
      repo,
      state: "open",
    });
  } catch (e) {
    console.error(e);
    response = {
      status: 404,
      data: [],
    };
  }

  return response;
}
