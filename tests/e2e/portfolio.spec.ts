import { expect, test, type Page } from "@playwright/test";
import { caseStudies } from "../../data/case-studies";
import { engineeringNotes } from "../../data/engineering-notes";
import { latestPortfolioReviewDate } from "../../data/public-content";
import { absoluteUrl, personId, siteConfig } from "../../lib/site";

const publicRoutes = ["/", "/work/kudoscourts", "/work/ample-news", "/work/cravingsph"];

const evidenceByRoute: Record<string, string[]> = {
  "/": [],
  "/work/kudoscourts": ["kudoscourts-reservation-coordination"],
  "/work/ample-news": [
    "ample-news-recoverable-workflow",
    "ample-news-correlated-observability",
  ],
  "/work/cravingsph": ["cravingsph-coordinated-transaction"],
};

function collectUnexpectedConsole(page: Page) {
  const messages: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") messages.push(message.text());
  });
  page.on("pageerror", (error) => messages.push(error.message));
  return messages;
}

async function readJsonLd(page: Page, schemaType: string) {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const schemas = scripts.map((source) => JSON.parse(source));
  return schemas.find((schema) => schema["@type"] === schemaType);
}

const kudosCourtsCaseStudy = caseStudies.find((caseStudy) => caseStudy.slug === "kudoscourts");
if (!kudosCourtsCaseStudy) throw new Error("Missing published KudosCourts case study fixture");

test("every public content route exposes a working branded social image", async ({ page, request }) => {
  const socialRoutes = [
    { page: "/", image: "/opengraph-image" },
    { page: "/engineering", image: "/engineering/opengraph-image" },
    ...caseStudies.map((caseStudy) => ({
      page: `/work/${caseStudy.slug}`,
      image: `/work/${caseStudy.slug}/opengraph-image`,
    })),
    ...engineeringNotes.map((note) => ({
      page: `/engineering/${note.slug}`,
      image: `/engineering/${note.slug}/opengraph-image`,
    })),
  ];

  for (const route of socialRoutes) {
    await page.goto(route.page);
    const expectedImageUrl = absoluteUrl(route.image);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expectedImageUrl);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", expectedImageUrl);

    const response = await request.get(route.image);
    expect(response.status(), route.image).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");

    const imageSource = `data:image/png;base64,${(await response.body()).toString("base64")}`;
    await page.setContent(`<img alt="social preview" src="${imageSource}">`);
    const dimensions = await page.getByAltText("social preview").evaluate((image: HTMLImageElement) => ({
      width: image.naturalWidth,
      height: image.naturalHeight,
    }));
    expect(dimensions).toEqual({ width: 1200, height: 630 });
  }
});

test("brand identity is consistent across navigation and application icons", async ({ page, request }) => {
  const routeHeaders = [
    { route: "/", back: null },
    { route: "/engineering", back: "Portfolio" },
    { route: "/work/kudoscourts", back: "Selected Work" },
    {
      route: "/engineering/human-decision-gates-production-ai",
      back: "Engineering notes",
    },
  ];

  for (const entry of routeHeaders) {
    await page.goto(entry.route);
    const brandLink = page.locator("nav").getByRole("link", { name: "Raphael Mansueto", exact: true });
    await expect(brandLink).toBeVisible();
    await expect(brandLink.locator("svg")).toHaveCount(1);

    if (entry.back) {
      await expect(page.locator("main").getByRole("link", { name: entry.back, exact: true })).toBeVisible();
      await expect(page.locator("nav").getByRole("link", { name: entry.back, exact: true })).toHaveCount(0);
    }
  }

  await page.goto("/");
  const iconHrefs = await page.locator('link[rel="icon"], link[rel="apple-touch-icon"]').evaluateAll((links) =>
    links.map((link) => (link as HTMLLinkElement).href)
  );
  expect(iconHrefs.some((href) => href.includes("/favicon.ico"))).toBe(true);
  expect(iconHrefs.some((href) => href.includes("/icon.svg"))).toBe(true);
  expect(iconHrefs.some((href) => href.includes("/apple-icon"))).toBe(true);

  for (const asset of ["/favicon.ico", "/icon.svg", "/apple-icon.png"]) {
    const response = await request.get(asset);
    expect(response.status(), asset).toBe(200);
  }
});

