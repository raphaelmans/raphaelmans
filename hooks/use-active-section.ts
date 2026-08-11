"use client";

import { useState, useEffect } from "react";

function observeActiveSections(
  ids: readonly string[],
  onActive: (id: string) => void
) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onActive(entry.target.id);
      }
    },
    { rootMargin: "-30% 0px -65% 0px" }
  );

  for (const id of ids) {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  }

  return () => {
    observer.disconnect();
  };
}

export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => observeActiveSections(ids, setActive), [ids]);

  return active;
}
