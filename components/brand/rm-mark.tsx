import type { SVGProps } from "react";
import { RM_MARK_PATH, RM_MARK_VIEW_BOX } from "@/lib/brand";

type RMMarkProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function RMMark({ title, ...props }: RMMarkProps) {
  return (
    <svg
      viewBox={RM_MARK_VIEW_BOX}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      {title && <title>{title}</title>}
      <path d={RM_MARK_PATH} fill="currentColor" />
    </svg>
  );
}
