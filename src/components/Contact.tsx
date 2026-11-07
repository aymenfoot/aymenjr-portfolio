"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

export default function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">Contact</p>
          <h2 className="display mt-4 text-5xl md:text-7xl font-semibold tracking-tight leading-[0.9]">
            Have an idea
            <br />
            <span className="text-[var(--accent)]">worth building?</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--text-muted)] leading-relaxed max-w-xl">
            I&apos;m interested in building intelligent products, solving meaningful problems, and
            collaborating on ambitious projects.
          </p>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="contact-options"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--accent)] text-[var(--bg)] font-medium hover:opacity-90 transition"
            >
              Let&apos;s Connect
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id="contact-options"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a
                      href="mailto:aymendipo604@gmail.com"
                      className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
                    >
                      <Mail size={18} className="text-[var(--accent)]" />
                      <span className="text-sm">aymendipo604@gmail.com</span>
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-4 text-xs text-[var(--text-dim)] hover:text-[var(--text-muted)] transition"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
