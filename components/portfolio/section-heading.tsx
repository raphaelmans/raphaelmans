export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 max-w-[620px] text-balance text-2xl font-medium tracking-[-0.025em] text-foreground">
      {children}
    </h2>
  );
}
