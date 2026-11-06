"use client";

import { useState } from "react";

type Scenario = "order" | "return" | "damaged" | "policy";

const scenarios: Record<Scenario, { label: string; customer: string; steps: { title: string; body: string; kind: string }[] }> = {
  order: {
    label: "Order inquiry",
    customer: "Where is my order, and when should I expect it?",
    steps: [
      { title: "Incoming ticket", body: "Customer message received and parsed.", kind: "ticket" },
      { title: "Intent detection", body: "Classified as order_status inquiry.", kind: "intent" },
      { title: "Order lookup", body: "lookup_order(\"ORD-1002\") → delivered, tracking FDX-78901234.", kind: "tool" },
      { title: "Knowledge retrieval", body: "Retrieved order record and shipment details from store data.", kind: "rag" },
      { title: "Resolution", body: "Responded with delivery status and tracking link.", kind: "resolve" },
    ],
  },
  return: {
    label: "Return request",
    customer: "I received my order and would like to return it. The product is unused.",
    steps: [
      { title: "Incoming ticket", body: "Customer message received and parsed.", kind: "ticket" },
      { title: "Intent detection", body: "Classified as return_request.", kind: "intent" },
      { title: "Order retrieval", body: "lookup_order(\"ORD-1002\") → delivered 3 days ago.", kind: "tool" },
      { title: "Policy retrieval", body: "Retrieved return policy: 30-day window, unused, original packaging.", kind: "rag" },
      { title: "Policy evaluation", body: "Within window · unused · eligible. Refund: full amount.", kind: "decision" },
      { title: "Resolution", body: "Return approved. Return label generated.", kind: "resolve" },
    ],
  },
  damaged: {
    label: "Damaged product",
    customer: "My product arrived damaged, and I need someone to help me.",
    steps: [
      { title: "Incoming ticket", body: "Customer message received and parsed.", kind: "ticket" },
      { title: "Intent detection", body: "Classified as damage_claim (sensitive).", kind: "intent" },
      { title: "Order retrieval", body: "lookup_order(\"ORD-1002\") → delivered.", kind: "tool" },
      { title: "Escalation check", body: "Damage claim detected → routed to human support.", kind: "escalate" },
      { title: "Human handoff", body: "Ticket escalated with full context and evidence.", kind: "resolve" },
    ],
  },
  policy: {
    label: "Policy question",
    customer: "Can you explain your return policy?",
    steps: [
      { title: "Incoming ticket", body: "Customer message received and parsed.", kind: "ticket" },
      { title: "Intent detection", body: "Classified as policy_question.", kind: "intent" },
      { title: "Knowledge search", body: "Retrieved return policy document.", kind: "rag" },
      { title: "Evidence display", body: "Source: return_policy.md — 30-day window, unused, original packaging.", kind: "rag" },
      { title: "Answer generated", body: "Responded with policy summary and source reference.", kind: "resolve" },
    ],
  },
};

export default function SupportShowcase() {
  const [scenario, setScenario] = useState<Scenario>("order");
  const [step, setStep] = useState(0);
  const s = scenarios[scenario];

  const next = () => setStep((v) => Math.min(v + 1, s.steps.length - 1));
  const prev = () => setStep((v) => Math.max(v - 1, 0));
  const reset = (sc: Scenario) => { setScenario(sc); setStep(0); };

  const outcome = scenario === "damaged" ? "Escalated to human" : scenario === "return" ? "Return approved" : scenario === "policy" ? "Policy explained" : "Status provided";
  const confidence = scenario === "damaged" ? "Low → escalate" : "High → auto-resolve";

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(scenarios) as Scenario[]).map((k) => (
          <button
            key={k}
            onClick={() => reset(k)}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              scenario === k
                ? "bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]"
                : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]"
            }`}
          >
            {scenarios[k].label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Incoming ticket</div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-xs font-mono">CU</div>
            <div className="flex-1">
              <div className="text-sm font-medium text-[var(--text)]">Customer</div>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{s.customer}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <div className="text-xs font-mono text-[var(--text-dim)]">Ticket context</div>
            <div className="mt-2 text-xs text-[var(--text-muted)]">Order ORD-1002 · delivered · within 30-day return window</div>
          </div>
        </div>

        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Processing pipeline</div>
          <div className="space-y-2">
            {s.steps.map((st, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg border transition ${
                  i <= step
                    ? "border-[var(--accent)]/40 bg-[var(--accent)]/5"
                    : "border-[var(--border)] bg-transparent opacity-40"
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0 ${
                  i <= step ? "bg-[var(--accent)] text-[var(--bg)]" : "bg-[var(--surface-2)] text-[var(--text-dim)]"
                }`}>
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[var(--text)]">{st.title}</div>
                  {i <= step && <div className="text-xs text-[var(--text-muted)] mt-0.5">{st.body}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={prev} disabled={step === 0} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] disabled:opacity-40 hover:border-[var(--accent)] transition">Prev</button>
            <button onClick={next} disabled={step === s.steps.length - 1} className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--bg)] text-xs font-medium disabled:opacity-40 hover:opacity-90 transition">Next</button>
            <button onClick={() => setStep(0)} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-[var(--accent)] transition">Reset</button>
          </div>
        </div>
      </div>

      <div className="surface rounded-2xl p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-3">Evidence & resolution</div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-xs text-[var(--text-dim)] mb-1">Source</div>
            <div className="text-[var(--text)]">Store order records + return policy</div>
          </div>
          <div>
            <div className="text-xs text-[var(--text-dim)] mb-1">Outcome</div>
            <div className="text-[var(--accent)] font-medium">{outcome}</div>
          </div>
          <div>
            <div className="text-xs text-[var(--text-dim)] mb-1">Confidence</div>
            <div className="text-[var(--text)]">{confidence}</div>
          </div>
        </div>
      </div>

      <p className="text-xs text-[var(--text-dim)]">
        Interactive demonstration using seeded demo data. Actual behavior depends on store configuration and data.
      </p>
    </div>
  );
}
