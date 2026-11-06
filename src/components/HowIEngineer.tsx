import { Target, Layers, Bot, Bug, Rocket } from "lucide-react";

const stages = [
  { n: "01", icon: Target, title: "Problem Definition", desc: "Understanding the actual problem, identifying requirements, and defining the intended outcome." },
  { n: "02", icon: Layers, title: "System Architecture & Planning", desc: "Breaking down the system into components, defining how they interact, and planning the implementation." },
  { n: "03", icon: Bot, title: "AI-Orchestrated Development", desc: "Directing AI-powered development workflows and specialized agents to implement different parts of the system." },
  { n: "04", icon: Bug, title: "Testing, Breaking & Validation", desc: "Using testing and review workflows to identify bugs, weaknesses, incorrect behavior, and edge cases." },
  { n: "05", icon: Rocket, title: "Improvement & Delivery", desc: "Directing fixes, refining the implementation, validating the final result, and preparing the system for practical use." },
];

export default function HowIEngineer() {
  return (
    <section id="how-i-engineer" className="py-16 md:py-24 bg-[var(--bg-elev)]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">How I engineer systems</p>
        <h2 className="display mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[0.9]">
          From problem to
          <br />
          <span className="text-[var(--accent)]">working software.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-[var(--text-muted)] leading-relaxed">
          AI agents participate in execution, while I guide and oversee the engineering process.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--border)]">
          {stages.map((s) => (
            <div key={s.n} className="bg-[var(--bg-elev)] p-6 hover:bg-[var(--surface)] transition-colors">
              <div className="flex items-center justify-between">
                <s.icon size={20} className="text-[var(--accent)]" />
                <span className="font-mono text-xs text-[var(--text-dim)]">{s.n}</span>
              </div>
              <h3 className="display mt-4 text-base font-semibold text-[var(--text)]">{s.title}</h3>
              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
