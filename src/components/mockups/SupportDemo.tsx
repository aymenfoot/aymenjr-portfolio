"use client";

import { useEffect, useState } from "react";

type Msg = { from: "user" | "ai" | "tool"; text: string };

const sequence: { delay: number; msgs: Msg[] }[] = [
  { delay: 600, msgs: [{ from: "user", text: "Where is my order?" }] },
  { delay: 900, msgs: [{ from: "tool", text: "lookup_order(\"ORD-1002\") ✓" }] },
  {
    delay: 1100,
    msgs: [
      {
        from: "ai",
        text: "Your order ORD-1002 is delivered. Tracking: FDX-78901234.",
      },
    ],
  },
  {
    delay: 2600,
    msgs: [
      {
        from: "ai",
        text: "Based on your store's order records.",
      },
    ],
  },
];

export default function SupportDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setMsgs([]);
      setTyping(false);
      let t = 400;
      sequence.forEach((s, idx) => {
        t += s.delay;
        const timer = setTimeout(() => {
          if (cancelled) return;
          if (idx === 1) setTyping(true);
          setMsgs((prev) => [...prev, ...s.msgs]);
          if (idx === 2) setTyping(false);
        }, t);
        timers.push(timer);
      });
      const reset = setTimeout(() => {
        if (cancelled) return;
        run();
      }, t + 2800);
      timers.push(reset);
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="surface rounded-2xl overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]">
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="text-xs font-mono text-[var(--text-dim)]">nexa-support · live</span>
      </div>
      <div className="p-5 space-y-3 min-h-[230px]">
        {msgs.map((m, idx) => (
          <div key={idx} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm ${
                m.from === "user"
                  ? "bg-[var(--accent)] text-[var(--bg)]"
                  : m.from === "tool"
                  ? "bg-[var(--surface-2)] text-[var(--accent-2)] font-mono text-xs border border-[var(--border)]"
                  : "bg-[var(--surface-2)] text-[var(--text)]"
              }`}
            >
              {m.text}
              {m.from === "ai" && m.text.includes("delivered") && (
                <div className="mt-2 pt-2 border-t border-[var(--border)] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] font-mono">ORD-1002</span>
                    <span className="text-[var(--text-muted)]">Delivered · FDX-78901234</span>
                  </div>
                </div>
              )}
            </div>
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
