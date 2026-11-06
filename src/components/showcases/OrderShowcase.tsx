"use client";

import { useEffect, useState } from "react";
import WorkflowGraph from "./shared/WorkflowGraph";
import { useExecution, Stage } from "./shared/useExecution";

type Scenario = "investigate" | "tracking" | "eligibility" | "retry" | "combined";

const scenarios: Record<Scenario, { label: string; question: string; stages: Stage[] }> = {
  investigate: {
    label: "How does order investigation work?",
    question: "Please investigate order #1042 and show me its current status.",
    stages: [
      { id: "receive", label: "Receive request", desc: "Parse incoming user message.", kind: "request" },
      { id: "lookup", label: "lookup_order", desc: "Fetch order ORD-1042 from store data.", kind: "tool", tool: "lookup_order", input: '{ order_id: "ORD-1042" }', output: '{ status: "delivered", days_since_delivery: 5 }' },
      { id: "result", label: "Final result", desc: "Structured response to user.", kind: "result" },
    ],
  },
  tracking: {
    label: "How is shipment tracking performed?",
    question: "Track the shipment for my order and tell me its current delivery status.",
    stages: [
      { id: "receive", label: "Receive request", desc: "Parse incoming user message.", kind: "request" },
      { id: "lookup", label: "lookup_order", desc: "Fetch order ORD-1042.", kind: "tool", tool: "lookup_order", input: '{ order_id: "ORD-1042" }', output: '{ status: "delivered" }' },
      { id: "ship", label: "track_shipment", desc: "Retrieve shipment events.", kind: "tool", tool: "track_shipment", input: '{ order_id: "ORD-1042" }', output: '{ carrier: "FedEx", events: 3, last: "delivered" }' },
      { id: "result", label: "Final result", desc: "Structured response to user.", kind: "result" },
    ],
  },
  eligibility: {
    label: "How is return eligibility checked?",
    question: "Check whether order #1042 is eligible for a return.",
    stages: [
      { id: "receive", label: "Receive request", desc: "Parse incoming user message.", kind: "request" },
      { id: "lookup", label: "lookup_order", desc: "Fetch order ORD-1042.", kind: "tool", tool: "lookup_order", input: '{ order_id: "ORD-1042" }', output: '{ status: "delivered", days: 5 }' },
      { id: "policy", label: "return_policy", desc: "Load store return policy.", kind: "tool", tool: "return_policy", input: '{ store_id: "default" }', output: '{ window_days: 30, condition: "unused" }' },
      { id: "elig", label: "check_return_eligibility", desc: "Evaluate eligibility.", kind: "tool", tool: "check_return_eligibility", input: '{ order_id: "ORD-1042" }', output: '{ eligible: true, days_remaining: 25 }' },
      { id: "result", label: "Final result", desc: "Structured response to user.", kind: "result" },
    ],
  },
  retry: {
    label: "What happens when a tool fails?",
    question: "Check order #1042 status (simulated tool failure + retry).",
    stages: [
      { id: "receive", label: "Receive request", desc: "Parse incoming user message.", kind: "request" },
      { id: "lookup", label: "lookup_order", desc: "Fetch order ORD-1042 (attempt 1 fails).", kind: "tool", tool: "lookup_order", input: '{ order_id: "ORD-1042" }', output: '{ error: "timeout" }' },
      { id: "retry", label: "Retry", desc: "Error detected → retry initiated.", kind: "retry" },
      { id: "lookup2", label: "lookup_order", desc: "Fetch order ORD-1042 (attempt 2 succeeds).", kind: "tool", tool: "lookup_order", input: '{ order_id: "ORD-1042" }', output: '{ status: "delivered" }' },
      { id: "result", label: "Final result", desc: "Structured response to user.", kind: "result" },
    ],
  },
  combined: {
    label: "How does a multi-step task execute?",
    question: "Check order #1042, track its shipment, and determine whether it is eligible for a return. If eligible, show the return initiation step.",
    stages: [
      { id: "receive", label: "Receive request", desc: "Parse incoming user message.", kind: "request" },
      { id: "lookup", label: "lookup_order", desc: "Fetch order ORD-1042.", kind: "tool", tool: "lookup_order", input: '{ order_id: "ORD-1042" }', output: '{ status: "delivered", days: 5 }' },
      { id: "ship", label: "track_shipment", desc: "Retrieve shipment events.", kind: "tool", tool: "track_shipment", input: '{ order_id: "ORD-1042" }', output: '{ carrier: "FedEx", events: 3 }' },
      { id: "policy", label: "return_policy", desc: "Load store return policy.", kind: "tool", tool: "return_policy", input: '{ store_id: "default" }', output: '{ window_days: 30 }' },
      { id: "elig", label: "check_return_eligibility", desc: "Evaluate eligibility.", kind: "tool", tool: "check_return_eligibility", input: '{ order_id: "ORD-1042" }', output: '{ eligible: true, days_remaining: 25 }' },
      { id: "init", label: "initiate_return", desc: "Create return request (eligible).", kind: "tool", tool: "initiate_return", input: '{ order_id: "ORD-1042" }', output: '{ return_id: "RET-778", status: "initiated" }' },
      { id: "result", label: "Final result", desc: "Structured response to user.", kind: "result" },
    ],
  },
};

