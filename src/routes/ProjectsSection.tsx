import { useRef, useEffect } from "react";
import {
  Code2,
  Smartphone,
  Zap,
  Cloud,
  Palette,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export function ProjectsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add("revealed");
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: "web",
      title: "Web Development",
      description:
        "High-performance web applications built with modern frameworks, optimized for speed, security, and scalability.",
      icon: Code2,
      gradient: "from-blue-500/20 to-cyan-500/20",
      hoverGradient: "from-blue-600/40 to-cyan-500/40",
      color: "from-blue-600 to-cyan-500",
    },
    {
      id: "mobile",
      title: "Mobile App Development",
      description:
        "Native iOS and Android applications with intuitive interfaces and seamless performance across all devices.",
      icon: Smartphone,
      gradient: "from-purple-500/20 to-pink-500/20",
      hoverGradient: "from-purple-600/40 to-pink-500/40",
      color: "from-purple-600 to-pink-500",
    },
    {
      id: "pos",
      title: "POS Systems",
      description:
        "Comprehensive point-of-sale solutions for retail and service businesses with real-time inventory management.",
      icon: Zap,
      gradient: "from-orange-500/20 to-red-500/20",
      hoverGradient: "from-orange-600/40 to-red-500/40",
      color: "from-orange-600 to-red-500",
    },
    {
      id: "cloud",
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure on AWS, GCP, and Azure with monitoring, security, and optimization.",
      icon: Cloud,
      gradient: "from-sky-500/20 to-blue-500/20",
      hoverGradient: "from-sky-600/40 to-blue-600/40",
      color: "from-sky-600 to-blue-600",
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive interfaces designed for conversion that blend aesthetics with functionality.",
      icon: Palette,
      gradient: "from-pink-500/20 to-rose-500/20",
      hoverGradient: "from-pink-600/40 to-rose-600/40",
      color: "from-pink-600 to-rose-600",
    },
    {
      id: "custom",
      title: "Custom Software Development",
      description:
        "Bespoke solutions tailored to your unique business needs, from ideation through deployment and support.",
      icon: Cpu,
      gradient: "from-indigo-500/20 to-blue-500/20",
      hoverGradient: "from-indigo-600/40 to-blue-600/40",
      color: "from-indigo-600 to-blue-600",
    },
  ];

  const processSteps = [
    { num: "1", title: "Discovery", desc: "We learn about your vision and requirements in detail" },
    { num: "2", title: "Strategy", desc: "We create a detailed roadmap and timeline for success" },
    { num: "3", title: "Development", desc: "We build with agility, transparency, and excellence" },
    { num: "4", title: "Launch", desc: "We deploy and support your growth and success" },
  ];

  return (
    <section id="projects" className="relative py-24 px-5 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-600/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-600/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.25em] text-primary mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-cyan" />
            Build With Us
          </div>
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What do you want to <span className="text-gradient">build</span>?
          </h2>
          <p className="text-muted-foreground">
            Choose your project type and let's turn your vision into reality. Each option is
            customizable to your specific needs with our flexible engagement models.
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
                <div className="absolute inset-0 bg-gradient-to-br from-card/60 via-card/40 to-background/20 backdrop-blur-xl border border-primary/20" />
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${project.gradient} rounded-full blur-3xl transition-all duration-500 group-hover:blur-2xl`}
                />
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${project.hoverGradient} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-125`}
                />
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 w-full" />
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, rgba(0, 229, 255, 0.3), transparent 90%)",
                    filter: "blur(2px)",
                  }}
                />

                <div className="relative z-10 p-8">
                  <div className="inline-flex p-3.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-display mb-3 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary/80 to-accent/80 px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:shadow-elegant transition-all duration-300 group-hover:translate-x-1 hover:from-primary hover:to-accent"
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
                  </a>

                  <div
                    className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${project.color} rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-500`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Timeline */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Our <span className="text-gradient">Proven Process</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A transparent, collaborative approach that ensures your vision comes to life
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="group animate-fade-up"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0 pt-1">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-cyan-glow text-background font-bold flex items-center justify-center shadow-glow">
                      {step.num}
                    </div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="relative rounded-2xl border border-primary/20 bg-card/50 backdrop-blur p-5 transition-all duration-300 hover:border-primary/50 hover:bg-card/70">
                      <h4 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">{step.desc}</p>
                      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
