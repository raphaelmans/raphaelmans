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
          ? "bg-accent-sky-dark text-accent-sky-light"
          : "bg-white/[0.04] text-zinc-400 border-[0.5px] border-white/[0.06]"
      )}
    >
      {children}
    </span>
  );
}
