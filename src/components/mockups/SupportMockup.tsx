export default function SupportMockup() {
  return (
    <div className="surface rounded-2xl overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 text-xs font-mono text-[var(--text-dim)]">nexa-support · ops dashboard</span>
      </div>
      <div className="p-5 grid grid-cols-3 gap-3">
        <div className="col-span-2 space-y-3">
          <div className="flex justify-end">
            <div className="bg-[var(--accent)] text-[var(--bg)] px-3 py-2 rounded-2xl rounded-tr-sm text-xs max-w-[80%]">Where is my order ORD-1002?</div>
          </div>
          <div className="flex justify-start">
            <div className="bg-[var(--surface-2)] text-[var(--text)] px-3 py-2 rounded-2xl rounded-tl-sm text-xs max-w-[80%]">Delivered. Tracking: FDX-78901234.</div>
          </div>
          <div className="flex justify-end">
            <div className="bg-[var(--accent)] text-[var(--bg)] px-3 py-2 rounded-2xl rounded-tr-sm text-xs max-w-[80%]">Can I return it? Unused.</div>
          </div>
          <div className="flex justify-start">
            <div className="bg-[var(--surface-2)] text-[var(--text)] px-3 py-2 rounded-2xl rounded-tl-sm text-xs max-w-[80%]">Yes, within 30 days. Full refund.</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="surface rounded-lg p-2.5 text-center">
            <div className="text-lg font-semibold text-[var(--accent)]">80%</div>
            <div className="text-[9px] text-[var(--text-dim)] uppercase">Deflection</div>
          </div>
          <div className="surface rounded-lg p-2.5 text-center">
            <div className="text-lg font-semibold text-[var(--text)]">49</div>
            <div className="text-[9px] text-[var(--text-dim)] uppercase">Tickets</div>
          </div>
          <div className="surface rounded-lg p-2.5 text-center">
            <div className="text-lg font-semibold text-[var(--accent-2)]">$7.8K</div>
            <div className="text-[9px] text-[var(--text-dim)] uppercase">Saved/mo</div>
          </div>
        </div>
      </div>
    </div>
  );
}
