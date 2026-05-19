import { Calendar, Sparkles, Rocket, Headphones, Target, Eye, ArrowRight } from "lucide-react";
import { Section } from "./Section";
import teamImg from "@/assets/team-img.png";

export function About() {
  const stats = [
    { icon: Calendar, v: "2025", l: "Startup Founded" },
    { icon: Sparkles, v: "Innovative", l: "Digital Solutions" },
    { icon: Rocket, v: "Growing", l: "Technology Company" },
    { icon: Headphones, v: "Reliable", l: "Technology Partner" },
  ];

  const scrollToSection = sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="space-y-0">
      {/* Mission and Vision Section */}
      <Section
        id="about"
        eyebrow="About us"
        title="We build secure, scalable software systems that solve real-world problems."
        subtitle="SmartVend Systems Corp was founded with a simple belief — modern businesses deserve digital systems that are fast, secure, and beautifully crafted."
        className="pb-0 mb-0"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mission Card */}
          <div
            className="group relative rounded-2xl border border-blue-400/50 bg-card p-8 card-hover overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 active:scale-[0.98] hover:border-blue-400"
            onClick={() => scrollToSection("mission")}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                scrollToSection("mission");
              }
            }}
            role="button"
            tabIndex={0}
          >
            {/* Permanent blue gradient effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/25 to-cyan-500/15 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-blue-500/40" />
            {/* Enhanced hover effect - different style */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-600/40 to-indigo-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
            {/* Click ripple effect */}
            <div className="absolute inset-0 rounded-2xl bg-blue-500/0 transition-all duration-300 group-active:bg-blue-500/10" />
            <div className="relative z-10">
              <div className="inline-flex p-3 rounded-xl bg-primary/20 border border-primary/40 group-hover:bg-primary/30 group-hover:border-primary/60 transition-all duration-300">
                <Target className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold animate-fade-up group-hover:text-primary transition-colors duration-300">
                Our Mission
              </h3>
              <p
                className="mt-3 text-muted-foreground leading-relaxed animate-fade-up group-hover:text-foreground transition-colors duration-300"
                style={{ animationDelay: "0.1s" }}
              >
                To create reliable and user-friendly technology that transforms how services are
                delivered. We aim to solve real problems, improve efficiency, and bring convenience
                to both business and customers through smart digital solutions.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div
            className="group relative rounded-2xl border border-blue-400/50 bg-card p-8 card-hover overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 active:scale-[0.98] hover:border-blue-400"
            onClick={() => scrollToSection("vision")}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                scrollToSection("vision");
              }
            }}
            role="button"
            tabIndex={0}
          >
            {/* Permanent blue gradient effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/25 to-cyan-500/15 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-blue-500/40" />
            {/* Enhanced hover effect - different style */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-600/40 to-indigo-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
            {/* Click ripple effect */}
            <div className="absolute inset-0 rounded-2xl bg-blue-500/0 transition-all duration-300 group-active:bg-blue-500/10" />
            <div className="relative z-10">
              <div className="inline-flex p-3 rounded-xl bg-primary/20 border border-primary/40 group-hover:bg-primary/30 group-hover:border-primary/60 transition-all duration-300">
                <Eye className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold animate-fade-up group-hover:text-primary transition-colors duration-300">
                Our Vision
              </h3>
              <p
                className="mt-3 text-muted-foreground leading-relaxed animate-fade-up group-hover:text-foreground transition-colors duration-300"
                style={{ animationDelay: "0.1s" }}
              >
                To become a trusted technology company in the Philippines, known for delivering
                useful and impactful innovations that improve daily life and support business
                growth.
              </p>
            </div>
          </div>
        </div>
      </Section>
      {/* Our Story Section */}
      <Section
        id="story"
        eyebrow="Our Story"
        title="From connection to creation."
        className="pt-0 mt-0"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-cyan-glow/20 blur-2xl rounded-3xl" />
            <div className="relative rounded-3xl overflow-hidden neon-border">
              <img
                src={teamImg}
                alt="SmartVend team workspace"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div>
            <p className="text-muted-foreground leading-relaxed">
              SmartVend Systems Corp. was established on January 25, 2025 through the shared vision
              of two former classmates who aspired to build something meaningful together. What
              started as a simple idea rooted in friendship, determination, and ambition gradually
              became the foundation of the company.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Over time, the organization has grown into a startup focused on developing smart,
              practical, and user-friendly digital solutions. It is driven by a mission to improve
              everyday services and enhance how businesses operate through efficient and reliable
              technology.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map(stat => (
                <div key={stat.l} className="glass rounded-2xl p-5 glow-hover">
                  <stat.icon className="h-6 w-6 text-cyan-400" />
                  <div className="mt-3 text-lg font-bold">{stat.v}</div>
                  <div className="text-xs text-muted-foreground">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
