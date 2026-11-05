import { BookOpen, Code2, Cpu, Rocket } from "lucide-react";

const steps = [
  { n: "01", icon: BookOpen, title: "Exploration", desc: "Discovering automation and n8n." },
  { n: "02", icon: Code2, title: "Programming Foundations", desc: "Learning C++ and developing programming fundamentals." },
  { n: "03", icon: Cpu, title: "AI Engineering", desc: "Moving into Python, AI systems, and intelligent applications." },
  { n: "04", icon: Rocket, title: "Building & Execution", desc: "Designing, implementing, testing, and running complete projects." },
];

export default function Journey() {
  return (
    <section id="journey" className="py-24 md:py-32 bg-[var(--bg-elev)]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">Learning journey</p>
        <h2 className="display mt-4 text-4xl md:text-6xl font-semibold tracking-tight">How I got here.</h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)]">
          {steps.map((s) => (
            <div key={s.n} className="bg-[var(--bg-elev)] p-8 hover:bg-[var(--surface)] transition-colors">
              <div className="flex items-center justify-between">
                <s.icon size={20} className="text-[var(--accent)]" />
                <span className="font-mono text-xs text-[var(--text-dim)]">{s.n}</span>
              </div>
              <h3 className="display mt-6 text-xl font-semibold text-[var(--text)]">{s.title}</h3>
              <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
