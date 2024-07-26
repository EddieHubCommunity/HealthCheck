import getBranchesApi from "./getBranchesApi";
import getIssuesApi from "./getIssuesApi";
import getReleaseApi from "./getReleaseApi";
import getRepoApi from "./getRepoApi";

export default async function getAllRepoData(url, token) {
  return {
    repo: (await getRepoApi(url, token)).data,
    issues: (await getIssuesApi(url, token)).data,
    branches: (await getBranchesApi(url, token)).data,
    release: (await getReleaseApi(url, token)).data,
  };
}