test("rendered search signals share one canonical origin and complete schemas", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(siteConfig.defaultTitle);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", siteConfig.defaultDescription);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", siteConfig.origin);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", siteConfig.origin);

  const profile = await readJsonLd(page, "ProfilePage");
  expect(profile.url).toBe(siteConfig.origin);
  expect(profile.mainEntity["@id"]).toBe(personId());
  expect(profile.dateModified).toBe(latestPortfolioReviewDate);

  await page.goto("/work/kudoscourts");
  await expect(page).toHaveTitle("Realtime Reservation Architecture | Raphael Mansueto");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", absoluteUrl("/work/kudoscourts"));
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", absoluteUrl("/work/kudoscourts"));

  const article = await readJsonLd(page, "Article");
  expect(article.url).toBe(absoluteUrl("/work/kudoscourts"));
  expect(article.mainEntityOfPage["@id"]).toBe(article.url);
  expect(article.image).toBe(absoluteUrl("/work/kudoscourts/opengraph-image"));
  expect(article.author["@id"]).toBe(personId());
  expect(article.dateModified).toBe(kudosCourtsCaseStudy.lastReviewed);
});

test("engineering notes preserve progressive disclosure across themes and viewports", async ({ page }) => {
  const consoleMessages = collectUnexpectedConsole(page);
  await page.addInitScript(() => localStorage.setItem("theme", "system"));

  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 1440, height: 1000 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/engineering");
      await expect(page.getByRole("heading", { level: 1, name: "Engineering decisions, explained." })).toBeVisible();
      await expect(page.locator("main li > a")).toHaveCount(engineeringNotes.length);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

      await page.goto("/engineering/human-decision-gates-production-ai");
      await expect(page.getByRole("heading", { level: 1, name: "Human decision gates in production AI workflows" })).toBeVisible();
      await expect(page.locator("[data-direct-answer]")).toBeVisible();
      await expect(page.locator("[data-engineering-visual]")).toHaveCount(1);
      await expect(page.locator("[data-engineering-sequence] > li")).toHaveCount(4);
      await expect(page.getByRole("link", { name: /Ample News case study/ })).toHaveAttribute("href", "/work/ample-news");
      const supportingContextPrecedesDetails = await page.locator("[data-supporting-case-context]").evaluate((context) => {
        const visual = document.querySelector("[data-engineering-visual]");
        const firstDetail = document.querySelector("article section[id]");
        if (!visual || !firstDetail) return false;
        return (
          (context.compareDocumentPosition(visual) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0 &&
          (context.compareDocumentPosition(firstDetail) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
        );
      });
      expect(supportingContextPrecedesDetails).toBe(true);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        absoluteUrl("/engineering/human-decision-gates-production-ai")
      );
      const noteArticle = await readJsonLd(page, "Article");
      expect(noteArticle.url).toBe(absoluteUrl("/engineering/human-decision-gates-production-ai"));
      expect(noteArticle.mainEntityOfPage["@id"]).toBe(noteArticle.url);
      expect(noteArticle.image).toBe(
        absoluteUrl("/engineering/human-decision-gates-production-ai/opengraph-image")
      );
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

      const hierarchy = await page.locator("article h1, article h2").evaluateAll((headings) =>
        headings.map((heading) => ({ tag: heading.tagName, text: heading.textContent?.trim() }))
      );
      expect(hierarchy[0]).toEqual({ tag: "H1", text: "Human decision gates in production AI workflows" });
      expect(hierarchy.slice(1).every((heading) => heading.tag === "H2")).toBe(true);
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/engineering/human-decision-gates-production-ai");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  await page.goto("/");
  await expect(page.getByRole("link", { name: "Engineering notes" })).toHaveCount(1);
  for (const note of engineeringNotes) {
    await expect(page.getByText(note.title, { exact: true })).toHaveCount(0);
  }
  expect(consoleMessages).toEqual([]);
});

test("mobile navigation and skip paths preserve keyboard orientation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeVisible();
  const skipLinkBox = await skipLink.boundingBox();
  expect(skipLinkBox).not.toBeNull();
  expect(skipLinkBox!.y).toBeGreaterThanOrEqual(0);
  expect(skipLinkBox!.y + skipLinkBox!.height).toBeLessThanOrEqual(844);
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  const menuTrigger = page.getByRole("button", { name: "Open navigation" });
  await menuTrigger.focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "View experience" })).toBeFocused();

  await menuTrigger.click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  const navigation = page.getByRole("navigation").filter({ hasText: "Raphael Mansueto" });
  await expect(navigation).toHaveClass(/bg-background/);
  const openNavigationAlpha = await navigation.evaluate((element) => {
    const color = getComputedStyle(element).backgroundColor;
    const modernAlpha = color.match(/\/\s*([\d.]+)\s*\)$/)?.[1];
    if (modernAlpha) return Number(modernAlpha);
    const legacyAlpha = color.match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)$/)?.[1];
    return legacyAlpha ? Number(legacyAlpha) : 1;
  });
  expect(openNavigationAlpha).toBe(1);
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-navigation")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();

  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeFocused();
});

