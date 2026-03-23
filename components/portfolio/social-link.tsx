export function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-1.5 -m-1.5 text-zinc-500 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none transition-colors duration-150"
    >
      {children}
    </a>
  );
}
