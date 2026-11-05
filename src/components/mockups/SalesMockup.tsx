export default function SalesMockup() {
  const products = [
    { name: "CloudRun Pro", price: "$99", tag: "Best for distance" },
    { name: "AeroLite", price: "$109", tag: "Lightweight" },
    { name: "Stride X", price: "$115", tag: "Versatile" },
  ];
  return (
    <div className="surface rounded-2xl overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 text-xs font-mono text-[var(--text-dim)]">nexa-sales · widget</span>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex justify-end">
          <div className="bg-[var(--accent)] text-[var(--bg)] px-4 py-2 rounded-2xl rounded-tr-sm text-sm max-w-[85%]">Running shoes under $120?</div>
        </div>
        <div className="flex justify-start">
          <div className="bg-[var(--surface-2)] text-[var(--text)] px-4 py-2 rounded-2xl rounded-tl-sm text-sm max-w-[85%]">Found 3 options that match.</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {products.map((p) => (
            <div key={p.name} className="surface rounded-xl p-3 text-center">
              <div className="w-full aspect-square rounded-lg bg-[var(--surface-2)] mb-2" />
              <div className="text-xs font-medium text-[var(--text)]">{p.name}</div>
              <div className="text-xs text-[var(--accent)] font-mono mt-1">{p.price}</div>
              <div className="text-[10px] text-[var(--text-dim)] mt-1">{p.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
