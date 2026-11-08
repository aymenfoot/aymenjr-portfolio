import { Bot, Zap, ShoppingCart, Code2, Database, Server } from "lucide-react";

const caps = [
  { n: "01", icon: Bot, title: "AI Agents & Intelligent Assistants", desc: "Intelligent agents and assistants that reason, use tools, execute tasks, and interact with users across customer support, sales, product discovery, bookings, and business operations." },
  { n: "02", icon: Zap, title: "Business Automation Systems", desc: "Complete automation systems that streamline business operations, manage workflows, coordinate processes, and connect business functions through intelligent automation." },
  { n: "03", icon: ShoppingCart, title: "Website & E-commerce Development", desc: "Modern business websites, e-commerce stores, online platforms, digital storefronts, and customized web experiences built around real business needs." },
  { n: "04", icon: Code2, title: "Custom Software & Web Applications", desc: "Complete software products, SaaS platforms, business management systems, custom web applications, administrative dashboards, and specialized digital platforms." },
  { n: "05", icon: Database, title: "AI Systems & Data Intelligence", desc: "AI-powered applications, RAG and knowledge systems, intelligent document processing, data analysis, information retrieval, and specialized AI solutions." },
  { n: "06", icon: Server, title: "Software Integration & Deployment", desc: "Integrating software systems, configuring and adapting existing solutions, engineering backend services and APIs, preparing infrastructure, and deploying reliable production-ready applications." },
];

export default function Focus() {
  return (
    <section id="focus" className="py-16 md:py-24 bg-[var(--bg-elev)]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">Areas of Focus</p>
        <h2 className="display mt-4 text-4xl md:text-6xl font-semibold tracking-tight">What I build.</h2>
        <p className="mt-4 max-w-2xl text-[var(--text-muted)] leading-relaxed">
          From intelligent AI systems to complete software products and digital platforms.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
          {caps.map((c) => (
            <div key={c.title} className="bg-[var(--bg-elev)] p-8 hover:bg-[var(--surface)] transition-colors">
              <div className="flex items-center justify-between">
                <c.icon size={22} className="text-[var(--accent)]" />
                <span className="font-mono text-xs text-[var(--text-dim)]">{c.n}</span>
              </div>
              <h3 className="display mt-4 text-lg font-semibold text-[var(--text)]">{c.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
