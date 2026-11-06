"use client";

import { useEffect, useState } from "react";
import WorkflowGraph from "./shared/WorkflowGraph";
import { useExecution, Stage } from "./shared/useExecution";

type Scenario = "order" | "return" | "damaged" | "policy";

const scenarioData: Record<Scenario, { label: string; customer: string; stages: Stage[]; response: string; evidence: { source: string; detail: string }[] }> = {
  order: {
    label: "How does an order inquiry work?",
    customer: "Where is my order, and when should I expect it?",
    stages: [
      { id: "ticket", label: "Ticket received", desc: "Customer message parsed and ticket created.", kind: "ticket" },
      { id: "intent", label: "Intent detection", desc: "Classified as order_status inquiry.", kind: "intent" },
      { id: "order", label: "Order lookup", desc: "lookup_order(\"ORD-1002\") → delivered.", kind: "tool", tool: "lookup_order", input: '{ order_id: "ORD-1002" }', output: '{ status: "delivered", tracking: "FDX-78901234" }' },
      { id: "knowledge", label: "Knowledge retrieval", desc: "Retrieved order record and shipment details.", kind: "rag" },
      { id: "resolve", label: "Resolution", desc: "Responded with delivery status and tracking.", kind: "resolve" },
    ],
    response: "Your order ORD-1002 is delivered. Tracking: FDX-78901234.",
    evidence: [
      { source: "Order records", detail: "ORD-1002 · delivered · 3 days ago" },
      { source: "Shipment data", detail: "FedEx FDX-78901234 · delivered" },
    ],
  },
  return: {
    label: "How is a return request handled?",
    customer: "I received my order and would like to return it. The product is unused.",
    stages: [
      { id: "ticket", label: "Ticket received", desc: "Customer message parsed.", kind: "ticket" },
      { id: "intent", label: "Intent detection", desc: "Classified as return_request.", kind: "intent" },
      { id: "order", label: "Order retrieval", desc: "lookup_order(\"ORD-1002\") → delivered 3 days ago.", kind: "tool", tool: "lookup_order", input: '{ order_id: "ORD-1002" }', output: '{ status: "delivered", days: 3 }' },
      { id: "policy", label: "Policy retrieval", desc: "Retrieved return policy: 30-day window, unused.", kind: "rag" },
      { id: "eval", label: "Policy evaluation", desc: "Within window · unused · eligible. Refund: full amount.", kind: "decision" },
      { id: "resolve", label: "Resolution", desc: "Return approved. Label generated.", kind: "resolve" },
    ],
    response: "Your return for order ORD-1002 is approved. Refund: $129.99 to original payment method.",
    evidence: [
      { source: "Return policy", detail: "30-day window, unused items, original packaging" },
      { source: "Order records", detail: "ORD-1002 · delivered 3 days ago · $129.99" },
    ],
  },
  damaged: {
    label: "What happens with a damaged product?",
    customer: "My product arrived damaged, and I need someone to help me.",
    stages: [
      { id: "ticket", label: "Ticket received", desc: "Customer message parsed.", kind: "ticket" },
      { id: "intent", label: "Intent detection", desc: "Classified as damage_claim (sensitive).", kind: "intent" },
      { id: "order", label: "Order retrieval", desc: "lookup_order(\"ORD-1002\") → delivered.", kind: "tool", tool: "lookup_order", input: '{ order_id: "ORD-1002" }', output: '{ status: "delivered" }' },
      { id: "escalate", label: "Escalation check", desc: "Damage claim → routed to human support.", kind: "escalate" },
      { id: "handoff", label: "Human handoff", desc: "Ticket escalated with full context.", kind: "resolve" },
    ],
    response: "I've routed this to a specialist who will follow up shortly with your case.",
    evidence: [
      { source: "Damage claim", detail: "Requires human review of defect photo" },
      { source: "Order records", detail: "ORD-1002 · delivered" },
    ],
  },
  policy: {
    label: "How does the system answer policy questions?",
    customer: "Can you explain your return policy?",
    stages: [
      { id: "ticket", label: "Ticket received", desc: "Customer message parsed.", kind: "ticket" },
      { id: "intent", label: "Intent detection", desc: "Classified as policy_question.", kind: "intent" },
      { id: "search", label: "Knowledge search", desc: "Retrieved return policy document.", kind: "rag" },
      { id: "evidence", label: "Evidence display", desc: "Source: return_policy.md", kind: "rag" },
      { id: "resolve", label: "Answer generated", desc: "Responded with policy summary + source.", kind: "resolve" },
    ],
    response: "You can return unused items within 30 days in original packaging. Refunds go to your original payment method.",
    evidence: [
      { source: "Return policy", detail: "30-day window, unused, original packaging, refund to original payment" },
    ],
  },
};

