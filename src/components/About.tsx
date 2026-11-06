
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" className="py-24 md:py-32">
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
            I&apos;m Aymen Jr., an AI Engineer and independent builder.
          </p>
          <p>
            I initially explored AI through automation tools such as n8n. However, I soon became more
            curious about what was happening behind the tools. I didn&apos;t want to remain someone who
            simply connects existing tools together. I wanted to understand the technology, the code,
            and the engineering behind it.
          </p>
          <p>
            That curiosity led me to start learning C++, followed by Python. From there, I went deeper
            into AI Engineering, studying through a combination of free and paid courses and educational
            programs, including courses from IBM.
          </p>
          <p>
            Over time, I realized that learning concepts alone wasn&apos;t enough. I wanted to turn that
            knowledge into real, working systems. So I decided to shift my focus toward practical
            engineering: designing, developing, testing, improving, and running actual projects.
          </p>
          <p>
            Today, my focus is on building practical AI-powered systems that solve real business
            problems, with an emphasis on engineering, reliability, and real-world implementation.
          </p>
          <div className="pt-6 border-t border-[var(--border)] flex items-baseline gap-6">
            <div>
              <div className="display text-5xl font-semibold text-[var(--accent)]">09</div>
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mt-1">Months learning</div>
            </div>
            <div>
              <div className="display text-5xl font-semibold text-[var(--text)]">03</div>
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-dim)] mt-1">Systems built</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
