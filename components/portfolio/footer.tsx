export function Footer() {
  return (
    <footer className="pb-10 pt-4 border-t border-white/[0.06] flex justify-between items-center flex-wrap gap-2">
      <span className="text-xs text-zinc-500">
        &copy; 2026 Raphael Mansueto
      </span>
      <div className="flex gap-4 items-center">
        <a
          href="https://rethndr.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-mono text-zinc-500 no-underline hover:text-zinc-400 transition-colors duration-150"
        >
          rethndr.com
        </a>
        <span className="text-xs font-mono text-zinc-500">Cebu, PH</span>
      </div>
    </footer>
  );
}
