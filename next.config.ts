import type { NextConfig } from "next";

const architectureGuideRewrites = [
  {
    source: "/architecture/client",
    destination: "/_unlisted/architecture/client.html",
  },
  {
    source: "/architecture/server",
    destination: "/_unlisted/architecture/server.html",
  },
];

const noIndexHeaders = [
  {
    key: "X-Robots-Tag",
    value: "noindex, nofollow, noarchive",
  },
];

const nextConfig: NextConfig = {
  headers() {
    return architectureGuideRewrites.flatMap(({ source, destination }) => [
      { source, headers: noIndexHeaders },
      { source: destination, headers: noIndexHeaders },
    ]);
  },
  rewrites() {
    return architectureGuideRewrites;
  },
};

export default nextConfig;
