import { http, HttpResponse } from "msw";

import repo from "../../data/github/repo.json";
import issues from "../../data/github/issues.json";
import branches from "../../data/github/branches.json";
import release from "../../data/github/release.json";
import community from "../../data/github/community.json";
import labels from "../../data/github/labels.json";
import projects from "../../data/github/projects.json";
import referrers from "../../data/github/referrers.json";
import views from "../../data/github/views.json";
import identities from "../../data/flagsmith/identities.json";
import flags from "../../data/flagsmith/flags.json";

export const handlers = [
  // flagsmith
  http.post("https://edge.api.flagsmith.com/api/v1/identities/", () =>
    HttpResponse.json(identities),
  ),
  http.get("https://edge.api.flagsmith.com/api/v1/flags/", () =>
    HttpResponse.json(flags),
  ),

  // github
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
  http.get(
    "https://api.github.com/repos/EddieHubCommunity/HealthCheck/community/profile",
    () => HttpResponse.json(community),
  ),
  http.get(
    "https://api.github.com/repos/EddieHubCommunity/HealthCheck/labels",
    () => HttpResponse.json(labels),
  ),
  http.get(
    "https://api.github.com/repos/EddieHubCommunity/HealthCheck/projects",
    () => HttpResponse.json(projects),
  ),
  http.get(
    "https://api.github.com/repos/EddieHubCommunity/HealthCheck/traffic/popular/referrers",
    () => HttpResponse.json(referrers),
  ),
  http.get(
    "https://api.github.com/repos/EddieHubCommunity/HealthCheck/traffic/views",
    () => HttpResponse.json(views),
  ),
];
