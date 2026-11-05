import { Bot, Zap, Code2, Database, ShoppingCart, Server } from "lucide-react";

const caps = [
  { icon: Bot, title: "AI Agents & Agentic Systems" },
  { icon: Zap, title: "Business Process Automation" },
  { icon: Code2, title: "AI-Powered Applications" },
  { icon: Database, title: "RAG & Knowledge Systems" },
  { icon: ShoppingCart, title: "E-commerce AI Solutions" },
  { icon: Server, title: "Backend Engineering & API Integration" },
];

export default function Focus() {
  return (
    <section id="focus" className="py-24 md:py-32 bg-[var(--bg-elev)]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">Areas of focus</p>
        <h2 className="display mt-4 text-4xl md:text-6xl font-semibold tracking-tight">What I work on.</h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
          {caps.map((c) => (
            <div key={c.title} className="bg-[var(--bg-elev)] p-8 hover:bg-[var(--surface)] transition-colors">
              <c.icon size={22} className="text-[var(--accent)]" />
              <h3 className="display mt-4 text-lg font-semibold text-[var(--text)]">{c.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
