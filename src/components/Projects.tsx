import { ArrowUpRight } from "lucide-react";
import SupportMockup from "./mockups/SupportMockup";
import OrderMockup from "./mockups/OrderMockup";
import SalesMockup from "./mockups/SalesMockup";

const projects = [
  {
    n: "01",
    name: "Nexa Support",
    category: "AI Customer Support System",
    desc: "An AI-powered customer support system for e-commerce, combining retrieval-augmented generation, policy-aware refund decisions, order lookups, and intelligent human escalation.",
    points: ["Grounded answers with cited sources", "Product catalog & policy retrieval", "Order lookup integration", "Deterministic return/refund decisions", "Human escalation for sensitive cases", "Operational ROI analytics dashboard"],
    tech: ["Python", "RAG", "AI Agents", "Docker", "Pytest"],
    github: "https://github.com/aymenfoot/nexa-support",
    mockup: <SupportMockup />,
  },
  {
    n: "02",
    name: "Nexa Order Intelligence",
    category: "Agentic AI / Autonomous Workflows",
    desc: "An intelligent ReAct-based e-commerce agent that orchestrates order lookups, shipment tracking, return eligibility checks, and customer service workflows through specialized tools.",
    points: ["LangGraph ReAct agent", "Seven specialized tools", "Conditional routing & automatic retries", "Order and shipment intelligence", "Return eligibility & initiation", "Optional Langfuse observability"],
    tech: ["Python", "LangGraph", "FastAPI", "Streamlit", "SQLite", "Langfuse"],
    github: "https://github.com/aymenfoot/nexa-order-intelligence",
    mockup: <OrderMockup />,
  },
  {
    n: "03",
    name: "Nexa Sales",
    category: "E-commerce AI / Shopify",
    desc: "An AI-powered sales assistant for Shopify stores that helps customers discover products, receive personalized recommendations, and interact through a customizable storefront chat experience.",
    points: ["Intelligent product recommendations", "Storefront AI chat widget", "Customizable administration panel", "Real-time interface settings", "Optional n8n workflow integration", "Shopify authentication & architecture"],
    tech: ["TypeScript", "Remix", "Shopify", "Prisma", "n8n"],
    github: "https://github.com/aymenfoot/nexa-sales",
    mockup: <SalesMockup />,
  },
];

export default function Projects() {
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
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition"
                >
                  View on GitHub <ArrowUpRight size={14} />
                </a>
              </div>
              <div className="lg:col-span-7 relative group">
                <div className="absolute -inset-6 bg-[var(--accent)]/5 blur-3xl rounded-3xl group-hover:bg-[var(--accent)]/10 transition-colors duration-500" aria-hidden="true" />
                {p.mockup}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
