export default function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-4">
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">The person behind the builds</p>
          <h2 className="display mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[0.9]">
            Curiosity
            <br />
            <span className="text-[var(--accent)]">turned into</span>
            <br />
            engineering.
          </h2>
        </div>
        <div className="lg:col-span-8">
          <div className="max-w-prose space-y-8 text-[var(--text-muted)] leading-[1.75] text-base md:text-lg">
            <p>
              I&apos;m Aymen Jr., an AI Engineer and independent builder focused on designing and building
              intelligent software systems.
            </p>
            <p>
              My journey began with experimenting with simple automation workflows and building small web
              projects. Over time, I started exploring different areas of software development, turning
              ideas and practical solutions into products. But my curiosity quickly went beyond simply
              building things. I wanted to understand what happens beneath the surface — how software
              works, how systems are designed, and how intelligence can be engineered into real
              applications.
            </p>
            <p>
              That curiosity led me into programming, starting with <span className="font-semibold opacity-80">C++ and then Python</span>, before expanding
              into <span className="font-semibold opacity-80">AI Engineering and software development</span>. Through independent learning, structured
              courses, and continuous experimentation, I began developing the technical foundations needed
              to build systems of my own.
            </p>
            <p>
              What matters most to me is <span className="font-semibold opacity-80">turning ideas into working products</span>. I enjoy taking a problem,
              understanding its requirements, designing the underlying system, and bringing the solution to
              life through code.
            </p>
            <p>
              Today, I focus primarily on <span className="font-semibold opacity-80">AI Engineering</span> — designing and building intelligent applications,
              <span className="font-semibold opacity-80"> autonomous AI agents</span>, AI-powered assistants, and systems that combine models, data, tools, and
              software into practical solutions. My work also extends to business automation, custom
              software development, web applications, and system integrations, allowing me to engineer
              complete products from their underlying architecture and backend logic to their interfaces
              and deployment.
            </p>
            <p>
              I believe great engineering is not simply about making something work. It&apos;s about building
              something <span className="font-semibold opacity-80">useful, reliable, and thoughtfully designed</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
