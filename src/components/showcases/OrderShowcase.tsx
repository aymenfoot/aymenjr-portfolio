"use client";

import { useState } from "react";

type Scenario = "investigate" | "tracking" | "eligibility" | "retry" | "combined";

const scenarios: Record<Scenario, { label: string; request: string; nodes: { id: string; label: string; tool: string | null; desc: string; input?: string; output?: string }[] }> = {
  investigate: {
    label: "Order investigation",
    request: "Please investigate order #1042 and show me its current status.",
    nodes: [
      { id: "receive", label: "Receive request", tool: null, desc: "Parse incoming user message." },
      { id: "lookup", label: "lookup_order", tool: "lookup_order", desc: "Fetch order ORD-1042 from store data.", input: '{ order_id: "ORD-1042" }', output: '{ status: "delivered", days_since_delivery: 5 }' },
      { id: "result", label: "Final result", tool: null, desc: "Structured response to user." },
    ],
  },
  tracking: {
    label: "Shipment tracking",
    request: "Track the shipment for my order and tell me its current delivery status.",
    nodes: [
      { id: "receive", label: "Receive request", tool: null, desc: "Parse incoming user message." },
      { id: "lookup", label: "lookup_order", tool: "lookup_order", desc: "Fetch order ORD-1042.", input: '{ order_id: "ORD-1042" }', output: '{ status: "delivered" }' },
      { id: "ship", label: "track_shipment", tool: "track_shipment", desc: "Retrieve shipment events.", input: '{ order_id: "ORD-1042" }', output: '{ carrier: "FedEx", events: 3, last: "delivered" }' },
      { id: "result", label: "Final result", tool: null, desc: "Structured response to user." },
    ],
  },
  eligibility: {
    label: "Return eligibility",
    request: "Check whether order #1042 is eligible for a return.",
    nodes: [
      { id: "receive", label: "Receive request", tool: null, desc: "Parse incoming user message." },
      { id: "lookup", label: "lookup_order", tool: "lookup_order", desc: "Fetch order ORD-1042.", input: '{ order_id: "ORD-1042" }', output: '{ status: "delivered", days: 5 }' },
      { id: "policy", label: "return_policy", tool: "return_policy", desc: "Load store return policy.", input: '{ store_id: "default" }', output: '{ window_days: 30, condition: "unused" }' },
      { id: "elig", label: "check_return_eligibility", tool: "check_return_eligibility", desc: "Evaluate eligibility.", input: '{ order_id: "ORD-1042" }', output: '{ eligible: true, days_remaining: 25 }' },
      { id: "result", label: "Final result", tool: null, desc: "Structured response to user." },
    ],
  },
  retry: {
    label: "Retry recovery",
    request: "Check order #1042 status (simulated tool failure + retry).",
    nodes: [
      { id: "receive", label: "Receive request", tool: null, desc: "Parse incoming user message." },
      { id: "lookup", label: "lookup_order", tool: "lookup_order", desc: "Fetch order ORD-1042 (attempt 1 fails).", input: '{ order_id: "ORD-1042" }', output: '{ error: "timeout" }' },
      { id: "retry", label: "Retry", tool: null, desc: "Error detected → retry initiated.", input: "", output: "" },
      { id: "lookup2", label: "lookup_order", tool: "lookup_order", desc: "Fetch order ORD-1042 (attempt 2 succeeds).", input: '{ order_id: "ORD-1042" }', output: '{ status: "delivered" }' },
      { id: "result", label: "Final result", tool: null, desc: "Structured response to user." },
    ],
  },
  combined: {
    label: "Combined task",
    request: "Check order #1042, track its shipment, and determine whether it is eligible for a return. If eligible, show the return initiation step.",
    nodes: [
      { id: "receive", label: "Receive request", tool: null, desc: "Parse incoming user message." },
      { id: "lookup", label: "lookup_order", tool: "lookup_order", desc: "Fetch order ORD-1042.", input: '{ order_id: "ORD-1042" }', output: '{ status: "delivered", days: 5 }' },
      { id: "ship", label: "track_shipment", tool: "track_shipment", desc: "Retrieve shipment events.", input: '{ order_id: "ORD-1042" }', output: '{ carrier: "FedEx", events: 3 }' },
      { id: "policy", label: "return_policy", tool: "return_policy", desc: "Load store return policy.", input: '{ store_id: "default" }', output: '{ window_days: 30 }' },
      { id: "elig", label: "check_return_eligibility", tool: "check_return_eligibility", desc: "Evaluate eligibility.", input: '{ order_id: "ORD-1042" }', output: '{ eligible: true, days_remaining: 25 }' },
      { id: "init", label: "initiate_return", tool: "initiate_return", desc: "Create return request (eligible).", input: '{ order_id: "ORD-1042" }', output: '{ return_id: "RET-778", status: "initiated" }' },
      { id: "result", label: "Final result", tool: null, desc: "Structured response to user." },
    ],
  },
};

