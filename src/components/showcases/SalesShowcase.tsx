"use client";

import { useState } from "react";

const products = [
  { name: "Echo Pro", price: "$79", tag: "Best for calls", specs: "40h battery · ENC mic · BT 5.3" },
  { name: "AirBeat", price: "$89", tag: "Lightweight", specs: "24h battery · ENC mic · BT 5.2" },
  { name: "Sonic X", price: "$95", tag: "Versatile", specs: "30h battery · ENC mic · BT 5.3" },
];

type Step = "idle" | "search" | "compare" | "recommend";

export default function SalesShowcase() {
  const [budget, setBudget] = useState(100);
  const [pref, setPref] = useState("calls");
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("idle");

  const filtered = products.filter((p) => parseInt(p.price.replace("$", "")) <= budget);

  const run = () => setStep("search");
  const compare = (name: string) => { setSelected(name); setStep("compare"); };
  const reset = () => { setStep("idle"); setSelected(null); };

  return (
    <div className="space-y-6">
      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Shopping request</div>
        <p className="text-sm text-[var(--text)]">
          &quot;I&apos;m looking for a wireless headset under ${budget} for {pref === "calls" ? "long business calls" : "general use"}.&quot;
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-[var(--text-dim)]">Budget</label>
            <input
              type="range" min={60} max={120} value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-32 accent-[var(--accent)]"
            />
            <span className="text-xs font-mono text-[var(--accent)]">${budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-[var(--text-dim)]">Preference</label>
            <select
              value={pref}
              onChange={(e) => setPref(e.target.value)}
              className="bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-2 py-1 text-xs text-[var(--text)]"
            >
              <option value="calls">Long calls</option>
              <option value="general">General use</option>
            </select>
          </div>
          <button onClick={run} className="px-4 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--bg)] text-xs font-medium hover:opacity-90 transition">
            Search
          </button>
          <button onClick={reset} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-[var(--accent)] transition">Reset</button>
        </div>
      </div>

      {step !== "idle" && (
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Product discovery</div>
          <div className="text-xs text-[var(--text-muted)] mb-4">
            {step === "search" && "Searching catalog… filtering by budget and preference."}
            {step === "compare" && `Comparing ${selected} against alternatives.`}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {filtered.map((p) => (
              <button
                key={p.name}
                onClick={() => compare(p.name)}
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

      {step === "compare" && selected && (
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Recommendation</div>
          <div className="text-sm text-[var(--text)]">
            <span className="text-[var(--accent)] font-medium">{selected}</span> — best match for {pref === "calls" ? "long business calls" : "general use"} under ${budget}.
          </div>
          <div className="mt-2 text-xs text-[var(--text-muted)]">
            Selected based on product specs, price, and your stated preference.
          </div>
        </div>
      )}

      <p className="text-xs text-[var(--text-dim)]">
        Interactive demonstration using seeded demo catalog. Actual behavior depends on store configuration.
      </p>
    </div>
  );
}
