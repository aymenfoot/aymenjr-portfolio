"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section id="top" ref={ref} className="relative min-h-screen flex items-center overflow-hidden noise">
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-[var(--accent)]/10 blur-[140px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">
            <span className="w-10 h-px bg-[var(--accent)]" />
            AI Engineer & Independent Builder
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.9]">
            I build
            <br />
            <span className="text-[var(--accent)]">intelligent</span>
            <br />
            systems.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md text-lg text-[var(--text-muted)] leading-relaxed">
            From AI agents and intelligent automation to full-stack applications, I turn ideas into practical software systems.
          </motion.p>

          <motion.a
            href="#about"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-[var(--border-strong)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition mb-6"
          >
            Meet the engineer behind the projects
            <span className="text-xs">→</span>
          </motion.a>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3">
            <a href="#projects" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[var(--accent)] text-[var(--bg)] font-medium hover:opacity-90 transition">
              Explore My Work
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[var(--border-strong)] text-[var(--text)] font-medium hover:bg-[var(--surface)] transition">
              Get In Touch
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
            className="mt-12 text-xs font-mono text-[var(--text-dim)]">
            AYMEN JR. · AI ENGINEER
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:flex items-center justify-center">
          <motion.div style={{ y, opacity }} className="relative w-[480px] h-[480px]">
            <svg viewBox="0 0 480 480" className="w-full h-full" aria-hidden="true">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <g opacity="0.3">
                {[0,1,2,3,4,5].map((i) => (
                  <line key={`h${i}`} x1="60" y1={80 + i*70} x2="420" y2={80 + i*70} stroke="#5a5a70" strokeWidth="0.5" />
                ))}
                {[0,1,2,3,4,5].map((i) => (
                  <line key={`v${i}`} x1={80 + i*70} y1="60" x2={80 + i*70} y2="420" stroke="#5a5a70" strokeWidth="0.5" />
                ))}
              </g>
              <rect x="100" y="100" width="180" height="120" rx="14" fill="url(#g1)" stroke="#60a5fa" strokeOpacity="0.4" strokeWidth="1" transform="rotate(-6 190 160)" />
              <rect x="200" y="210" width="200" height="130" rx="14" fill="url(#g1)" stroke="#a78bfa" strokeOpacity="0.4" strokeWidth="1" transform="rotate(5 300 275)" />
              <rect x="120" y="300" width="160" height="90" rx="14" fill="url(#g1)" stroke="#60a5fa" strokeOpacity="0.4" strokeWidth="1" transform="rotate(-3 200 345)" />
              <circle cx="190" cy="160" r="5" fill="#60a5fa" />
              <circle cx="300" cy="275" r="5" fill="#a78bfa" />
              <circle cx="200" cy="345" r="5" fill="#60a5fa" />
              <circle cx="340" cy="130" r="3" fill="#f0f0f5" opacity="0.5" />
              <circle cx="110" cy="360" r="3" fill="#f0f0f5" opacity="0.5" />
              <line x1="190" y1="160" x2="300" y2="275" stroke="#60a5fa" strokeWidth="0.8" strokeOpacity="0.5" />
              <line x1="300" y1="275" x2="200" y2="345" stroke="#a78bfa" strokeWidth="0.8" strokeOpacity="0.5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