export default function OrderShowcase() {
  const [scenario, setScenario] = useState<Scenario>("investigate");
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const s = scenarios[scenario];

  const next = () => setStep((v) => Math.min(v + 1, s.nodes.length - 1));
  const prev = () => setStep((v) => Math.max(v - 1, 0));
  const reset = (sc: Scenario) => { setScenario(sc); setStep(0); setSelected(null); };

  const sel = selected ? s.nodes.find((n) => n.id === selected) : null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(scenarios) as Scenario[]).map((k) => (
          <button
            key={k}
            onClick={() => reset(k)}
            className={`px-3 py-1.5 rounded-full text-xs border transition ${
              scenario === k
                ? "bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]"
                : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]"
            }`}
          >
            {scenarios[k].label}
          </button>
        ))}
      </div>

      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-2">Incoming request</div>
        <p className="text-sm text-[var(--text)]">{s.request}</p>
      </div>

      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-4">Agent execution graph</div>
        <div className="flex flex-wrap items-center gap-2">
          {s.nodes.map((n, i) => (
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
              {i < s.nodes.length - 1 && (
                <span className={`text-xs ${i < step ? "text-[var(--accent)]" : "text-[var(--text-dim)]"}`}>→</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={prev} disabled={step === 0} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] disabled:opacity-40 hover:border-[var(--accent)] transition">Prev</button>
          <button onClick={next} disabled={step === s.nodes.length - 1} className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--bg)] text-xs font-medium disabled:opacity-40 hover:opacity-90 transition">Next</button>
          <button onClick={() => { setStep(0); setSelected(null); }} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-[var(--accent)] transition">Reset</button>
        </div>
      </div>

      {sel && (
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Node detail</div>
          <div className="text-sm font-medium text-[var(--text)] mb-1">{sel.label}</div>
          <div className="text-xs text-[var(--text-muted)] mb-4">{sel.desc}</div>
          {sel.tool && sel.input && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-[var(--text-dim)] mb-1">Input</div>
                <pre className="text-xs font-mono text-[var(--accent-2)] bg-[var(--surface-2)] p-3 rounded-lg overflow-x-auto">{sel.input}</pre>
              </div>
              <div>
                <div className="text-xs text-[var(--text-dim)] mb-1">Output</div>
                <pre className="text-xs font-mono text-[var(--accent)] bg-[var(--surface-2)] p-3 rounded-lg overflow-x-auto">{sel.output}</pre>
              </div>
            </div>
          )}
          {!sel.tool && <div className="text-xs text-[var(--text-muted)]">Non-tool node — orchestration step.</div>}
        </div>
      )}

      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Execution trace</div>
        <div className="space-y-1.5">
          {s.nodes.slice(0, step + 1).map((n, i) => (
            <div key={n.id} className="flex items-center gap-3 text-xs">
              <span className="w-5 h-5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-mono shrink-0">{i + 1}</span>
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
