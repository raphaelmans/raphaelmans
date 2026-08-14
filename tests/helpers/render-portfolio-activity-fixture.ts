import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PortfolioActivityView } from "../../components/portfolio/portfolio-activity-view";
import type { PortfolioActivity } from "../../lib/portfolio-analytics";

const state = process.argv[2];
const totalsOnly: PortfolioActivity = {
  windowDays: 30,
  visitors: 12,
  pageViews: 19,
  popularContent: [],
  measuredThrough: "2026-08-14",
};

const activity = state === "totals" ? totalsOnly : null;
process.stdout.write(renderToStaticMarkup(createElement(PortfolioActivityView, { activity })));