const toolData: Record<string, { desc: string }> = {
  lookup_order: { desc: "Look up an order by ID. Returns items, status, total, tracking." },
  track_shipment: { desc: "Track a shipment by tracking number. Returns status and event history." },
  return_policy: { desc: "Get the store's return and refund policy." },
  check_return_eligibility: { desc: "Check if an order is eligible for return." },
  initiate_return: { desc: "Start a return for an order. Requires order_id and reason." },
};

export default function OrderShowcase() {
  const [scenario, setScenario] = useState<Scenario>("investigate");
  const [selected, setSelected] = useState<string | null>(null);
  const s = scenarios[scenario];
  const exec = useExecution(s.stages);

  const handleScenario = (sc: Scenario) => {
    setScenario(sc);
    setSelected(null);
    setTimeout(() => exec.play(), 100);
  };

  useEffect(() => {
    const t = setTimeout(() => exec.play(), 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sel = selected ? s.stages.find((n) => n.id === selected) : null;

  return (
    <div className="space-y-5">
      {/* Scenario selector */}
      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Explore an operation</div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(scenarios) as Scenario[]).map((k) => (
            <button
              key={k}
              onClick={() => handleScenario(k)}
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
      </div>

      {/* Request + Conversation */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Incoming request</div>
          <p className="text-sm text-[var(--text)]">{s.question}</p>
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <div className="text-xs font-mono text-[var(--text-dim)] mb-2">Agent response</div>
            {exec.playback === "completed" ? (
              <div className="text-sm text-[var(--text-muted)]">
                {scenario === "combined"
                  ? "Order ORD-1002 is delivered. Shipment: FedEx, 3 events. Return eligible (25 days remaining). Return initiated: RET-778."
                  : scenario === "eligibility"
                  ? "Order #1042 is eligible for return (25 days remaining in the 30-day window)."
                  : scenario === "tracking"
                  ? "Your package was delivered via FedEx. 3 tracking events recorded."
                  : scenario === "retry"
                  ? "Order #1042 is delivered (recovered after retry)."
                  : "Order #1042 is delivered."}
              </div>
            ) : (
              <div className="text-xs text-[var(--text-dim)]">
                {exec.playback === "running" ? "Processing…" : "Awaiting execution."}
              </div>
            )}
          </div>
        </div>

        {/* Architecture graph */}
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Agent execution graph</div>
          <WorkflowGraph
            nodes={s.stages.map((st) => ({ id: st.id, label: st.label }))}
            status={exec.status}
            activeId={exec.activeId}
            selectedId={selected}
            onSelect={setSelected}
          />
          <div className="mt-4 flex gap-2">
            {exec.playback === "idle" || exec.playback === "paused" ? (
              <button onClick={exec.playback === "paused" ? exec.resume : exec.play} className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--bg)] text-xs font-medium hover:opacity-90 transition">
                {exec.playback === "paused" ? "Resume" : "Play"}
              </button>
            ) : exec.playback === "running" ? (
              <button onClick={exec.pause} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-[var(--accent)] transition">Pause</button>
            ) : null}
            <button onClick={exec.restart} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-[var(--accent)] transition">Restart</button>
            <button onClick={exec.stepForward} disabled={exec.playback === "completed"} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] disabled:opacity-40 hover:border-[var(--accent)] transition">Step</button>
          </div>
          <div className="mt-3 h-1 rounded-full bg-[var(--surface-2)] overflow-hidden">
            <div className="h-full bg-[var(--accent)] transition-all duration-300" style={{ width: `${exec.progress * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Node inspector */}
      {sel && (
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Node inspector</div>
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
          {sel.tool && toolData[sel.tool] && (
            <div className="mt-3 text-xs text-[var(--text-muted)]">{toolData[sel.tool].desc}</div>
          )}
          {!sel.tool && <div className="text-xs text-[var(--text-muted)]">Non-tool node — orchestration step.</div>}
          <div className="mt-3 text-xs">
            <span className="text-[var(--text-dim)]">Status: </span>
            <span className={exec.status[sel.id] === "completed" ? "text-[var(--accent)]" : exec.status[sel.id] === "active" ? "text-[var(--accent-2)]" : "text-[var(--text-dim)]"}>
              {exec.status[sel.id]}
            </span>
          </div>
        </div>
      )}

      {/* Execution trace */}
      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Execution trace</div>
        <div className="space-y-1.5">
          {s.stages.slice(0, exec.progress === 1 ? s.stages.length : Math.ceil(exec.progress * s.stages.length)).map((n: {id:string;label:string;desc:string}, i: number) => (
            <div key={n.id} className="flex items-center gap-3 text-xs">
              <span className="w-5 h-5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-mono shrink-0">{i + 1}</span>
              <span className="font-mono text-[var(--text)]">{n.label}</span>
              <span className="text-[var(--text-dim)]">→</span>
              <span className="text-[var(--text-muted)] truncate">{n.desc}</span>
            </div>
          ))}
          {exec.progress === 0 && <div className="text-xs text-[var(--text-dim)]">Select an operation and press Play to begin.</div>}
        </div>
      </div>

      <p className="text-xs text-[var(--text-dim)]">
        Interactive demonstration based on the project&apos;s LangGraph ReAct agent with 7 tools. Uses seeded demo data.
      </p>
    </div>
  );
}
