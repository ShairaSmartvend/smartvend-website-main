import { Calendar, Sparkles, Rocket, Headphones } from "lucide-react";
import { Section } from "./Section";
import teamImg from "@/assets/team-img.png";

export function About() {
  const stats = [
    { icon: Calendar, v: "2025", l: "Startup Founded" },
    { icon: Sparkles, v: "Innovative", l: "Digital Solutions" },
    { icon: Rocket, v: "Growing", l: "Technology Company" },
    { icon: Headphones, v: "Reliable", l: "Technology Partner" },
  ];
  return (
    <Section id="about" eyebrow="About Us" title="Built by classmates, driven by purpose.">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-cyan-glow/20 blur-2xl rounded-3xl" />
          <div className="relative rounded-3xl overflow-hidden neon-border">
            <img
              src={teamImg}
              alt="Smartvend team workspace"
              width={1024}
              height={1024}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div>
          <p className="text-muted-foreground leading-relaxed">
            Smartvend System Corp. began as a vision between two classmates who wanted to build a
            technology company that delivers real value. What started as a shared ambition has
            evolved into a growing startup focused on creating smart and practical digital
            solutions.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our goal is to improve how businesses operate and how people experience everyday
            services by providing efficient, reliable, and user-friendly technology — innovative,
            meaningful, and accessible.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.l} className="glass rounded-2xl p-5 glow-hover">
                <s.icon className="h-6 w-6 text-cyan-glow" />
                <div className="mt-3 text-lg font-bold">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
