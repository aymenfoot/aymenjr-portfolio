"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type StageStatus = "pending" | "active" | "completed" | "failed" | "skipped" | "escalated";

export interface Stage {
  id: string;
  label: string;
  desc: string;
  tool?: string | null;
  input?: string;
  output?: string;
  kind?: string;
}

export type PlaybackState = "idle" | "running" | "paused" | "completed";

export interface ExecutionController {
  stages: Stage[];
  status: Record<string, StageStatus>;
  activeId: string | null;
  playback: PlaybackState;
  progress: number; // 0..1
  play: () => void;
  pause: () => void;
  resume: () => void;
  restart: () => void;
  stepForward: () => void;
  isRunning: boolean;
}

const STAGE_DELAY = 900;

export function useExecution(stages: Stage[]): ExecutionController {
  const [status, setStatus] = useState<Record<string, StageStatus>>(() =>
    Object.fromEntries(stages.map((s) => [s.id, "pending"]))
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playback, setPlayback] = useState<PlaybackState>("idle");
  const [cursor, setCursor] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stagesRef = useRef(stages);

  useEffect(() => {
    stagesRef.current = stages;
  }, [stages]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const reset = useCallback(() => {
    clearTimer();
    setStatus(Object.fromEntries(stagesRef.current.map((s) => [s.id, "pending"])));
    setActiveId(null);
    setCursor(0);
    setPlayback("idle");
  }, []);

  // Reset when stages change
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages.map((s) => s.id).join(",")]);

  const advance = useCallback(() => {
    const cur = stagesRef.current;
    setCursor((prev) => {
      if (prev >= cur.length) return prev;
      const stage = cur[prev];
      // mark active
      setActiveId(stage.id);
      setStatus((st) => ({ ...st, [stage.id]: "active" }));
      // after delay, mark completed and advance
      timerRef.current = setTimeout(() => {
        setStatus((st) => ({ ...st, [stage.id]: stage.kind === "escalate" ? "escalated" : "completed" }));
        setActiveId(null);
        setCursor((p) => {
          const next = p + 1;
          if (next >= cur.length) {
            setPlayback("completed");
          }
          return next;
        });
      }, STAGE_DELAY);
      return prev;
    });
  }, []);

  const play = useCallback(() => {
    setPlayback("running");
  }, []);

  const pause = useCallback(() => {
    clearTimer();
    setPlayback("paused");
  }, []);

  const resume = useCallback(() => {
    setPlayback("running");
  }, []);

  const restart = useCallback(() => {
    reset();
    setTimeout(() => setPlayback("running"), 50);
  }, [reset]);

  const stepForward = useCallback(() => {
    clearTimer();
    setPlayback("paused");
    const cur = stagesRef.current;
    if (cursor >= cur.length) return;
    const stage = cur[cursor];
    setActiveId(stage.id);
    setStatus((st) => ({ ...st, [stage.id]: "active" }));
    // mark completed after short delay
    timerRef.current = setTimeout(() => {
      setStatus((st) => ({ ...st, [stage.id]: stage.kind === "escalate" ? "escalated" : "completed" }));
      setActiveId(null);
      setCursor((p) => p + 1);
    }, 400);
  }, [cursor]);

  // Auto-advance when running
  useEffect(() => {
    if (playback !== "running") return;
    if (cursor >= stages.length) {
      setPlayback("completed"); // eslint-disable-line react-hooks/set-state-in-effect
      return;
    }
    // Don't advance if timer already running
    if (timerRef.current) return;
    advance();
    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playback, cursor]);

  const progress = stages.length ? cursor / stages.length : 0;

  return {
    stages,
    status,
    activeId,
    playback,
    progress,
    play,
    pause,
    resume,
    restart,
    stepForward,
    isRunning: playback === "running",
  };
}
