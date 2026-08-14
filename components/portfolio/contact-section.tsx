import { Mail } from "lucide-react";
import { SectionHeading } from "./section-heading";

export function ContactSection() {
  return (
    <section id="contact" tabIndex={-1} className="pb-[76px] outline-none">
      <SectionHeading>Start a relevant conversation</SectionHeading>
      <div className="border-t border-border pt-6">
          <p className="max-w-[590px] text-[15px] leading-[1.7] text-secondary-foreground">
            Looking for a senior full-stack engineer who can connect product behavior,
            integrations, and production AI? Send me the role and the difficult boundary.
          </p>
          <div className="mt-5">
            <a
              href="mailto:raphaelmansueto@gmail.com"
              data-primary-contact-action
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground no-underline transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Email Raphael
              <Mail className="size-4" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Prefer more context first?{" "}
            <a
              href="/resume.pdf"
              download
              className="rounded-sm underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Download the résumé
            </a>{" "}
            or{" "}
            <a
              href="https://linkedin.com/in/raphaelmansueto"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              review LinkedIn
            </a>
            .
          </p>
      </div>
    </section>
  );
}
