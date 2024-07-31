import { makeBadge } from "badge-maker";

import prisma from "@/models/db";
import { worstCheck } from "@/utils/checks";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { id } = params;

  // get latest repo check
  const repository = await prisma.repository.findUnique({
    where: { id },
    include: {
      checks: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  // default badge settings
  let config = {
    message: "No checks",
    label: "HealthCheck",
    style: "flat",
  };

  if (repository?.checks[0]) {
    const check = repository.checks[0];

    // if check report found
    config = {
      ...config,
      message: worstCheck(
        check,
        `Error (${check.red})`,
        `Warning (${check.amber})`,
        `Success (${check.green})`,
      ),
      color: worstCheck(check, "red", "orange", "green"),
    };
  } else {
    // if check report not found
    config = {
      ...config,
      message: "Not found",
      color: "lightgrey",
    };
  }

  let svg = "";
  try {
    svg = makeBadge(config);
  } catch (e) {
    console.log(e);
    // TODO: return error badge
  }

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
