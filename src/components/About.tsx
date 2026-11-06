
export default function About() {
  return (
    <section id="about" className="py-16 md:py-24">
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
            I&apos;m Aymen Jr., an AI Engineer and independent builder focused on designing and building
            intelligent software systems.
          </p>
          <p>
            My journey began with exploring AI automation tools like n8n. But my curiosity quickly went
            beyond using existing tools. I wanted to understand what happens beneath the surface — how
            software works, how systems are designed, and how intelligence can be engineered into real
            applications.
          </p>
          <p>
            That curiosity led me into programming, starting with C++ and then Python, before expanding
            into AI Engineering and software development. Through independent learning, structured
            courses, and continuous experimentation, I began developing the technical foundations needed
            to build systems of my own.
          </p>
          <p>
            What matters most to me is turning ideas into working products. I enjoy taking a problem,
            understanding its requirements, designing the underlying system, and bringing the solution to
            life through code.
          </p>
          <p>
            Today, I independently design and build AI-powered applications, intelligent assistants, and
            software systems for a variety of real-world needs and industries. From automating complex
            workflows and developing autonomous AI agents to creating intelligent applications that solve
            specific business and operational challenges, I focus on engineering complete solutions —
            from their underlying logic and architecture to their integrations and user experiences.
          </p>
          <p>
            I believe great engineering is not simply about making something work. It&apos;s about building
            something useful, reliable, and thoughtfully designed.
          </p>
          <div className="pt-6 border-t border-[var(--border)] flex items-baseline gap-6">
            <div>
              <div className="display text-5xl font-semibold text-[var(--text)]">03</div>
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mt-1">Systems built</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