export default function SupportShowcase() {
  const [scenario, setScenario] = useState<Scenario>("order");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const s = scenarioData[scenario];
  const exec = useExecution(s.stages);

  const handleScenario = (sc: Scenario) => {
    setScenario(sc);
    setSelectedNode(null);
    // auto-start
    setTimeout(() => exec.play(), 100);
  };

  // Auto-start on first render
  useEffect(() => {
    const t = setTimeout(() => exec.play(), 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="space-y-5">
      {/* Scenario selector (dynamic questions) */}
      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Explore a scenario</div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(scenarioData) as Scenario[]).map((k) => (
            <button
              key={k}
              onClick={() => handleScenario(k)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                scenario === k
                  ? "bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]"
              }`}
            >
              {scenarioData[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Conversation */}
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Customer conversation</div>
          <div className="space-y-3">
            <div className="flex justify-end">
              <div className="bg-[var(--accent)] text-[var(--bg)] px-4 py-2 rounded-2xl rounded-tr-sm text-sm max-w-[85%]">
                {s.customer}
              </div>
            </div>
            {exec.playback !== "idle" && exec.progress > 0.6 && (
              <div className="flex justify-start">
                <div className="bg-[var(--surface-2)] text-[var(--text)] px-4 py-2 rounded-2xl rounded-tl-sm text-sm max-w-[85%]">
                  {s.response}
                </div>
              </div>
            )}
            {exec.playback === "running" && exec.progress < 0.6 && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-2xl bg-[var(--surface-2)] text-[var(--text-dim)] text-sm">
                  <span className="animate-pulse">● ● ●</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Architecture */}
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Execution architecture</div>
          <WorkflowGraph
            nodes={s.stages.map((st) => ({ id: st.id, label: st.label }))}
            status={exec.status}
            activeId={exec.activeId}
            selectedId={selectedNode}
            onSelect={setSelectedNode}
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

      {/* Inspector */}
      {selectedNode && (() => {
        const st = s.stages.find((x) => x.id === selectedNode);
        if (!st) return null;
        return (
          <div className="surface rounded-2xl p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Node inspector</div>
            <div className="text-sm font-medium text-[var(--text)] mb-1">{st.label}</div>
            <div className="text-xs text-[var(--text-muted)] mb-3">{st.desc}</div>
            <div className="grid md:grid-cols-2 gap-4">
              {st.input && (
                <div>
                  <div className="text-xs text-[var(--text-dim)] mb-1">Input</div>
                  <pre className="text-xs font-mono text-[var(--accent-2)] bg-[var(--surface-2)] p-3 rounded-lg overflow-x-auto">{st.input}</pre>
                </div>
              )}
              {st.output && (
                <div>
                  <div className="text-xs text-[var(--text-dim)] mb-1">Output</div>
                  <pre className="text-xs font-mono text-[var(--accent)] bg-[var(--surface-2)] p-3 rounded-lg overflow-x-auto">{st.output}</pre>
                </div>
              )}
            </div>
            <div className="mt-3 text-xs">
              <span className="text-[var(--text-dim)]">Status: </span>
              <span className={exec.status[st.id] === "completed" ? "text-[var(--accent)]" : exec.status[st.id] === "active" ? "text-[var(--accent-2)]" : "text-[var(--text-dim)]"}>
                {exec.status[st.id]}
              </span>
            </div>
          </div>
        );
      })()}

      {/* Evidence */}
      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Evidence & resolution</div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-xs text-[var(--text-dim)] mb-1">Source</div>
            <div className="text-[var(--text)]">Store order records + return policy</div>
          </div>
          <div>
            <div className="text-xs text-[var(--text-dim)] mb-1">Outcome</div>
            <div className="text-[var(--accent)] font-medium">
              {scenario === "damaged" ? "Escalated to human" : scenario === "return" ? "Return approved" : scenario === "policy" ? "Policy explained" : "Status provided"}
            </div>
          </div>
          <div>
            <div className="text-xs text-[var(--text-dim)] mb-1">Confidence</div>
            <div className="text-[var(--text)]">{scenario === "damaged" ? "Low → escalate" : "High → auto-resolve"}</div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {s.evidence.map((e, i) => (
            <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono border border-[var(--border)] text-[var(--text-muted)]">
              {e.source}: {e.detail}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs text-[var(--text-dim)]">
        Interactive demonstration using seeded demo data. Actual behavior depends on store configuration.
      </p>
    </div>
  );
}
