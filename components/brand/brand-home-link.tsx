import Link from "next/link";
import { RMMark } from "@/components/brand/rm-mark";
import { cn } from "@/lib/utils";

export function BrandHomeLink({
  href = "/",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center gap-2.5 rounded-sm text-foreground no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className
      )}
    >
      <RMMark className="h-auto w-7 shrink-0" />
      <span className="text-sm font-semibold tracking-[-0.02em]">Raphael Mansueto</span>
    </Link>
  );
}
