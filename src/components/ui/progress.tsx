import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Smartphone, Zap, Cloud, Palette, Cpu, Wrench, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Build With Us — Smartvend System Corp" },
      { name: "description", content: "Select the type of project or service you want to start with Smartvend System Corp" },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    id: "web",
    title: "Web Development",
    description: "High-performance web applications built with modern frameworks, optimized for speed, security, and scalability.",
    icon: Code2,
    gradient: "from-blue-500/20 to-cyan-500/20",
    hoverGradient: "from-blue-600/40 to-cyan-500/40",
    color: "from-blue-600 to-cyan-500",
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "Native iOS and Android applications with intuitive interfaces and seamless performance across all devices.",
    icon: Smartphone,
    gradient: "from-purple-500/20 to-pink-500/20",
    hoverGradient: "from-purple-600/40 to-pink-500/40",
    color: "from-purple-600 to-pink-500",
  },
  {
    id: "pos",
    title: "POS Systems",
    description: "Comprehensive point-of-sale solutions for retail and service businesses with real-time inventory management.",
    icon: Zap,
    gradient: "from-orange-500/20 to-red-500/20",
    hoverGradient: "from-orange-600/40 to-red-500/40",
    color: "from-orange-600 to-red-500",
  },
  {
    id: "cloud",
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure on AWS, GCP, and Azure with monitoring, security, and optimization.",
    icon: Cloud,
    gradient: "from-sky-500/20 to-blue-500/20",
    hoverGradient: "from-sky-600/40 to-blue-600/40",
    color: "from-sky-600 to-blue-600",
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces designed for conversion that blend aesthetics with functionality.",
    icon: Palette,
    gradient: "from-pink-500/20 to-rose-500/20",
    hoverGradient: "from-pink-600/40 to-rose-600/40",
    color: "from-pink-600 to-rose-600",
  },
  {
    id: "custom",
    title: "Custom Software Development",
    description: "Bespoke solutions tailored to your unique business needs, from ideation through deployment and support.",
    icon: Cpu,
    gradient: "from-indigo-500/20 to-blue-500/20",
    hoverGradient: "from-indigo-600/40 to-blue-600/40",
    color: "from-indigo-600 to-blue-600",
  },
];
group relative rounded-2xl overflow-hidden transition-all duration-500 animate-fade-up
const processSteps = [group relative rounded-2xl overflow-hidden transition-all duration-500 animate-fade-up
  { num: "1", title: "Discovery", desc: "We learn about your vision and requirements in detail" },
  { num: "2", title: "Strategy", desc: "We create a detailed roadmap and timeline for success" },
  { num: "3", title: "Development", desc: "We build with agility, transparency, and excellence" },
  { num: "4", title: "Launch", desc: "We deploy and support your growth and success" },
];

function ProjectsPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add("revealed");
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center pt-32 pb-20">
        {/* Animated background grid */}
        <div className="absolute inset-0 grid-bg opacity-20" />

        {/*Floating animated blobs*/}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-600/25 to-cyan-600/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-tr from-purple-600/25 to-pink-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.2s" }} />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-b from-indigo-600/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2.4s" }} />
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-gradient-to-l from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.8s" }} />
        </div>

        {/* Animated particles/dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-particle ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 w-full z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-up mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur">
                <Sparkles className="h-3 w-3" /> Build With Us
              </span>
            </div>

            <h1 
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 heading-underline letter-spacing-animate"
              style={{ animationDelay: "0.2s" }}
            >
              What do you want to <span className="text-gradient-anim">build</span>?
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.3s" }}>
              Choose your project type and let's turn your vision into reality. Our expert team is ready to partner with you from concept to launch.
            </p>

            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: "0.4s" }}>
              <Link
                to="/schedule-consultation"
                className="btn-glow group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:shadow-elegant transition-all"
              >
                Schedule Consultation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT CARDS GRID */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/*Background animated elements*/}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-600/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-600/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Choose Your <span className="text-gradient">Perfect Solution</span>
            </h2>
            <p className="text-muted-foreground">
              Each option is customizable to your specific needs with our flexible engagement models
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.id}
                  className="group relative rounded-2xl overflow-hidden transition-all duration-500 animate-fade-up"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  {/* Card background with glassmorphism */}
                  <div className="absolute inset-0 bg-gradient-to-br from-card/60 via-card/40 to-background/20 backdrop-blur-xl border border-primary/20" />

                  {/* Permanent subtle gradient */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${project.gradient} rounded-full blur-3xl transition-all duration-500 group-hover:blur-2xl`} />

                  {/* Enhanced hover gradient */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${project.hoverGradient} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-125`} />

                  {/* Glowing animated accent line */}
                  <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 w-full" />

                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    background: "conic-gradient(from 0deg, transparent, rgba(0, 229, 255, 0.3), transparent 90%)",
                    filter: "blur(2px)",
                  }} />

                  <div className="relative z-10 p-8">
                    <div className="inline-flex p-3.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 text-accent mb-6 group-hover:scale-110 transition-transform duration-300 icon-float">
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold font-display mb-3 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* CTA Button */}
                    <Link
                      to="/schedule-consultation"
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary/80 to-accent/80 px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:shadow-elegant transition-all duration-300 group-hover:translate-x-1 hover:from-primary hover:to-accent"
                    >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Link>

                    {/* Floating accent element */}
                    <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${project.color} rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-500`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION - Animated Timeline */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-card/40" />
        
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-l from-purple-600/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="text-gradient">Proven Process</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A transparent, collaborative approach that ensures your vision comes to life
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="timeline-step"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex gap-6 relative">
                
                  {/* Step number */}
                  <div className="flex-shrink-0 pt-1">
                    <div className="step-number">{step.num}</div>
                  </div>

                  {/* Step content */}
                  <div className="flex-1 pb-8 pt-1 group">
                    <div className="relative rounded-2xl border border-border bg-card/50 backdrop-blur p-6 transition-all duration-300 hover:border-primary/50 hover:bg-card/70 card-glow">
                      <h3 className="text-xl font-bold font-display mb-2 group-hover:text-accent transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {step.desc}
                      </p>

                      {/* Animated checkmark */}
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-600/15 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-cyan-600/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            {[
              { icon: "⚡", title: "Fast Turnaround", desc: "Quick scoping and rapid development cycles" },
              { icon: "🔒", title: "Secure & Reliable", desc: "Enterprise-grade security and 99.9% uptime" },
              { icon: "📈", title: "Scalable Growth", desc: "Built to grow with your business needs" },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="text-center group animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300 inline-block">
                  {feature.icon}
                </div>
                <h3 className="font-display font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="relative rounded-3xl border border-primary/30 bg-gradient-hero p-12 md:p-16 text-center overflow-hidden scan-sweep">
            <div className="absolute inset-0 grid-bg opacity-30" />

            {/* Floating animated orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 glow-orb animate-glow-pulse" />
            <div className="absolute top-1/3 right-0 w-72 h-72 glow-orb opacity-50 animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

            <div className="relative animate-fade-up">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ready to get started?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Let's discuss your project needs and create a custom plan that aligns with your goals.
              </p>
              <Link
                to="/schedule-consultation"
                className="btn-glow inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow hover:shadow-elegant transition-all hover:scale-105"
              >
                Schedule a Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Sparkles } from "lucide-react";
