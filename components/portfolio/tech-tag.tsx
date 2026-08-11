import { cn } from "@/lib/utils";

export function TechTag({
  children,
  glow = false,
}: {
  children: React.ReactNode;
  glow?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-mono px-2 py-[3px] rounded-[4px] tracking-[0.01em]",
        glow
          ? "border border-primary/20 bg-accent text-accent-foreground"
          : "border border-border bg-secondary text-muted-foreground"
      )}
    >
      {children}
    </span>
  );
}
