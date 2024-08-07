import { Octokit } from "@octokit/rest";
import extractOwnerRepo from "./extractOwnerRepo";

export default async function getLabelsApi(url, token) {
  // get owner and repo name from url
  const { owner, repo } = extractOwnerRepo(url);

  // get data from github api using user's API
  const octokit = new Octokit({
    auth: token,
  });
  let response;
  try {
    response = await octokit.rest.issues.listLabelsForRepo({
      owner,
      repo,
    });
  } catch (e) {
    console.error(e);
    response = {
      status: 404,
      data: [],
    };
  }

  // filter out defaults
  response.data = response.data.filter((item) => item.default === false);

  return response;
}
