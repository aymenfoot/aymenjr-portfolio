import { Mail } from "lucide-react";

import Section from "./Section";

export default function Contact() {
  return (
    <Section id="contact" className="py-24 md:py-32">
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
          <a
            href="https://github.com/aymenfoot"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--accent)] text-[var(--bg)] font-medium hover:opacity-90 transition"
          >
            Let&apos;s Connect
          </a>
          <a
            href="mailto:aymendipo604@gmail.com"
            className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition"
          >
            <Mail size={16} /> aymendipo604@gmail.com
          </a>
          <p className="mt-2 text-sm text-[var(--text-dim)]">
            github.com/aymenfoot
          </p>
        </div>
      </div>
    </Section>
  );
}
