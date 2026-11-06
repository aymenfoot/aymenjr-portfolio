"use client";

import { useState } from "react";

const products = [
  { name: "Echo Pro", price: 79, tag: "Best for calls", specs: "40h battery · ENC mic · BT 5.3", mic: 9, battery: 7 },
  { name: "AirBeat", price: 89, tag: "Lightweight", specs: "24h battery · ENC mic · BT 5.2", mic: 7, battery: 6 },
  { name: "Sonic X", price: 95, tag: "Versatile", specs: "30h battery · ENC mic · BT 5.3", mic: 6, battery: 8 },
];

type Step = "idle" | "search" | "compare" | "recommend";

export default function SalesShowcase() {
  const [budget, setBudget] = useState(100);
  const [pref, setPref] = useState("calls");
  const [prioritizeMic, setPrioritizeMic] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [compareWith, setCompareWith] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("idle");

  const filtered = products
    .filter((p) => p.price <= budget)
    .sort((a, b) => {
      if (prioritizeMic) return b.mic - a.mic;
      return b.battery - a.battery;
    });

  const run = () => { setStep("search"); setSelected(null); setCompareWith(null); };
  const select = (name: string) => { setSelected(name); setStep("compare"); };
  const reset = () => { setStep("idle"); setSelected(null); setCompareWith(null); setPrioritizeMic(false); setBudget(100); setPref("calls"); };

  const selProduct = products.find((p) => p.name === selected);
  const cmpProduct = products.find((p) => p.name === compareWith);

  return (
    <div className="space-y-5">
      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Shopping request</div>
        <p className="text-sm text-[var(--text)]">
          &quot;I&apos;m looking for a comfortable wireless headset for {pref === "calls" ? "long business calls" : "general use"}. My budget is under ${budget}.&quot;
        </p>
        <div className="mt-4 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <label className="text-xs text-[var(--text-dim)]">Budget</label>
            <input type="range" min={60} max={120} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-28 accent-[var(--accent)]" />
            <span className="text-xs font-mono text-[var(--accent)]">${budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-[var(--text-dim)]">Use</label>
            <select value={pref} onChange={(e) => setPref(e.target.value)} className="bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-2 py-1 text-xs text-[var(--text)]">
              <option value="calls">Long calls</option>
              <option value="general">General use</option>
            </select>
          </div>
          <button onClick={run} className="px-4 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--bg)] text-xs font-medium hover:opacity-90 transition">Search</button>
          <button onClick={() => setPrioritizeMic(!prioritizeMic)} className={`px-3 py-1.5 rounded-lg border text-xs transition ${prioritizeMic ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]"}`}>
            {prioritizeMic ? "✓ Mic priority" : "Prioritize mic"}
          </button>
          <button onClick={reset} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-[var(--accent)] transition">Reset</button>
        </div>
      </div>

      {step !== "idle" && (
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Product discovery</div>
          <div className="text-xs text-[var(--text-muted)] mb-4">
            {step === "search" && `Searching catalog… filtering by budget ($${budget}) and preference (${pref === "calls" ? "long calls" : "general"}).${prioritizeMic ? " Mic quality prioritized." : ""}`}
            {step === "compare" && `Comparing ${selected} against alternatives.`}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {filtered.map((p) => (
              <button
                key={p.name}
                onClick={() => select(p.name)}
                className={`surface rounded-xl p-3 text-left transition hover:border-[var(--accent)]/50 ${
                  selected === p.name ? "border-[var(--accent)]" : ""
                }`}
              >
                <div className="w-full aspect-square rounded-lg bg-[var(--surface-2)] mb-2" />
                <div className="text-xs font-medium text-[var(--text)]">{p.name}</div>
                <div className="text-xs text-[var(--accent)] font-mono mt-1">{p.price}</div>
                <div className="text-[10px] text-[var(--text-dim)] mt-1">{p.tag}</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-1">{p.specs}</div>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-xs text-[var(--text-dim)] mt-2">No products under ${budget}.</div>
          )}
        </div>
      )}

      {step === "compare" && selProduct && (
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Recommendation</div>
          <div className="text-sm text-[var(--text)]">
            <span className="text-[var(--accent)] font-medium">{selProduct.name}</span> — best match for {pref === "calls" ? "long business calls" : "general use"} under ${budget}.
            {prioritizeMic && " Prioritized for microphone quality."}
          </div>
          <div className="mt-2 text-xs text-[var(--text-muted)]">
            Selected based on product specs, price, and your stated preference.
          </div>
          {/* Compare two products */}
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <div className="text-xs text-[var(--text-dim)] mb-2">Compare with:</div>
            <div className="flex flex-wrap gap-2">
              {filtered.filter((p) => p.name !== selected).map((p) => (
                <button
                  key={p.name}
                  onClick={() => setCompareWith(p.name)}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition ${
                    compareWith === p.name ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
            {cmpProduct && (
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div className="surface rounded-lg p-3">
                  <div className="font-medium text-[var(--text)]">{selProduct.name}</div>
                  <div className="text-[var(--accent)] font-mono mt-1">{selProduct.price}</div>
                  <div className="text-[var(--text-muted)] mt-1">{selProduct.specs}</div>
                </div>
                <div className="surface rounded-lg p-3">
                  <div className="font-medium text-[var(--text)]">{cmpProduct.name}</div>
                  <div className="text-[var(--accent)] font-mono mt-1">{cmpProduct.price}</div>
                  <div className="text-[var(--text-muted)] mt-1">{cmpProduct.specs}</div>
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
