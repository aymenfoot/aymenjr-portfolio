"use client";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span className="display font-semibold tracking-tight">AYMEN JR.</span>
        </div>
        <div className="text-sm text-[var(--text-dim)]">AI Engineer · Independent Builder</div>
        <div className="text-sm text-[var(--text-dim)]">Designed and built with curiosity. © 2026</div>
      </div>
    </footer>
  );
}
