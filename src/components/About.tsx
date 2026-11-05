
export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">The person behind the builds</p>
          <h2 className="display mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[0.9]">
            Curiosity
            <br />
            <span className="text-[var(--accent)]">turned into</span>
            <br />
            engineering.
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-5 text-[var(--text-muted)] leading-relaxed text-lg">
          <p>
            I&apos;m Aymen Jr., an aspiring AI Engineer and independent builder.
          </p>
          <p>
            I started my AI engineering journey around nine months ago, beginning with automation tools
            like n8n. My curiosity quickly pushed me beyond no-code automation and toward understanding
            how software actually works.
          </p>
          <p>
            I began learning programming with C++, then moved into Python and deeper into AI engineering.
            Over time, my focus shifted from simply learning tools to building, testing, integrating, and
            running real software projects.
          </p>
          <p>
            Today, I focus on developing intelligent systems, AI agents, automation workflows, and
            practical applications that address real business challenges. I&apos;m still learning,
            experimenting, and building — one project at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
