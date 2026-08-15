import { expect, test } from "@playwright/test";

const guides = [
  {
    route: "/architecture/client",
    asset: "/_unlisted/architecture/client.html",
    title: "Client Architecture — Field Guide",
    heading: /Intent at the top\.\s*Tools at the edge\./,
  },
  {
    route: "/architecture/server",
    asset: "/_unlisted/architecture/server.html",
    title: "Server Architecture — Field Guide",
    heading: /Policy at the core\.\s*Tools at the edge\./,
  },
] as const;

const robotsDirective = "noindex, nofollow, noarchive";

test("unlisted architecture guides return standalone noindex HTML", async ({ request }) => {
  for (const guide of guides) {
    for (const pathname of [guide.route, guide.asset]) {
      const response = await request.get(pathname);
      const html = await response.text();

      expect(response.status(), pathname).toBe(200);
      expect(response.headers()["content-type"], pathname).toContain("text/html");
      expect(response.headers()["x-robots-tag"], pathname).toBe(robotsDirective);
      expect(html, pathname).toContain(`<title>${guide.title}</title>`);
      expect(html, pathname).toContain(`<meta name="robots" content="${robotsDirective}">`);
    }
  }
});

test("architecture guide navigation works at clean URLs", async ({ page }) => {
  for (const guide of guides) {
    const response = await page.goto(guide.route);

    expect(response?.status(), guide.route).toBe(200);
    await expect(page).toHaveTitle(guide.title);
    await expect(page.getByRole("heading", { level: 1, name: guide.heading })).toBeVisible();

    await page.getByRole("tab", { name: "Layers", exact: true }).click();
    await expect(page.locator("#panel-layers")).toBeVisible();
    await expect(page).toHaveURL(`${guide.route}#layers`);
  }
});

test("architecture guides remain responsive and unlisted", async ({ page, request }) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);

    for (const guide of guides) {
      await page.goto(guide.route);
      const overflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflows, `${guide.route} should fit at ${viewport.width}px`).toBe(false);
    }
  }

  for (const pathname of ["/", "/sitemap.xml", "/llms.txt"]) {
    const response = await request.get(pathname);
    const body = await response.text();

    expect(response.status(), pathname).toBe(200);
    for (const guide of guides) expect(body, pathname).not.toContain(guide.route);
  }
});
