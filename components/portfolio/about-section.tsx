"use client";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function AboutSection() {
  return (
    <section id="about" className="pb-[72px]">
      <Reveal>
        <SectionHeading>About</SectionHeading>
        <div className="text-base text-zinc-400 leading-[1.75]">
          <p className="mb-3">
            My entire workflow runs through{" "}
            <span className="text-foreground">AI-assisted development</span>:
            Claude Code and Codex interchangeably depending on the task,
            spec-driven pipelines that validate before deployment, and custom
            AI skills I wrote to enforce TDD-first architecture. The result: I
            deliver production systems at a pace and cost that doesn't make
            sense for a solo engineer.
          </p>
          <p className="mb-3">
            That same discipline scales to{" "}
            <span className="text-foreground">
              compliance-grade environments
            </span>
            . Proper security processes, cross-team coordination, audit trails,
            and code review gates on every merge.
          </p>
          <p>
            BS Computer Science from CIT University, Cum Laude. Open to{" "}
            <a
              href="#projects"
              className="text-accent-sky no-underline hover:underline underline-offset-4"
            >
              side projects
            </a>{" "}
            and part-time freelance.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
