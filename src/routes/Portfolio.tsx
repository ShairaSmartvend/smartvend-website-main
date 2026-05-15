import { Sparkles } from "lucide-react";
import { Section } from "./Section";

export function Portfolio() {
  const items = [
    { label: "Insert Latest Project Photo Here", tall: true, tag: "CleanIt UI" },
    { label: "Upcoming Project Showcase", tall: false, tag: "IT Deployment" },
    { label: "Insert Latest Project Photo Here", tall: false, tag: "Dashboard" },
    { label: "Upcoming Project Showcase", tall: true, tag: "Mobile App" },
    { label: "Insert Latest Project Photo Here", tall: false, tag: "Network" },
  ];
  return (
    <Section
      id="portfolio"
      eyebrow="Latest Portfolio"
      title="Work in progress, ready to showcase."
      subtitle="Reserved spaces for our current builds and upcoming launches."
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {items.map((it, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-2xl glass neon-border ${
              it.tall ? "row-span-2 aspect-[3/5]" : "aspect-[4/3]"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-cyan-glow/10" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 grid place-items-center text-center p-4">
              <div>
                <div className="mx-auto h-12 w-12 rounded-xl glass grid place-items-center mb-3">
                  <Sparkles className="h-5 w-5 text-cyan-glow" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">{it.label}</p>
                <span className="mt-2 inline-block text-[10px] uppercase tracking-[0.25em] text-primary">
                  {it.tag}
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-cyan-glow">
                  Project Preview
                </div>
                <div className="mt-1 font-semibold">{it.tag}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
