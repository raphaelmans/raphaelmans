export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-mono font-medium text-accent-sky tracking-[0.08em] uppercase mb-8 text-balance">
      {children}
    </h2>
  );
}
