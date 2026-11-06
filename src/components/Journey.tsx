
const steps = [
  { n: "01", title: "Exploration", desc: "Discovering AI automation and developing a deeper curiosity about the technology behind it." },
  { n: "02", title: "Programming Foundations", desc: "Building a programming foundation through C++ and Python, and understanding the fundamentals of software development." },
  { n: "03", title: "AI & Software Engineering", desc: "Expanding into AI Engineering, intelligent applications, backend development, and the technologies needed to build complete systems." },
  { n: "04", title: "Independent Building", desc: "Applying that knowledge to real projects — designing architectures, engineering features, integrating components, testing, and deploying functional products." },
];

export default function Journey() {
  return (
    <section id="journey" className="py-16 md:py-24 bg-[var(--bg-elev)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">Learning journey</p>
            <h2 className="display mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[0.9]">
              From foundations
              <br />
              <span className="text-[var(--accent)]">to engineered systems.</span>
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[var(--text-muted)] leading-relaxed max-w-md">
              A progression from exploring technology and building programming foundations to independently
              designing, developing, and deploying complete software systems.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)]">
          {steps.map((s) => (
            <div key={s.n} className="bg-[var(--bg-elev)] p-8 hover:bg-[var(--surface)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
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
