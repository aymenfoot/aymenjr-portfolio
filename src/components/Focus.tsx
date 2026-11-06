import { Bot, Zap, Code2, Database, ShoppingCart, Server, ShieldCheck } from "lucide-react";

const caps = [
  { icon: Bot, title: "AI Agents & Autonomous Systems", desc: "Intelligent agents that reason, use tools, execute tasks, and orchestrate complex workflows." },
  { icon: Zap, title: "AI-Powered Applications", desc: "End-to-end applications that integrate AI capabilities into practical software products." },
  { icon: Code2, title: "Intelligent Assistants", desc: "Conversational assistants for customer support, bookings, recommendations, and other real-world interactions." },
  { icon: Server, title: "Business Process Automation", desc: "Intelligent automation systems that streamline operations and reduce repetitive work." },
  { icon: Database, title: "RAG & Knowledge Systems", desc: "Systems that retrieve, process, and reason over information to deliver accurate, context-aware responses." },
  { icon: ShoppingCart, title: "Backend Engineering & System Integration", desc: "Building APIs, backend services, databases, and integrations that bring software systems together." },
  { icon: ShieldCheck, title: "System Architecture & Reliability", desc: "Designing maintainable, scalable, and reliable systems built for real-world use." },
];

export default function Focus() {
  return (
    <section id="focus" className="py-16 md:py-24 bg-[var(--bg-elev)]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">Areas of Focus</p>
        <h2 className="display mt-4 text-4xl md:text-6xl font-semibold tracking-tight">What I build.</h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
          {caps.map((c) => (
            <div key={c.title} className="bg-[var(--bg-elev)] p-8 hover:bg-[var(--surface)] transition-colors">
              <c.icon size={22} className="text-[var(--accent)]" />
              <h3 className="display mt-4 text-lg font-semibold text-[var(--text)]">{c.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
