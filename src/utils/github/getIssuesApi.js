import { Octokit } from "@octokit/rest";
import extractOwnerRepo from "./extractOwnerRepo";

export default async function getIssuesApi(url, token) {
  // get owner and repo name from url
  const { owner, repo } = extractOwnerRepo(url);

  // get data from github api using user's API
  const octokit = new Octokit({
    auth: token,
  });
  let response;
  try {
    response = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      labels: ["good first issue"],
      assignee: "none",
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
