const categories = [
  {
    title: "AI Systems Engineering",
    items: [
      "AI Agent Architecture & Orchestration",
      "LLM Application Engineering",
      "Retrieval-Augmented Generation (RAG)",
      "Knowledge Retrieval Systems",
      "Tool Calling & MCP Integrations",
      "Autonomous AI Workflows",
    ],
  },
  {
    title: "Software & Backend Engineering",
    items: [
      "Backend Architecture",
      "API Development & Integration",
      "Database Design",
      "Business Logic Engineering",
      "System Architecture",
      "Event-Driven Workflows",
    ],
  },
  {
    title: "AI-Orchestrated Software Development",
    items: [
      "AI-Assisted Software Engineering",
      "Multi-Agent Development Workflows",
      "AI-Directed Implementation",
      "Automated Testing & Validation",
      "AI-Assisted Debugging & Code Review",
      "Development Workflow Orchestration",
    ],
  },
  {
    title: "Reliability & Production Engineering",
    items: [
      "Automated Testing",
      "System Validation",
      "Error Handling & Failure Recovery",
      "Observability & Monitoring",
      "Docker & Deployment",
      "Performance & Cost Optimization",
    ],
  },
  {
    title: "Applied AI Solutions",
    items: [
      "Intelligent Customer Support Systems",
      "AI-Powered E-commerce Applications",
      "Autonomous Business Workflows",
      "Intelligent Sales Systems",
      "Business Process Automation",
    ],
  },
];

export default function TechnicalExpertise() {
  return (
    <section id="expertise" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">Technical expertise & engineering focus</p>
        <h2 className="display mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[0.9]">
          What I
          <br />
          <span className="text-[var(--accent)]">engineer.</span>
        </h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
          {categories.map((c) => (
            <div key={c.title} className="bg-[var(--bg)] p-8">
              <h3 className="display text-lg font-semibold text-[var(--text)]">{c.title}</h3>
              <ul className="mt-4 space-y-2">
                {c.items.map((it) => (
                  <li key={it} className="text-sm text-[var(--text-muted)] flex items-start gap-2">
                    <span className="mt-2 w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-[var(--text-dim)] max-w-3xl leading-relaxed">
          Capabilities are based on demonstrated project work and ongoing learning. Areas marked as focus
          reflect active development rather than completed mastery.
        </p>
      </div>
    </section>
  );
}
