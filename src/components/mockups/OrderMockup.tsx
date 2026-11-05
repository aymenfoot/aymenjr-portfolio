export default function OrderMockup() {
  const rows = [
    { label: "Input", value: "Track package FDX-78901234" },
    { label: "Triage", value: "intent = shipping_tracking" },
    { label: "Tool", value: "track_shipment(...)" },
    { label: "Result", value: "FedEx · DELIVERED · 3 events" },
    { label: "Response", value: "Delivered Tuesday." },
  ];
  return (
    <div className="surface rounded-2xl overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 text-xs font-mono text-[var(--text-dim)]">nexa-order · agent</span>
      </div>
      <div className="p-5 space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <span className="text-xs font-mono text-[var(--accent-2)] w-16 shrink-0 pt-0.5">{r.label}</span>
            <span className="text-sm text-[var(--text)] font-mono">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
