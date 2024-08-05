import { http, HttpResponse } from "msw";

import repo from "../../data/github/repo.json";
import issues from "../../data/github/issues.json";
import branches from "../../data/github/branches.json";
import release from "../../data/github/release.json";

export const handlers = [
  http.get("https://api.github.com/repos/EddieHubCommunity/HealthCheck", () =>
    HttpResponse.json(repo),
  ),
  http.get(
    "https://api.github.com/repos/EddieHubCommunity/HealthCheck/issues",
    () => HttpResponse.json(issues),
  ),
  http.get(
    "https://api.github.com/repos/EddieHubCommunity/HealthCheck/branches",
    () => HttpResponse.json(branches),
  ),
  http.get(
    "https://api.github.com/repos/EddieHubCommunity/HealthCheck/releases/latest",
    () => HttpResponse.json(release),
  ),
];
