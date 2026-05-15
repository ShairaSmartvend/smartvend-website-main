import { Cpu, CheckCircle2, ArrowRight } from "lucide-react";
import { Section } from "./Section";
import cleanItLogo from "@/assets/cleanit-logo.jpg";

export function Services() {
  const services = [
    {
      icon: Cpu,
      tag: "Technology",
      name: "IT Services",
      body: "Technology-related solutions and support including computer troubleshooting, software and hardware assistance, system maintenance, network support, installation and configuration — tailored to client needs.",
      points: ["Hardware & Software", "Network Support", "System Maintenance"],
    },
    {
      img: cleanItLogo,
      tag: "Mobile App",
      name: "CleanIt",
      body: "An on-demand cleaning service. Clients post their request — location, schedule, type of cleaning — and assigned field employees can accept the job and head straight to the client's location.",
      points: ["Booking System", "Field Dispatch", "Real-time Updates"],
    },
  ];

  return (
    <Section
      id="services"
      eyebrow="Our Services"
      title="Solutions designed for real impact."
      subtitle="Two flagship offerings that combine reliable engineering with thoughtful, user-friendly experiences."
    >
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div
            key={s.name}
            className="group relative glass rounded-3xl p-8 overflow-hidden glow-hover"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl group-hover:bg-primary/40 transition" />
            <div className="relative">
              <div className="flex items-center justify-between">
                {s.img ? (
                  <img
                    src={s.img}
                    className="h-14 w-14 object-contain rounded-xl"
                    alt={`${s.name} logo`}
                  />
                ) : (
                  <div className="h-14 w-14 grid place-items-center rounded-2xl bg-gradient-to-br from-primary to-cyan-glow shadow-glow">
                    <s.icon className="h-6 w-6 text-background" />
                  </div>
                )}
                <span className="text-[11px] uppercase tracking-[0.25em] text-cyan-glow">
                  {s.tag}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-bold">{s.name}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-cyan-glow" />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="https://cleanit.business/"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
