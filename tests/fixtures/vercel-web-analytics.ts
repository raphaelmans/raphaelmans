export const analyticsWindowFixture = {
  since: "2026-07-16",
  until: "2026-08-14",
  measuredThrough: "2026-08-14",
} as const;

export const countResponseFixture = {
  version: 1,
  query: {
    since: "2026-07-16T00:00:00.000Z",
    until: "2026-08-14T00:00:00.000Z",
  },
  data: {
    pageviews: 812,
    visitors: 428,
  },
} as const;

export const aggregateResponseFixture = {
  version: 1,
  query: {
    since: "2026-07-16T00:00:00.000Z",
    until: "2026-08-14T00:00:00.000Z",
    groupBy: ["requestPath"],
    limit: 100,
  },
  data: [
    { requestPath: "/work/ample-news", pageviews: 186, visitors: 142 },
    { requestPath: "/work/kudoscourts", pageviews: 144, visitors: 108 },
    {
      requestPath: "/engineering/transactional-reservation-boundaries",
      pageviews: 83,
      visitors: 62,
    },
    { requestPath: "/", pageviews: 275, visitors: 210 },
    { requestPath: "/resume.pdf", pageviews: 25, visitors: 21 },
    { requestPath: "/opengraph-image", pageviews: 11, visitors: 10 },
  ],
} as const;
