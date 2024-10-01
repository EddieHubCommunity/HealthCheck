import { graphql } from "@octokit/graphql";
import extractOwnerRepo from "./extractOwnerRepo";

export default async function getProjectsApi(url, token) {
  // get owner and repo name from url
  const { owner, repo } = extractOwnerRepo(url);

  // get data from github api using user's API
  const octokit = graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    },
  });
  let response;
  try {
    response = await octokit(
      `
      query($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          projectsV2(first: 10) {
            nodes {
              id
              title
              closed
            }
          }
        }
      }
      `,
      {
        owner,
        repo,
      },
    );
    console.log(response);
    console.error(response);
    response = {
      status: 200,
      data: response.repository.projectsV2.nodes,
    };
  } catch (e) {
    console.error(e);
    response = {
      status: 404,
      data: [],
    };
  }

  return response;
}
