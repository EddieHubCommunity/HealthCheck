import getBranchesApi from "./getBranchesApi";
import getCommunityMetricsApi from "./getCommunityMetrics";
import getIssuesApi from "./getIssuesApi";
import getLabelsApi from "./getLabelsApi";
import getProjectsApi from "./getProjectsApi";
import getReleaseApi from "./getReleaseApi";
import getRepoApi from "./getRepoApi";

export default async function getAllRepoData(url, token) {
  const repo = (await getRepoApi(url, token)).data;

  return {
    repo: repo,
    issues: (await getIssuesApi(url, token)).data,
    branches: (await getBranchesApi(url, token)).data,
    release: (await getReleaseApi(url, token)).data,
    communityMetrics: (await getCommunityMetricsApi(url, token)).data,
    labels: (await getLabelsApi(url, token)).data,
    projects: (await getProjectsApi(url, token)).data,
  };
}
