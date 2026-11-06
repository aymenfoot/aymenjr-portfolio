"use client";

import { useEffect, useState } from "react";

type Step = { kind: "user" | "tool" | "ai" | "note"; text: string; delay: number };

const sequence: Step[] = [
  { kind: "user", text: "Can you check order #1042 and tell me if it's eligible for a return?", delay: 700 },
  { kind: "tool", text: "lookup_order(\"ORD-1042\") ✓", delay: 900 },
  { kind: "tool", text: "check_return_eligibility(\"ORD-1042\") ✓", delay: 900 },
  { kind: "ai", text: "Order #1042 is eligible for return.", delay: 1000 },
  { kind: "ai", text: "Return window: 14 days remaining · Reason: unused, within policy.", delay: 600 },
  { kind: "note", text: "Evaluated against store return policy.", delay: 2200 },
];

export default function OrderDemo() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timerIds: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setSteps([]);
      setTyping(false);
      let t = 400;
      sequence.forEach((s) => {
        t += s.delay;
        const timer = setTimeout(() => {
          if (cancelled) return;
          if (s.kind === "ai") setTyping(true);
          setSteps((prev) => [...prev, s]);
          if (s.kind === "ai") setTyping(false);
        }, t);
        timerIds.push(timer);
      });
      const reset = setTimeout(() => {
        if (cancelled) return;
        run();
      }, t + 3000);
      timerIds.push(reset);
    };

    run();
    return () => {
      cancelled = true;
      timerIds.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="surface rounded-2xl overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]">
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="text-xs font-mono text-[var(--text-dim)]">nexa-order · agent</span>
      </div>
      <div className="p-5 space-y-2.5 min-h-[260px]">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 p-3 rounded-xl border text-sm ${
              s.kind === "user"
                ? "justify-end bg-[var(--accent)]/10 border-[var(--accent)]/30"
                : s.kind === "tool"
                ? "bg-[var(--surface-2)] border-[var(--border)]"
                : s.kind === "note"
                ? "bg-transparent border-dashed border-[var(--border)]"
                : "bg-[var(--surface-2)] border-[var(--border)]"
            }`}
          >
            {s.kind === "tool" && (
              <span className="text-[var(--accent-2)] font-mono text-xs w-16 shrink-0 pt-0.5">Tool</span>
            )}
            {s.kind === "ai" && (
              <span className="text-[var(--accent)] font-mono text-xs w-16 shrink-0 pt-0.5">Agent</span>
            )}
            {s.kind === "note" && (
              <span className="text-[var(--text-dim)] font-mono text-xs w-16 shrink-0 pt-0.5">Note</span>
            )}
            <span className={`${s.kind === "user" ? "text-[var(--text)]" : "text-[var(--text-muted)]"} ${s.kind === "tool" ? "font-mono text-xs" : ""}`}>
              {s.text}
            </span>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="px-3.5 py-2 rounded-2xl bg-[var(--surface-2)] text-[var(--text-dim)] text-sm">
              <span className="animate-pulse">● ● ●</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
