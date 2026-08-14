export const SITE_TITLE_SUFFIX = " | Raphael Mansueto";

export const siteConfig = {
  origin: "https://raphaelmansueto.com",
  name: "Raphael Mansueto",
  defaultTitle: "Full-Stack AI Integration Engineer | Raphael Mansueto",
  defaultDescription:
    "Senior full-stack engineer delivering AI integrations, transactional systems, and reliable web and mobile products across TypeScript, Go, and PostgreSQL.",
  person: {
    id: "raphael-mansueto",
    name: "Raphael Mansueto",
    jobTitle: "Senior Full-Stack Engineer · AI Integrations",
    email: "mailto:raphaelmansueto@gmail.com",
    location: "Cebu City",
    country: "PH",
    employer: "VISEO",
    alumniOf: "Cebu Institute of Technology - University",
  },
  profiles: {
    github: "https://github.com/raphaelmans",
    linkedin: "https://linkedin.com/in/raphaelmansueto",
    x: "https://x.com/raphaeljamesm",
  },
} as const;

export function absoluteUrl(pathname = "/") {
  if (pathname === "/" || pathname === "") return siteConfig.origin;
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteConfig.origin}${normalizedPath}`;
}

export function isCanonicalSiteUrl(value: string) {
  try {
    return new URL(value).origin === siteConfig.origin;
  } catch {
    return false;
  }
}

export function personId() {
  return `${siteConfig.origin}/#${siteConfig.person.id}`;
}