test("mobile primary and utility actions meet the interaction target contract", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const controls = [
    page.getByRole("button", { name: "Change color theme" }),
    page.getByRole("button", { name: "Open navigation" }),
    page.getByRole("link", { name: "View experience" }),
    page.getByRole("link", { name: "View the complete experience record" }),
    page.getByRole("link", { name: "GitHub" }),
    page.getByRole("link", { name: "Back to top" }),
    ...await page.locator("[data-primary-proof-action]").all(),
    page.locator("[data-primary-contact-action]"),
    ...await page.locator("#recognition a").all(),
  ];

  for (const control of controls) {
    const box = await control.boundingBox();
    expect(box, `Expected ${await control.getAttribute("aria-label") ?? await control.textContent()} to be measurable`).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("homepage presents the compact qualified-interview argument", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Raphael Mansueto" })).toBeVisible();
  await expect(
    page.getByText("Senior Full-Stack Engineer · AI Integrations", { exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "From product requirements to production systems." })
  ).toBeVisible();
  await expect(
    page.getByText(
      "I deliver across frontend, backend, AI integrations, data, and infrastructure—with the testing and observability needed to operate reliably.",
      { exact: true }
    )
  ).toBeVisible();
  await expect(
    page.getByText(
      "Currently a Senior Full Stack Developer at VISEO, building institutional settlement workflows across EVM and Solana.",
      { exact: true }
    )
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "View experience" })).toHaveAttribute("href", "#experience");
  await expect(page.locator("[data-proof-statement]")).toContainText(
    "5+ years delivering production AI and integration-heavy products across TypeScript, Go, web, and mobile."
  );
  await expect(page.getByRole("heading", { name: "Senior Full Stack Developer · VISEO" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Full-Stack AI Integration Engineer · HustleWing" })).toBeVisible();
  const expectedExperienceSkills = {
    viseo: ["Next.js 16 / TypeScript", "Docker / Kubernetes", "EVM / Solana", "Viem / Wagmi", "Vitest / React Testing Library"],
    hustlewing: ["Go / Gin", "PostgreSQL / pgvector", "OpenAI / Vercel AI SDK", "LangGraph / Mastra", "Google Cloud Pub/Sub", "Docker / Kubernetes", "Langfuse / OpenTelemetry"],
    outliant: ["REST APIs", "React Hook Form", "Server-side rendering"],
    vibravid: ["Hardhat / OpenZeppelin", "Mocha / Chai / Jest", "Tron / WAX / Syscoin", "Telegram Bot API"],
  };
  for (const [experienceId, skills] of Object.entries(expectedExperienceSkills)) {
    const experience = page.locator(`[data-experience='${experienceId}']`);
    await expect(experience).toHaveCount(1);
    await expect(experience.locator("[data-experience-skills]")).toHaveCount(1);
    for (const skill of skills) {
      await expect(experience.locator("[data-experience-skills]")).toContainText(skill);
    }
  }
  const primaryExperiences = page.locator("[data-experience-list] > article");
  await expect(primaryExperiences).toHaveCount(2);
  for (const experience of await primaryExperiences.all()) {
    await expect(experience.locator("[data-homepage-proof-point]")).toHaveCount(2);
  }
  await expect(page.locator("[data-experience-resume-action]")).toBeVisible();
  await expect(page.getByText(/Lead Front-End Engineer/i)).toHaveCount(0);
  await expect(page.getByText(/Product Engineer/i)).toHaveCount(0);
  await expect(page.getByText(/Vectle/i)).toHaveCount(0);
  await expect(page.getByText(/Solo product owner/i)).toHaveCount(0);
  await expect(page.locator("[data-primary-contact-action]")).toHaveCount(1);

  const sectionOrder = await page.locator("#experience, #work, #recognition, #contact").evaluateAll((sections) =>
    sections.map((section) => section.id)
  );
  expect(sectionOrder).toEqual(["experience", "work", "recognition", "contact"]);

  const projects = page.locator("[data-featured-project]");
  await expect(projects).toHaveCount(3);
  await expect.poll(() => projects.evaluateAll((items) =>
    items.map((item) => item.getAttribute("data-featured-project"))
  )).toEqual(["ample-news", "kudoscourts", "cravingsph"]);
  await expect.poll(() => projects.evaluateAll((items) =>
    items.map((item) => item.getAttribute("data-project-presentation"))
  )).toEqual(["flagship", "supporting", "supporting"]);

  for (const project of await projects.all()) {
    await expect(project.locator("[data-primary-proof-action]")).toHaveCount(1);
    await expect(project.getByText("Boundary.", { exact: true })).toHaveCount(0);
    await expect(project.locator("[data-slot='tech-tag']")).toHaveCount(0);
    await expect(project.getByText("Owned decision", { exact: true })).toHaveCount(0);
    await expect(project.locator("[data-evidence-model]")).toHaveCount(0);
  }

  await expect(projects.nth(1)).toContainText(
    "Transactional commands commit one booking outcome, then lifecycle events trigger targeted React Query refreshes across player and operator views."
  );
  await expect(projects.nth(1).getByText(/review-gated extraction boundary/i)).toHaveCount(0);

  await page.goto("/work/kudoscourts");
  await expect(page.getByRole("heading", { name: "KudosCourts: keeping competing bookings in sync" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "How does one booking safely win competing requests?" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "How do player and owner views stay in sync?" })).toBeVisible();
  await expect(page.locator("[data-evidence-model='kudoscourts-reservation-coordination']")).toBeVisible();
  await expect(page.getByText(/event-sourced/i)).toHaveCount(0);
});

test("case-study evidence keeps the conclusion visible and details keyboard-operable", async ({ page }) => {
  await page.goto("/work/kudoscourts");

  const model = page.locator("[data-evidence-model='kudoscourts-reservation-coordination']");
  await expect(
    model.getByRole("heading", { name: "One accepted booking, every affected view in sync" })
  ).toBeVisible();
  await expect(model.locator("ol[data-evidence-overview]")).toBeVisible();
  await expect(model.locator("[data-evidence-node]")).toHaveCount(4);
  for (const label of [
    "Booking request",
    "Transactional claim",
    "Lifecycle event",
    "Targeted reconciliation",
  ]) {
    await expect(model.getByText(label, { exact: true }).first()).toBeVisible();
  }

  const details = model.locator("details[data-evidence-details]");
  const summary = details.locator("summary");
  await expect(details).not.toHaveAttribute("open", "");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(details).toHaveAttribute("open", "");
  await expect(summary).toBeFocused();
  await expect(details.getByText(/database constraints commit one valid booking outcome/i)).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(details).not.toHaveAttribute("open", "");
});

test("public routes retain responsive System, Light, and Dark semantic evidence parity", async ({ page }) => {
  test.slow();
  const consoleMessages = collectUnexpectedConsole(page);

  for (const theme of ["system", "light", "dark"] as const) {
    const systemColor = theme === "system" ? "dark" : theme;
    await page.emulateMedia({ colorScheme: systemColor });
    await page.goto("/");
    await page.evaluate((selectedTheme) => localStorage.setItem("theme", selectedTheme), theme);

    for (const viewport of [
      { width: 390, height: 844 },
      { width: 1440, height: 1000 },
    ]) {
      await page.setViewportSize(viewport);

      for (const route of publicRoutes) {
        const response = await page.goto(route);
        expect(response?.status(), `${route} should load in ${theme} at ${viewport.width}px`).toBe(200);
        await expect(page.locator("html")).toHaveClass(new RegExp(`(^|\\s)${systemColor}(\\s|$)`));
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
          `${route} should not overflow horizontally in ${theme} at ${viewport.width}px`
        ).toBe(true);

        await expect(page.locator("[data-evidence-model] img")).toHaveCount(0);
        await expect(page.getByRole("link", { name: /Open full-size/i })).toHaveCount(0);
        const renderedHtml = await page.content();
        expect(renderedHtml).not.toContain("-mobile.svg");
        expect(renderedHtml).not.toContain("dark:invert");
        const models = page.locator("[data-evidence-model]");
        await expect.poll(() => models.evaluateAll((items) =>
          items.map((item) => item.getAttribute("data-evidence-model"))
        )).toEqual(evidenceByRoute[route]);
        for (let index = 0; index < await models.count(); index += 1) {
          const model = models.nth(index);
          await expect(model).toBeVisible();
          expect((await model.innerText()).trim().length).toBeGreaterThan(0);
          expect(await model.evaluate((element) => getComputedStyle(element).userSelect)).not.toBe("none");
          expect(await model.evaluate((element) => getComputedStyle(element).filter)).toBe("none");
          expect(await model.evaluate((element) => {
            const heading = element.querySelector("h3");
            const firstNode = element.querySelector("[data-evidence-node]");
            return Boolean(
              heading &&
              firstNode &&
              heading.compareDocumentPosition(firstNode) & Node.DOCUMENT_POSITION_FOLLOWING
            );
          })).toBe(true);
          await expect(model.locator("[data-evidence-overview]")).toHaveCount(1);
          await expect(model.locator("details[data-evidence-details]")).toHaveCount(1);

          const minimumContrast = await model.evaluate((element) => {
            const canvas = document.createElement("canvas");
            canvas.width = 1;
            canvas.height = 1;
            const context = canvas.getContext("2d", { willReadFrequently: true });
            if (!context) return 0;

            function toRgb(color: string) {
              context!.clearRect(0, 0, 1, 1);
              context!.fillStyle = color;
              context!.fillRect(0, 0, 1, 1);
              return Array.from(context!.getImageData(0, 0, 1, 1).data.slice(0, 3));
            }

            function luminance([red, green, blue]: number[]) {
              const channels = [red, green, blue].map((channel) => {
                const value = channel / 255;
                return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
              });
              return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
            }

            function backgroundFor(node: Element) {
              let current: Element | null = node;
              while (current) {
                const background = getComputedStyle(current).backgroundColor;
                if (background !== "rgba(0, 0, 0, 0)" && background !== "transparent") return background;
                current = current.parentElement;
              }
              return getComputedStyle(document.body).backgroundColor;
            }

            return Math.min(...Array.from(element.querySelectorAll("h3, p, [data-evidence-node]")).map((node) => {
              const foreground = luminance(toRgb(getComputedStyle(node).color));
              const background = luminance(toRgb(backgroundFor(node)));
              return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
            }));
          });
          expect(minimumContrast).toBeGreaterThanOrEqual(4.5);

          const labels = model.locator("h3, [data-evidence-node]");
          for (let labelIndex = 0; labelIndex < await labels.count(); labelIndex += 1) {
            const fontSize = await labels.nth(labelIndex).evaluate((element) =>
              Number.parseFloat(getComputedStyle(element).fontSize)
            );
            expect(fontSize).toBeGreaterThanOrEqual(12);
          }
        }
      }
    }
  }

  expect(consoleMessages).toEqual([]);
});

test("representative dividers preserve two-sided breathing room", async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844, minimum: 16 },
    { width: 1440, height: 1000, minimum: 24 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const heading = page.getByRole("heading", { name: "Experience that carries the work" });
    const firstExperience = page.locator("[data-experience-list] > article").first();
    const headingBox = await heading.boundingBox();
    const firstBox = await firstExperience.boundingBox();
    expect(headingBox).not.toBeNull();
    expect(firstBox).not.toBeNull();
    expect(firstBox!.y - (headingBox!.y + headingBox!.height)).toBeGreaterThanOrEqual(viewport.minimum);

    for (const selector of [
      "[data-experience-list] > article:nth-child(2)",
      "[data-featured-project]:nth-child(2)",
    ]) {
      const item = page.locator(selector);
      const itemBox = await item.boundingBox();
      const firstMeaningful = item.locator("h3").first();
      const contentBox = await firstMeaningful.boundingBox();
      expect(itemBox).not.toBeNull();
      expect(contentBox).not.toBeNull();
      expect(contentBox!.y - itemBox!.y).toBeGreaterThanOrEqual(viewport.minimum);
    }
  }
});
