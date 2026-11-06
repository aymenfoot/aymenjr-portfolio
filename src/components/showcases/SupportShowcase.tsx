"use client";

import { useEffect, useState } from "react";

type Beat = {
  delay: number;
  kind: "user" | "ai" | "tool" | "card" | "note" | "typing";
  text: string;
  archStage?: number; // stage index to activate (0-based)
};

const beats: Beat[] = [
  { delay: 400, kind: "user", text: "Where is my order, and when should I expect it?", archStage: 0 },
  { delay: 700, kind: "typing", text: "", archStage: 1 },
  { delay: 900, kind: "ai", text: "Let me look that up for you right away.", archStage: 2 },
  { delay: 600, kind: "tool", text: "lookup_order(\"ORD-1002\") ✓", archStage: 2 },
  { delay: 800, kind: "card", text: "ORD-1002 · Delivered · FDX-78901234 · 3 days ago", archStage: 3 },
  { delay: 900, kind: "ai", text: "Your order ORD-1002 is delivered. Tracking: FDX-78901234. You should have received it already.", archStage: 4 },
  { delay: 700, kind: "note", text: "Based on your store's order records and shipment data.", archStage: 4 },
];

const stages = [
  { id: "ticket", label: "Ticket received", desc: "Customer message parsed and ticket created." },
  { id: "intent", label: "Intent detection", desc: "Classified as order_status inquiry." },
  { id: "order", label: "Order lookup", desc: "lookup_order(\"ORD-1002\") → delivered, tracking FDX-78901234.", input: '{ order_id: "ORD-1002" }', output: '{ status: "delivered", tracking: "FDX-78901234" }' },
  { id: "knowledge", label: "Knowledge retrieval", desc: "Retrieved order record and shipment details.", input: '{ query: "order status" }', output: '{ docs: ["order_record", "shipment_details"] }' },
  { id: "resolve", label: "Resolution", desc: "Responded with delivery status and tracking." },
];

export default function SupportShowcase() {
  const [shown, setShown] = useState<number>(0);
  const [typing, setTyping] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(-1);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    if (shown >= beats.length) {
      setPlaying(false); // eslint-disable-line react-hooks/set-state-in-effect
      return;
    }
    const beat = beats[shown];
    const t = setTimeout(() => {
      if (beat.kind === "typing") setTyping(true);
      else {
        setTyping(false);
        if (beat.archStage !== undefined) {
          setActiveStage(beat.archStage);
          // mark previous as completed
          if (beat.archStage > 0) {
            setCompleted((prev) => new Set(prev).add(beat.archStage! - 1));
          }
        }
      }
      setShown((v) => v + 1);
    }, beat.delay);
    return () => clearTimeout(t);
  }, [shown, playing]);

  const restart = () => {
    setShown(0);
    setTyping(false);
    setActiveStage(-1);
    setCompleted(new Set());
    setPlaying(true);
  };

  const visibleBeats = beats.slice(0, shown);

  return (
    <div className="space-y-6">
      {/* Scenario label */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">Scenario: Order inquiry</div>
        <div className="flex gap-2">
          {playing ? (
            <button onClick={() => setPlaying(false)} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-[var(--accent)] transition">Pause</button>
          ) : shown < beats.length ? (
            <button onClick={() => setPlaying(true)} className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--bg)] text-xs font-medium hover:opacity-90 transition">Resume</button>
          ) : (
            <button onClick={restart} className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--bg)] text-xs font-medium hover:opacity-90 transition">Replay</button>
          )}
          <button onClick={restart} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-[var(--accent)] transition">Restart</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Conversation */}
        <div className="surface rounded-2xl p-6 flex flex-col">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-4">Customer conversation</div>
          <div className="space-y-3 flex-1 min-h-[280px]">
            {visibleBeats.filter((b) => b.kind !== "typing").map((b, i) => (
              <div key={i} className={`flex ${b.kind === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                {b.kind === "user" && (
                  <div className="bg-[var(--accent)] text-[var(--bg)] px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm max-w-[85%]">
                    {b.text}
                  </div>
                )}
                {b.kind === "ai" && (
                  <div className="bg-[var(--surface-2)] text-[var(--text)] px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm max-w-[85%]">
                    {b.text}
                  </div>
                )}
                {b.kind === "tool" && (
                  <div className="bg-[var(--surface-2)] text-[var(--accent-2)] font-mono text-xs px-3 py-1.5 rounded-lg border border-[var(--border)]">
                    {b.text}
                  </div>
                )}
                {b.kind === "card" && (
                  <div className="bg-[var(--surface-2)] border border-[var(--accent)]/30 rounded-xl px-4 py-3 text-sm w-full max-w-[85%]">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs">ORD-1002</span>
                      <span className="text-[var(--text-muted)] text-xs">Delivered · FDX-78901234</span>
                    </div>
                  </div>
                )}
                {b.kind === "note" && (
                  <div className="text-xs text-[var(--text-dim)] italic px-2">{b.text}</div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-2.5 rounded-2xl bg-[var(--surface-2)] text-[var(--text-dim)] text-sm">
                  <span className="animate-pulse">● ● ●</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Architecture graph */}
        <div className="surface rounded-2xl p-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mb-4">Execution architecture</div>
          <div className="flex flex-wrap items-center gap-2 justify-center">
            {stages.map((st, i) => {
              const isActive = activeStage === i;
              const isDone = completed.has(i);
              return (
                <div key={st.id} className="flex items-center gap-2">
                  <div
                    className={`px-3 py-2 rounded-lg border text-xs font-mono transition-all duration-300 ${
                      isActive
                        ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] scale-105"
                        : isDone
                        ? "border-[var(--accent)]/40 bg-[var(--accent)]/5 text-[var(--text)]"
                        : "border-[var(--border)] text-[var(--text-dim)] opacity-40"
                    }`}
                  >
                    {isDone && <span className="text-[var(--accent)] mr-1">✓</span>}
                    {isActive && <span className="animate-pulse mr-1">●</span>}
                    {st.label}
                  </div>
                  {i < stages.length - 1 && (
                    <span className={`text-sm transition-colors duration-300 ${i < activeStage || completed.has(i) ? "text-[var(--accent)]" : "text-[var(--text-dim)] opacity-30"}`}>→</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 h-1 rounded-full bg-[var(--surface-2)] overflow-hidden">
            <div className="h-full bg-[var(--accent)] transition-all duration-300" style={{ width: `${Math.min(100, (shown / beats.length) * 100)}%` }} />
          </div>
        </div>
      </div>

      <p className="text-xs text-[var(--text-dim)]">
        Interactive demonstration using seeded demo data. Actual behavior depends on store configuration.
      </p>
    </div>
  );
}
