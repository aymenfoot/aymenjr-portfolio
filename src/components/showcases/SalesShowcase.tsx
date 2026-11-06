"use client";

import { useEffect, useState } from "react";

const products = [
  { name: "Echo Pro", price: 79, tag: "Best for calls", specs: "40h battery · ENC mic · BT 5.3", mic: 9, battery: 7 },
  { name: "AirBeat", price: 89, tag: "Lightweight", specs: "24h battery · ENC mic · BT 5.2", mic: 7, battery: 6 },
  { name: "Sonic X", price: 95, tag: "Versatile", specs: "30h battery · ENC mic · BT 5.3", mic: 6, battery: 8 },
];

type Pref = "calls" | "general";

export default function SalesShowcase() {
  const [budget, setBudget] = useState(100);
  const [pref, setPref] = useState<Pref>("calls");
  const [prioritizeMic, setPrioritizeMic] = useState(false);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [compared, setCompared] = useState<string | null>(null);
  const [followUp, setFollowUp] = useState(false);

  const filtered = products
    .filter((p) => p.price <= budget)
    .sort((a, b) => (prioritizeMic ? b.mic - a.mic : b.battery - a.battery));

  const pipeline = [
    { id: "pref", label: "Preference extraction", desc: `Budget: $${budget}, use: ${pref === "calls" ? "long calls" : "general"}, mic priority: ${prioritizeMic}` },
    { id: "intent", label: "Intent analysis", desc: "Classified as product_discovery." },
    { id: "search", label: "Catalog search", desc: `Scanned ${products.length} products.` },
    { id: "filter", label: "Filtering", desc: `Removed ${products.length - filtered.length} over budget.` },
    { id: "match", label: "Product matching", desc: `Matched ${filtered.length} products to preferences.` },
    { id: "rank", label: "Ranking", desc: prioritizeMic ? "Ranked by mic quality." : "Ranked by battery life." },
    { id: "recommend", label: "Recommendation", desc: filtered.length ? `Top: ${filtered[0].name} (${filtered[0].price}).` : "No matches." },
    { id: "explain", label: "Explanation", desc: "Generated reasoning for top recommendation." },
  ];

  // Auto-run pipeline
  useEffect(() => {
    setStep(0); // eslint-disable-line react-hooks/set-state-in-effect
    const timers: ReturnType<typeof setTimeout>[] = [];
    pipeline.forEach((_, i) => {
      const t = setTimeout(() => setStep((v) => Math.max(v, i + 1)), 400 + i * 600);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget, pref, prioritizeMic]);

  const reset = () => { setBudget(100); setPref("calls"); setPrioritizeMic(false); setSelected(null); setCompared(null); setFollowUp(false); };

  const topProduct = filtered[0];
  const selProduct = products.find((p) => p.name === selected);
  const cmpProduct = products.find((p) => p.name === compared);

  return (
    <div className="space-y-5">
      {/* Shopping request */}
      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Shopping request</div>
        <p className="text-sm text-[var(--text)]">
          &quot;I&apos;m looking for a comfortable wireless headset for {pref === "calls" ? "long business calls" : "general use"}. My budget is under ${budget}.&quot;
        </p>
        {followUp && (
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            &quot;I care more about microphone quality than battery life.&quot;
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <label className="text-xs text-[var(--text-dim)]">Budget</label>
            <input type="range" min={60} max={120} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-28 accent-[var(--accent)]" />
            <span className="text-xs font-mono text-[var(--accent)]">${budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-[var(--text-dim)]">Use</label>
            <select value={pref} onChange={(e) => setPref(e.target.value as Pref)} className="bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-2 py-1 text-xs text-[var(--text)]">
              <option value="calls">Long calls</option>
              <option value="general">General use</option>
            </select>
          </div>
          <button onClick={() => setPrioritizeMic(!prioritizeMic)} className={`px-3 py-1.5 rounded-lg border text-xs transition ${prioritizeMic ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]"}`}>
            {prioritizeMic ? "✓ Mic priority" : "Prioritize mic"}
          </button>
          <button onClick={() => setFollowUp(true)} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-[var(--accent)] transition">
            Ask follow-up
          </button>
          <button onClick={reset} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-[var(--accent)] transition">Reset</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Processing pipeline */}
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Processing pipeline</div>
          <div className="space-y-2">
            {pipeline.map((st, i) => (
              <div
                key={st.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition ${
                  i < step ? "border-[var(--accent)]/40 bg-[var(--accent)]/5" : "border-[var(--border)] bg-transparent opacity-40"
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0 ${
                  i < step ? "bg-[var(--accent)] text-[var(--bg)]" : "bg-[var(--surface-2)] text-[var(--text-dim)]"
                }`}>
                  {i < step ? "✓" : i + 1}
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[var(--text)]">{st.label}</div>
                  {i < step && <div className="text-xs text-[var(--text-muted)] mt-0.5">{st.desc}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product discovery */}
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Product discovery</div>
          <div className="grid grid-cols-3 gap-3">
            {filtered.map((p) => (
              <button
                key={p.name}
                onClick={() => setSelected(p.name)}
                className={`surface rounded-xl p-3 text-left transition hover:border-[var(--accent)]/50 ${
                  selected === p.name ? "border-[var(--accent)]" : ""
                }`}
              >
                <div className="w-full aspect-square rounded-lg bg-[var(--surface-2)] mb-2" />
                <div className="text-xs font-medium text-[var(--text)]">{p.name}</div>
                <div className="text-xs text-[var(--accent)] font-mono mt-1">${p.price}</div>
                <div className="text-[10px] text-[var(--text-dim)] mt-1">{p.tag}</div>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-xs text-[var(--text-dim)] mt-2">No products under ${budget}.</div>
          )}
        </div>
      </div>

      {/* Recommendation */}
      {step >= 7 && topProduct && (
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Recommendation</div>
          <div className="text-sm text-[var(--text)]">
            <span className="text-[var(--accent)] font-medium">{topProduct.name}</span> — best match for {pref === "calls" ? "long business calls" : "general use"} under ${budget}.
            {prioritizeMic && " Ranked by microphone quality."}
            {followUp && " Preference updated: mic quality prioritized over battery."}
          </div>
          <div className="mt-2 text-xs text-[var(--text-muted)]">
            Recommended based on product specs, price, and stated preferences.
          </div>
          {/* Compare */}
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <div className="text-xs text-[var(--text-dim)] mb-2">Compare with:</div>
            <div className="flex flex-wrap gap-2">
              {filtered.filter((p) => p.name !== (selected || topProduct.name)).map((p) => (
                <button
                  key={p.name}
                  onClick={() => setCompared(p.name)}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition ${
                    compared === p.name ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
            {compared && selProduct && (
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div className="surface rounded-lg p-3">
                  <div className="font-medium text-[var(--text)]">{selProduct.name}</div>
                  <div className="text-[var(--accent)] font-mono mt-1">${selProduct.price}</div>
                  <div className="text-[var(--text-muted)] mt-1">{selProduct.specs}</div>
                </div>
                <div className="surface rounded-lg p-3">
                  <div className="font-medium text-[var(--text)]">{cmpProduct?.name}</div>
                  <div className="text-[var(--accent)] font-mono mt-1">${cmpProduct?.price}</div>
                  <div className="text-[var(--text-muted)] mt-1">{cmpProduct?.specs}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="text-xs text-[var(--text-dim)]">
        Interactive demonstration using a seeded demo catalog. Actual behavior depends on store configuration.
      </p>
    </div>
  );
}
