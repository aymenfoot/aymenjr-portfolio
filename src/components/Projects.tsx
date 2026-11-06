"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SystemModal from "./SystemModal";
import SupportShowcase from "./showcases/SupportShowcase";
import SupportMockup from "./mockups/SupportMockup";
import OrderShowcase from "./showcases/OrderShowcase";
import OrderMockup from "./mockups/OrderMockup";
import SalesShowcase from "./showcases/SalesShowcase";
import SalesMockup from "./mockups/SalesMockup";

const projects = [
  {
    n: "01",
    name: "Nexa Support",
    category: "AI Customer Support System",
    desc: "An intelligent customer support system engineered for e-commerce operations, combining knowledge retrieval, policy-aware decision logic, order integrations, and controlled human escalation to automate customer support while maintaining grounded and reliable responses.",
    points: ["RAG and grounded answers with citations", "Product catalog and policy retrieval", "Order lookup integration", "Deterministic return and refund decisions", "Human escalation", "Operational dashboard", "Testing and validation"],
    tech: ["Python", "RAG", "AI Agents", "Docker", "Pytest"],
    github: "https://github.com/aymenfoot/nexa-support",
    showcase: <SupportShowcase />,
    mockup: <SupportMockup />,
    showcaseTitle: "Nexa Support — Interactive Demo",
  },
  {
    n: "02",
    name: "Nexa Order Intelligence",
    category: "Agentic AI / Autonomous Workflows",
    desc: "An autonomous order intelligence system built around an agent architecture that interprets requests, orchestrates specialized tools, executes multi-step operational workflows, and processes order, shipping, and return-related operations.",
    points: ["ReAct agent architecture", "LangGraph orchestration", "Seven specialized tools", "Conditional routing", "Automatic retries", "Order and shipment intelligence", "Return eligibility and initiation", "Optional Langfuse observability"],
    tech: ["Python", "LangGraph", "FastAPI", "Streamlit", "SQLite", "Langfuse"],
    github: "https://github.com/aymenfoot/nexa-order-intelligence",
    showcase: <OrderShowcase />,
    mockup: <OrderMockup />,
    showcaseTitle: "Nexa Order Intelligence — Interactive Demo",
  },
  {
    n: "03",
    name: "Nexa Sales",
    category: "E-commerce AI / Shopify",
    desc: "An AI-powered commerce application engineered for Shopify stores, integrating intelligent product discovery, personalized recommendations, and a conversational shopping experience with a customizable administrative interface.",
    points: ["Intelligent product recommendations", "Storefront AI assistant", "Shopify integration", "Administrative configuration", "Real-time interface settings", "Optional n8n workflows"],
    tech: ["TypeScript", "Remix", "Shopify", "Prisma", "n8n"],
    github: "https://github.com/aymenfoot/nexa-sales",
    showcase: <SalesShowcase />,
    mockup: <SalesMockup />,
    showcaseTitle: "Nexa Sales — Interactive Demo",
  },
];

export default function Projects() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">Selected Projects / 2026</p>
        <h2 className="display mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[0.9]">
          Built with purpose.
          <br />
          <span className="text-[var(--accent)]">Engineered with intelligence.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-[var(--text-muted)] leading-relaxed">
          A selection of AI-powered applications and intelligent systems I&apos;ve designed and developed.
        </p>
      </div>

      <div className="mt-20 space-y-24 md:space-y-32">
        {projects.map((p, i) => (
          <div key={p.name} className="max-w-7xl mx-auto px-6">
            <div className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-dim)]">
                  <span>{p.n}</span>
                  <span className="w-8 h-px bg-[var(--border-strong)]" />
                  <span className="uppercase tracking-widest">{p.category}</span>
                </div>
                <h3 className="display mt-6 text-4xl md:text-5xl font-semibold tracking-tight leading-[0.9]">{p.name}</h3>
                <p className="mt-5 text-[var(--text-muted)] leading-relaxed">{p.desc}</p>
                <ul className="mt-6 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                      <span className="mt-2 w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono border border-[var(--border)] text-[var(--text-muted)]">{t}</span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setOpenIdx(i)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-[var(--bg)] font-medium text-sm hover:opacity-90 transition"
                  >
                    EXPLORE INTERACTIVE DEMO
                  </button>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border-strong)] text-[var(--text)] font-medium text-sm hover:bg-[var(--surface)] transition"
                  >
                    View on GitHub <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
              <div className="lg:col-span-7 relative group cursor-pointer" onClick={() => setOpenIdx(i)}>
                <div className="absolute -inset-6 bg-[var(--accent)]/5 blur-3xl rounded-3xl group-hover:bg-[var(--accent)]/10 transition-colors duration-500" aria-hidden="true" />
                <div className="surface rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
                  {p.mockup}
                </div>
                <div className="mt-4 text-center text-xs font-mono text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors">
                  Click to explore interactive demo →
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.map((p, i) => (
        <SystemModal
          key={p.name}
          open={openIdx === i}
          onClose={() => setOpenIdx(null)}
          title={p.showcaseTitle}
        >
          {p.showcase}
        </SystemModal>
      ))}
    </section>
  );
}
