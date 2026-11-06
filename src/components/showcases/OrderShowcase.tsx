"use client";

import { useState } from "react";

const nodes = [
  { id: "receive", label: "Receive request", tool: null, desc: "Parse incoming user message." },
  { id: "lookup", label: "lookup_order", tool: "lookup_order", desc: "Fetch order ORD-1042 from store data." },
  { id: "ship", label: "track_shipment", tool: "track_shipment", desc: "Retrieve shipment events for the order." },
  { id: "policy", label: "return_policy", tool: "return_policy", desc: "Load store return policy." },
  { id: "elig", label: "check_return_eligibility", tool: "check_return_eligibility", desc: "Evaluate eligibility against policy." },
  { id: "init", label: "initiate_return", tool: "initiate_return", desc: "Create return request if eligible." },
  { id: "result", label: "Final result", tool: null, desc: "Structured response to user." },
];

const toolData: Record<string, { input: string; output: string }> = {
  lookup_order: { input: '{ order_id: "ORD-1042" }', output: '{ status: "delivered", days_since_delivery: 5 }' },
  track_shipment: { input: '{ order_id: "ORD-1042" }', output: '{ carrier: "FedEx", events: 3, last: "delivered" }' },
  return_policy: { input: '{ store_id: "default" }', output: '{ window_days: 30, condition: "unused" }' },
  check_return_eligibility: { input: '{ order_id: "ORD-1042" }', output: '{ eligible: true, days_remaining: 25 }' },
  initiate_return: { input: '{ order_id: "ORD-1042" }', output: '{ return_id: "RET-778", status: "initiated" }' },
};

export default function OrderShowcase() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const next = () => setStep((v) => Math.min(v + 1, nodes.length - 1));
  const prev = () => setStep((v) => Math.max(v - 1, 0));
  const reset = () => { setStep(0); setSelected(null); };

  const sel = selected ? nodes.find((n) => n.id === selected) : null;
  const selTool = sel?.tool ? toolData[sel.tool] : null;

  return (
    <div className="space-y-6">
      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Incoming request</div>
        <p className="text-sm text-[var(--text)]">
          &quot;Please check order #1042, track its shipment, and determine whether it is eligible for a return. If eligible, show the return initiation step.&quot;
        </p>
      </div>

      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-4">Agent execution graph</div>
        <div className="flex flex-wrap items-center gap-2">
          {nodes.map((n, i) => (
            <div key={n.id} className="flex items-center gap-2">
              <button
                onClick={() => setSelected(n.id)}
                className={`px-3 py-2 rounded-lg border text-xs font-mono transition ${
                  i <= step
                    ? i === step
                      ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                      : "border-[var(--accent)]/40 bg-[var(--accent)]/5 text-[var(--text)]"
                    : "border-[var(--border)] text-[var(--text-dim)] opacity-50"
                }`}
              >
                {n.tool ? `⚙ ${n.label}` : n.label}
              </button>
              {i < nodes.length - 1 && (
                <span className={`text-xs ${i < step ? "text-[var(--accent)]" : "text-[var(--text-dim)]"}`}>→</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={prev} disabled={step === 0} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] disabled:opacity-40 hover:border-[var(--accent)] transition">Prev</button>
          <button onClick={next} disabled={step === nodes.length - 1} className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--bg)] text-xs font-medium disabled:opacity-40 hover:opacity-90 transition">Next</button>
          <button onClick={reset} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-[var(--accent)] transition">Reset</button>
        </div>
      </div>

      {/* Selected node detail */}
      {sel && (
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Node detail</div>
          <div className="text-sm font-medium text-[var(--text)] mb-2">{sel.label}</div>
          <div className="text-xs text-[var(--text-muted)] mb-4">{sel.desc}</div>
          {selTool && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-[var(--text-dim)] mb-1">Input</div>
                <pre className="text-xs font-mono text-[var(--accent-2)] bg-[var(--surface-2)] p-3 rounded-lg overflow-x-auto">{selTool.input}</pre>
              </div>
              <div>
                <div className="text-xs text-[var(--text-dim)] mb-1">Output</div>
                <pre className="text-xs font-mono text-[var(--accent)] bg-[var(--surface-2)] p-3 rounded-lg overflow-x-auto">{selTool.output}</pre>
              </div>
            </div>
          )}
          {!selTool && <div className="text-xs text-[var(--text-muted)]">Non-tool node — orchestration step.</div>}
        </div>
      )}

      {/* Execution trace */}
      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Execution trace</div>
        <div className="space-y-1.5">
          {nodes.slice(0, step + 1).map((n, i) => (
            <div key={n.id} className="flex items-center gap-3 text-xs">
              <span className="w-5 h-5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-mono">{i + 1}</span>
              <span className="font-mono text-[var(--text)]">{n.label}</span>
              <span className="text-[var(--text-dim)]">→</span>
              <span className="text-[var(--text-muted)] truncate">{n.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-[var(--text-dim)]">
        Interactive demonstration based on the project&apos;s LangGraph ReAct agent with 7 tools. Uses seeded demo data.
      </p>
    </div>
  );
}
