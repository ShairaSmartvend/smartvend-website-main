import { CheckCircle2, ArrowRight } from "lucide-react";
import { Section } from "./Section";
import posproject from "@/assets/pos.png";
import cleanitapp from "@/assets/cleanIt.png";
import cleanitweb from "@/assets/cleanit_web.png";
import adminweb from "@/assets/cleanItadmin.png";
import { Reveal } from "@/components/ui/Reveal";

export function Portfolio() {
  const projects = [
    {
      img: posproject,
      tag: "Cloud-Based POS Platform",
      name: "POS System",
      body: "A point-of-sale system that enables real-time sales tracking, inventory management, and secure multi-device access. It also supports card payments, card loading services, and fast, reliable transaction processing for a seamless checkout experience.",
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
      body: "CleanIt is a home services platform that connects users with trusted service providers through a simple and secure mobile app. It enables real-time booking, service tracking, and secure payments for a smooth and reliable experience.",
      features: [
        "Booking System",
        "Field Dispatch",
        "Real-time Updates",
        "Verified Service Providers",
      ],

      link: "https://play.google.com/store/apps/details?id=com.cleanit.activities",
      linkText: "Download on Android",

      link2: "https://apps.apple.com/ph/app/clean-it-mobile-app/id6774019021",
      linkText2: "Download on iOS",
    },
    {
      img: cleanitweb,
      tag: "Website",
      name: "CleanIt Website",
      body: "CleanIt is a modern informational website that showcases professional home services with clear insights into available offerings and credibility. It also allows users to explore services and apply as service providers.",
      features: [
        "Service Information",
        "Company Profile",
        "Cleaning Solutions Overview",
        "Trusted Service Provider",
      ],
      link: "https://cleanit.business/",
      linkText: "Learn More",
    },
    {
      img: adminweb,
      tag: "Website",
      name: "CleanIt Admin Panel",
      body: "CleanIt Admin Panel is a centralized management system designed to help administrators efficiently monitor bookings, manage service providers, track services, and oversee overall platform operations in real time.",
      features: [
        "Booking Management",
        "Service providers Monitoring",
        "Service Tracking Dashboard",
        "Administrative Controls",
      ],
      link: null,
      linkText: "View Project",
    },
  ];

  return (
    <Section
      id="portfolio"
      eyebrow="Our Portfolio"
      title="Solutions designed for real impact."
      subtitle="Built with reliable engineering and designed for smooth, user-friendly experiences."
      className="pt-10 md:pt-2"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Reveal
            key={index}
            direction={index % 2 === 0 ? "left" : "right"}
            delay={index * 80}
            once
          >
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] border border-cyan-400/50 bg-card hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-400 h-full flex flex-col"
            >
              {/* Lighting effects */}
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl group-hover:bg-primary/40 transition duration-500" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition duration-500" />
              {/* Image Section */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/5 to-cyan-glow/5 flex-shrink-0">
                <img
                  src={project.img}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  alt={`${project.name} project`}
                />

                {/* Tag badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-[11px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-cyan-glow font-semibold border border-white/10">
                    {project.tag}
                  </span>
                </div>
              </div>

              {/* Content Section - flex-grow ensures equal height */}
              <div className="relative p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="mt-2 text-muted-foreground leading-relaxed text-sm line-clamp-3">
                  {project.body}
                </p>

                {/* Features */}
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

                {/* Buttons - untouched */}
                <div className="mt-5 flex flex-wrap gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:text-primary ${
                        project.linkText === "Download on Android" ||
                        (project.linkText === "Learn More" && project.name === "CleanIt Website")
                          ? "shiny-button rounded-full px-4 py-3 text-white"
                          : "text-primary group-hover:gap-3"
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="relative z-10">{project.linkText}</span>

                      <ArrowRight className="relative z-10 h-4 w-4" />
                    </a>
                  )}

                  {project.link2 && (
                    <a
                      href={project.link2}
                      className="shiny-button rounded-full px-4 py-3 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="relative z-10">{project.linkText2}</span>

                      <ArrowRight className="relative z-10 h-4 w-4" />
                    </a>
                  )}

                  {!project.link && !project.link2 && (
                    <div>
                      <span className="inline-flex items-center gap-2 text-xs text-muted-foreground/50">
                        {/* Coming soon */}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
