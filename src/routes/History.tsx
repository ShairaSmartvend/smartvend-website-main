import { Section } from "./Section";

export function History() {
  const events = [
    {
      year: "2025",
      title: "The company was founded",
      body: "On January 25, the company was established through the shared dream and vision of two former classmates who aspired to build something meaningful together. What began as a simple idea rooted in friendship, determination, and ambition gradually became the foundation of the organization.",
    },
    {
      year: "2026",
      title: "CleanIt app launches",
      body: "This April, one of the company's major milestones will be introduced to the public through the launch of the CleanIt app — a continuous step in providing convenient and reliable cleaning service solutions to more people effectively.",
    },
  ];

  return (
    <Section id="history" eyebrow="Our History" title="Milestones that shaped us.">
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
        <div className="space-y-12">
          {events.map((e, i) => (
            <div
              key={e.year}
              className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${
                i % 2 === 1 ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-primary shadow-glow ring-4 ring-background" />
              <div className="pl-12 md:pl-0 md:pr-12 md:text-right [direction:ltr]">
                <div className="inline-block text-5xl md:text-6xl font-bold text-gradient">
                  {e.year}
                </div>
              </div>
              <div className="pl-12 md:pl-12 mt-3 md:mt-0 [direction:ltr]">
                <div className="glass rounded-2xl p-6 glow-hover">
                  <h3 className="font-semibold text-lg">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
