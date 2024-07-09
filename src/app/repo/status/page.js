import {
  ClockIcon,
  CodeBracketIcon,
  LanguageIcon,
  StarIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";

import Heading from "@/components/Heading";
import List from "@/components/List";
import checks from "@/utils/checks/index";

const repo = {
  id: 405139301,
  node_id: "MDEwOlJlcG9zaXRvcnk0MDUxMzkzMDE=",
  name: "BioDrop",
  full_name: "EddieHubCommunity/BioDrop",
  private: false,
  owner: {
    login: "EddieHubCommunity",
    id: 66388388,
    node_id: "MDEyOk9yZ2FuaXphdGlvbjY2Mzg4Mzg4",
    avatar_url: "https://avatars.githubusercontent.com/u/66388388?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/EddieHubCommunity",
    html_url: "https://github.com/EddieHubCommunity",
    followers_url: "https://api.github.com/users/EddieHubCommunity/followers",
    following_url:
      "https://api.github.com/users/EddieHubCommunity/following{/other_user}",
    gists_url: "https://api.github.com/users/EddieHubCommunity/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/EddieHubCommunity/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/EddieHubCommunity/subscriptions",
    organizations_url: "https://api.github.com/users/EddieHubCommunity/orgs",
    repos_url: "https://api.github.com/users/EddieHubCommunity/repos",
    events_url:
      "https://api.github.com/users/EddieHubCommunity/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/EddieHubCommunity/received_events",
    type: "Organization",
    site_admin: false,
  },
  html_url: "https://github.com/EddieHubCommunity/BioDrop",
  description:
    "Connect to your audience with a single link. Showcase the content you create and your projects in one place. Make it easier for people to find, follow and subscribe.",
  fork: false,
  url: "https://api.github.com/repos/EddieHubCommunity/BioDrop",
  forks_url: "https://api.github.com/repos/EddieHubCommunity/BioDrop/forks",
  keys_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/keys{/key_id}",
  collaborators_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/collaborators{/collaborator}",
  teams_url: "https://api.github.com/repos/EddieHubCommunity/BioDrop/teams",
  hooks_url: "https://api.github.com/repos/EddieHubCommunity/BioDrop/hooks",
  issue_events_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/issues/events{/number}",
  events_url: "https://api.github.com/repos/EddieHubCommunity/BioDrop/events",
  assignees_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/assignees{/user}",
  branches_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/branches{/branch}",
  tags_url: "https://api.github.com/repos/EddieHubCommunity/BioDrop/tags",
  blobs_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/git/blobs{/sha}",
  git_tags_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/git/tags{/sha}",
  git_refs_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/git/refs{/sha}",
  trees_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/git/trees{/sha}",
  statuses_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/statuses/{sha}",
  languages_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/languages",
  stargazers_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/stargazers",
  contributors_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/contributors",
  subscribers_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/subscribers",
  subscription_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/subscription",
  commits_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/commits{/sha}",
  git_commits_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/git/commits{/sha}",
  comments_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/comments{/number}",
  issue_comment_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/issues/comments{/number}",
  contents_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/contents/{+path}",
  compare_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/compare/{base}...{head}",
  merges_url: "https://api.github.com/repos/EddieHubCommunity/BioDrop/merges",
  archive_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/{archive_format}{/ref}",
  downloads_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/downloads",
  issues_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/issues{/number}",
  pulls_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/pulls{/number}",
  milestones_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/milestones{/number}",
  notifications_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/notifications{?since,all,participating}",
  labels_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/labels{/name}",
  releases_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/releases{/id}",
  deployments_url:
    "https://api.github.com/repos/EddieHubCommunity/BioDrop/deployments",
  created_at: "2021-09-10T16:08:27Z",
  updated_at: "2024-02-10T05:38:54Z",
  pushed_at: "2024-02-08T20:34:09Z",
  git_url: "git://github.com/EddieHubCommunity/BioDrop.git",
  ssh_url: "git@github.com:EddieHubCommunity/BioDrop.git",
  clone_url: "https://github.com/EddieHubCommunity/BioDrop.git",
  svn_url: "https://github.com/EddieHubCommunity/BioDrop",
  homepage: "https://biodrop.io",
  size: 42703,
  stargazers_count: 5639,
  watchers_count: 5639,
  language: "JavaScript",
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: false,
  has_pages: true,
  has_discussions: true,
  forks_count: 4012,
  mirror_url: null,
  archived: true,
  disabled: false,
  open_issues_count: 102,
  license: {
    key: "mit",
    name: "MIT License",
    spdx_id: "MIT",
    url: "https://api.github.com/licenses/mit",
    node_id: "MDc6TGljZW5zZTEz",
  },
  allow_forking: true,
  is_template: false,
  web_commit_signoff_required: false,
  topics: [
    "css",
    "docker",
    "hacktoberfest",
    "html",
    "javascript",
    "mongodb",
    "nextjs",
    "nodejs",
    "reactjs",
    "tailwind",
  ],
  visibility: "public",
  forks: 4012,
  open_issues: 102,
  watchers: 5639,
  default_branch: "main",
  temp_clone_token: null,
  custom_properties: {},
  organization: {
    login: "EddieHubCommunity",
    id: 66388388,
    node_id: "MDEyOk9yZ2FuaXphdGlvbjY2Mzg4Mzg4",
    avatar_url: "https://avatars.githubusercontent.com/u/66388388?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/EddieHubCommunity",
    html_url: "https://github.com/EddieHubCommunity",
    followers_url: "https://api.github.com/users/EddieHubCommunity/followers",
    following_url:
      "https://api.github.com/users/EddieHubCommunity/following{/other_user}",
    gists_url: "https://api.github.com/users/EddieHubCommunity/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/EddieHubCommunity/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/EddieHubCommunity/subscriptions",
    organizations_url: "https://api.github.com/users/EddieHubCommunity/orgs",
    repos_url: "https://api.github.com/users/EddieHubCommunity/repos",
    events_url:
      "https://api.github.com/users/EddieHubCommunity/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/EddieHubCommunity/received_events",
    type: "Organization",
    site_admin: false,
  },
  network_count: 4012,
  subscribers_count: 54,
};

const results = checks(repo);

export default function Page() {
  return (
    <>
      <Heading
        title={repo.full_name}
        actions={[
          { text: "GitHub Repo", url: repo.html_url, icon: CodeBracketIcon },
        ]}
        extras={[
          { icon: StarIcon, text: repo.stargazers_count },
          { icon: LanguageIcon, text: repo.language },
          { icon: ClockIcon, text: repo.updated_at },
          { icon: TicketIcon, text: repo.open_issues },
        ]}
      />
      <List data={results} />
    </>
  );
}
