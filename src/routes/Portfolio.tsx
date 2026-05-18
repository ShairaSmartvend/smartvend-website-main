import { CheckCircle2, ArrowRight } from "lucide-react";
import { Section } from "./Section";
import cleanItLogo from "@/assets/cleanit-logo.jpg";
import posproject from "@/assets/pos_project.png";
import cleanitapp from "@/assets/cleanIt.png";

export function Portfolio() {
  const projects = [
    {
      img: posproject,
      tag: "Cloud-Based POS Platform",
      name: "POS System",
      body: "A cloud-based point-of-sale system that enables real-time sales tracking, inventory management, and secure data access across multiple devices.",
      features: [
        "Real-time Sales Tracking",
        "Inventory Management",
        "Multi-device Access",
        "Secure Data",
      ],
      link: null,
      linkText: "View Project",
    },
    {
      img: cleanitapp,
      tag: "Mobile App",
      name: "CleanIt",
      body: "CleanIt makes home cleaning effortless by connecting you with trusted, professional cleaners through a simple and secure mobile app.",
      features: ["Booking System", "Field Dispatch", "Real-time Updates", "Verified Cleaners"],
      link: "https://cleanit.business/",
      linkText: "Learn More",
    },
  ];

  return (
    <Section
      id="portfolio"
      eyebrow="Our Portfolio"
      title="Solutions designed for real impact."
      subtitle="Two flagship offerings that combine reliable engineering with thoughtful, user-friendly experiences."
    >
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative glass rounded-2xl overflow-hidden glow-hover transition-all duration-500 hover:scale-[1.02]"
          >
            {/* Lighting effects */}
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl group-hover:bg-primary/40 transition duration-500" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition duration-500" />
            
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/5 to-cyan-glow/5">
              <img
                src={project.img}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                alt={`${project.name} project`}
              />

              {/* Tag badge - Larger and more prominent */}
              <div className="absolute top-3 right-3">
                <span className="text-[11px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-cyan-glow font-semibold border border-white/10">
                  {project.tag}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative p-5">
              {/* Title - Larger */}
              <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                {project.name}
              </h3>

              {/* Description */}
              <p className="mt-2 text-muted-foreground leading-relaxed text-sm line-clamp-3">
                {project.body}
              </p>

              {/* Features - Same design as header tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-full bg-primary/10 text-cyan-glow font-medium border border-primary/20"
                  >
                    <CheckCircle2 className="h-3 w-3 text-cyan-glow" />
                    {feature}
                  </span>
                ))}
              </div>

              {/* Conditional Link */}
              {project.link ? (
                <a
                  href={project.link}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.linkText} <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <div className="mt-5">
                  <span className="inline-flex items-center gap-2 text-xs text-muted-foreground/50">
                    Coming soon
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}