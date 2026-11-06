"use client";

import { useEffect, useState } from "react";

type Step = { kind: "user" | "ai" | "products" | "note"; text?: string; delay: number };

const sequence: Step[] = [
  { kind: "user", text: "I'm looking for a wireless headset under $100.", delay: 700 },
  { kind: "ai", text: "Found 3 options that match your budget.", delay: 900 },
  { kind: "products", delay: 700 },
  { kind: "user", text: "Which is best for long calls?", delay: 1600 },
  { kind: "ai", text: "Echo Pro — best mic clarity for calls.", delay: 900 },
  { kind: "note", text: "Recommendations based on product catalog.", delay: 2200 },
];

const products = [
  { name: "Echo Pro", price: "$79", tag: "Best for calls" },
  { name: "AirBeat", price: "$89", tag: "Lightweight" },
  { name: "Sonic X", price: "$95", tag: "Versatile" },
];

export default function SalesDemo() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [typing, setTyping] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setSteps([]);
      setTyping(false);
      setShowProducts(false);
      let t = 400;
      sequence.forEach((s) => {
        t += s.delay;
        const timer = setTimeout(() => {
          if (cancelled) return;
          if (s.kind === "ai") setTyping(true);
          setSteps((prev) => [...prev, s]);
          if (s.kind === "ai") setTyping(false);
          if (s.kind === "products") setShowProducts(true);
        }, t);
        timers.push(timer);
      });
      const reset = setTimeout(() => {
        if (cancelled) return;
        run();
      }, t + 3200);
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
        <span className="text-xs font-mono text-[var(--text-dim)]">nexa-sales · widget</span>
      </div>
      <div className="p-5 space-y-3 min-h-[300px]">
        {steps.map((s, idx) => {
          if (s.kind === "products") {
            return showProducts ? (
              <div key={idx} className="grid grid-cols-3 gap-2">
                {products.map((p) => (
                  <div key={p.name} className="surface rounded-xl p-3 text-center">
                    <div className="w-full aspect-square rounded-lg bg-[var(--surface-2)] mb-2" />
                    <div className="text-xs font-medium text-[var(--text)]">{p.name}</div>
                    <div className="text-xs text-[var(--accent)] font-mono mt-1">{p.price}</div>
                    <div className="text-[10px] text-[var(--text-dim)] mt-1">{p.tag}</div>
                  </div>
                ))}
              </div>
            ) : null;
          }
          return (
            <div key={idx} className={`flex ${s.kind === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm ${
                  s.kind === "user"
                    ? "bg-[var(--accent)] text-[var(--bg)]"
                    : s.kind === "note"
                    ? "bg-transparent border border-dashed border-[var(--border)] text-[var(--text-dim)] text-xs"
                    : "bg-[var(--surface-2)] text-[var(--text)]"
                }`}
              >
                {s.text}
              </div>
            </div>
          );
        })}
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
