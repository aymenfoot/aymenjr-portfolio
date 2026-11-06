"use client";

import { StageStatus } from "./useExecution";

export interface Node {
  id: string;
  label: string;
  icon?: string;
  desc?: string;
}

export default function WorkflowGraph({
  nodes,
  status,
  activeId,
  selectedId,
  onSelect,
  // edges,
}: {
  nodes: Node[];
  status: Record<string, StageStatus>;
  activeId: string | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-center">
      {nodes.map((n, i) => {
        const st = status[n.id] || "pending";
        const isActive = activeId === n.id || st === "active";
        const isDone = st === "completed" || st === "escalated";
        return (
          <div key={n.id} className="flex items-center gap-2">
            <button
              onClick={() => onSelect(n.id)}
              className={`px-3 py-2 rounded-lg border text-xs font-mono transition-all duration-300 ${
                isActive
                  ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] scale-105 shadow-lg shadow-[var(--accent)]/10"
                  : isDone
                  ? "border-[var(--accent)]/40 bg-[var(--accent)]/5 text-[var(--text)]"
                  : st === "failed"
                  ? "border-red-400/40 bg-red-400/5 text-red-400"
                  : "border-[var(--border)] text-[var(--text-dim)] opacity-50"
              } ${selectedId === n.id ? "ring-2 ring-[var(--accent)]/30" : ""}`}
            >
              <span className="flex items-center gap-1.5">
                {isDone && <span className="text-[var(--accent)]">✓</span>}
                {st === "escalated" && <span className="text-[var(--accent-2)]">↗</span>}
                {isActive && <span className="animate-pulse">●</span>}
                {n.label}
              </span>
            </button>
            {i < nodes.length - 1 && (
              <span className={`text-sm transition-colors duration-300 ${i < nodes.findIndex((x) => x.id === activeId || status[x.id] === "pending") ? "text-[var(--accent)]" : "text-[var(--text-dim)] opacity-30"}`}>
                →
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
