import {
  Code2,
  Smartphone,
  Palette,
  Cloud,
  Cpu,
  Wrench,
  Database,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Monitor,
} from "lucide-react";
import { Section } from "./Section";

export function Services() {
  const services = [
    {
      icon: Code2,
      title: "Web Development",
      desc: "Modern and responsive websites and web applications built for speed, performance, and accessibility.",
      points: ["Responsive Design", "Fast Performance", "Modern Frameworks"],
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      desc: "Custom mobile applications for Android and iOS with smooth performance and user-friendly experiences.",
      points: ["Android & iOS", "Cross-Platform Apps", "App Optimization"],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      desc: "Clean and intuitive designs focused on creating better experiences for users across all devices.",
      points: ["Wireframing", "Modern Interfaces", "User Experience"],
    },
    // {
    //   icon: Cloud,
    //   title: "Cloud Solutions",
    //   desc: "Cloud hosting, deployment, and scalable infrastructure solutions for modern applications and systems.",
    //   points: ["Cloud Hosting", "Deployment", "Scalable Infrastructure"],
    // },
    {
      icon: Cpu,
      title: "API Development",
      desc: "Secure and scalable APIs that connect websites, mobile apps, desktop software, and third-party services.",
      points: ["REST APIs", "System Integration", "Secure Authentication"],
    },
    {
      icon: Monitor,
      title: "Desktop Application Development",
      desc: "Custom desktop applications for Windows and macOS built for productivity, automation, and business operations.",
      points: ["Windows & macOS", "Business Software", "System Automation"],
    },
    {
      icon: Wrench,
      title: "System Maintenance",
      desc: "Continuous monitoring, updates, and support to keep your systems secure, stable, and running smoothly.",
      points: ["24/7 Monitoring", "Performance Optimization", "Technical Support"],
    },
    {
      icon: Database,
      title: "Data Engineering",
      desc: "Reliable data systems and infrastructure for storing, processing, and managing business information efficiently.",
      points: ["Data Pipelines", "Database Management", "Real-Time Processing"],
    },
    {
      icon: BarChart3,
      title: "Analytics & BI",
      desc: "Dashboards and reporting tools that help businesses track performance and make smarter decisions.",
      points: ["Custom Dashboards", "Business Reports", "Data Visualization"],
    },
    {
      icon: Sparkles,
      title: "Digital Strategy",
      desc: "Technology planning and digital solutions that help businesses improve operations and achieve their goals.",
      points: ["Technology Consulting", "Business Solutions", "Project Planning"],
    },
  ];

  return (
    <Section
      id="services"
      eyebrow="OUR SERVICES"
      title="Everything you need to build, ship, and scale."
      subtitle="A modern technology partner offering deep expertise across every layer of the stack."
    >
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="group relative rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-cyan-400/50 bg-card hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-400"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl group-hover:bg-primary/40 transition" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 grid place-items-center rounded-2xl bg-gradient-to-br from-primary to-cyan-400 shadow-glow">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-cyan-400 font-semibold">
                  {service.title.split(" ")[0].toUpperCase()}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-white">{service.title}</h3>
              <p className="mt-3 text-gray-300 leading-relaxed">{service.desc}</p>
              <ul className="mt-5 space-y-2">
                {service.points.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
