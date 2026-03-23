"use client";

import { services } from "@/data/portfolio-data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function ServicesSection() {
  return (
    <section id="services" className="pb-[72px]">
      <Reveal>
        <SectionHeading>Open to freelance</SectionHeading>
        <div className="p-5 rounded-[10px] border-[0.5px] border-white/[0.06] bg-accent-sky/5">
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-6 gap-y-3.5 text-[15px] text-zinc-400 leading-[1.55]">
            {services.map((service) => (
              <div key={service.title}>
                <span className="text-foreground font-medium">
                  {service.title}
                </span>
                <br />
                {service.description}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-5 flex-wrap">
            <a
              href="mailto:raphaelmansueto@gmail.com"
              className="text-sm font-medium px-4 py-2 rounded-md bg-accent-sky text-background no-underline hover:bg-accent-sky/90 focus-visible:ring-2 focus-visible:ring-accent-sky focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none transition-colors"
            >
              Send me an email
            </a>
            <a
              href="https://calendly.com/raphaelmansueto/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 rounded-md border-[0.5px] border-white/[0.06] text-zinc-400 no-underline hover:bg-white/[0.04] hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-accent-sky focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none transition-colors"
            >
              Book a 30-min call
            </a>
            <a
              href="https://linkedin.com/in/raphaelmansueto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 rounded-md border-[0.5px] border-white/[0.06] text-zinc-400 no-underline hover:bg-white/[0.04] hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-accent-sky focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
