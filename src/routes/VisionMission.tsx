import { Eye, Target } from "lucide-react";
import { Section } from "./Section";

export function VisionMission() {
  return (
    <Section id="vision" eyebrow="Vision & Mission" title="Where we're headed.">
      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            icon: Eye,
            title: "Vision",
            body: "To become a trusted technology company in the Philippines, known for delivering useful and impactful innovations that improve daily life and support business growth.",
          },
          {
            icon: Target,
            title: "Mission",
            body: "To create reliable and user-friendly technology that transforms how services are delivered. We aim to solve real problems, improve efficiency, and bring convenience to both businesses and customers through smart digital solutions.",
          },
        ].map((c) => (
          <div
            key={c.title}
            className="relative glass-strong rounded-3xl p-8 md:p-10 glow-hover overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <div className="h-14 w-14 grid place-items-center rounded-2xl bg-gradient-to-br from-primary to-cyan-glow shadow-glow">
                <c.icon className="h-6 w-6 text-background" />
              </div>
              <h3 className="mt-6 text-2xl font-bold">{c.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
