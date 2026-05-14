import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Cpu,
  Sparkles,
  ShieldCheck,
  Headphones,
  Rocket,
  Network,
  Smartphone,
  Eye,
  Target,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Send,
  CheckCircle2,
  Monitor,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Particles } from "@/components/site/Particles";
import heroImg from "@/assets/cleanIt.png";
import heroImg2 from "@/assets/POS.png";
import teamImg from "@/assets/team-img.png";
import cleanItLogo from "@/assets/cleanit-logo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMARTVEND SYSTEM CORPORATION — Smart Digital Solutions" },
      {
        name: "description",
        content:
          "SMARTVEND SYSTEM CORP. delivers innovative IT services and the CleanIt on-demand cleaning platform for modern businesses in the Philippines.",
      },
      { property: "og:title", content: "SMARTVEND SYSTEM CORPORATION" },
      {
        property: "og:description",
        content: "Smart digital solutions for modern businesses.",
      },
    ],
  }),
  component: HomePage,
});

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        {(eyebrow || title) && (
          <div className="mb-14 max-w-3xl">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.25em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-cyan" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-4 text-base md:text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function Hero() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Auto flip both image and card at the same time every 4 seconds
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center pt-32 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0">
        <Particles />
      </div>
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-glow/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Smartvend System Corporation
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05]">
            Where Good <br />
            <span className="text-gradient">Ideas</span> Become <br />
            Great <span className="text-gradient">Systems</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl">
            We provide innovative, reliable, and user-friendly technology solutions designed to
            improve businesses and everyday services.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold bg-gradient-to-r from-primary to-cyan-glow text-background shadow-glow hover:shadow-glow-strong transition-all hover:scale-[1.03]"
            >
              Explore Services <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold glass neon-border hover:bg-primary/10 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-cyan-glow/20 blur-3xl rounded-full" />

          {/* 3D Flip Container for Images */}
          <div
            className="relative rounded-3xl overflow-hidden neon-border perspective-1000"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <div
              className={`relative transition-all duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
            >
              {/* Front Image - CleanIt */}
              <div className="backface-hidden">
                <img
                  src={heroImg}
                  alt="CleanIt App Dashboard"
                  width={1536}
                  height={1024}
                  className="w-full h-auto"
                />
              </div>

              {/* Back Image - POS System */}
              <div className="absolute inset-0 backface-hidden rotate-y-180">
                <img
                  src={heroImg2}
                  alt="POS System Dashboard"
                  width={1536}
                  height={1024}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>

          {/* Flip Indicator Dots for Images */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <button
              onClick={() => setIsFlipped(false)}
              className={`w-2 h-2 rounded-full transition-all ${!isFlipped ? "w-4 bg-cyan-glow" : "bg-white/50"}`}
            />
            <button
              onClick={() => setIsFlipped(true)}
              className={`w-2 h-2 rounded-full transition-all ${isFlipped ? "w-4 bg-cyan-glow" : "bg-white/50"}`}
            />
          </div>

          {/* 3D Flip Card for CleanIt / POS System Text - Same size and style */}
          <div className="absolute -top-6 -right-6 hidden sm:block">
            <div className="glass-strong rounded-2xl p-4 shadow-glow perspective-1000">
              <div
                className={`relative transition-all duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
              >
                {/* Front Side - CleanIt App */}
                <div className="backface-hidden">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 grid place-items-center rounded-lg bg-cyan-glow/20">
                      <Smartphone className="h-5 w-5 text-cyan-glow" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">CleanIt App</div>
                      <div className="text-xs text-muted-foreground">Launching June 2026</div>
                    </div>
                  </div>
                </div>

                {/* Back Side - POS System */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 grid place-items-center rounded-lg bg-cyan-glow/20">
                      <Monitor className="h-5 w-5 text-cyan-glow" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">POS System</div>
                      <div className="text-xs text-muted-foreground">Previous Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { icon: Calendar, v: "2025", l: "Startup Founded" },
    { icon: Sparkles, v: "Innovative", l: "Digital Solutions" },
    { icon: Rocket, v: "Growing", l: "Technology Company" },
    { icon: Headphones, v: "Reliable", l: "Customer Support" },
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

function History() {
  const events = [
    {
      year: "2025",
      title: "The company was founded",
      body: "On January 25, the company was established through the shared dream and vision of two former classmates who aspired to build something meaningful together. What began as a simple idea rooted in friendship, determination, and ambition gradually became the foundation of the organization.",
    },
    {
      year: "2026",
      title: "CleanIt app launches",
      body: "This April, one of the company's major milestones will be introduced to the public through the launch of the CleanIt app — a continuous step in providing convenient and reliable cleaning service solutions to more people effectively.",
    },
  ];

  return (
    <Section id="history" eyebrow="Our History" title="Milestones that shaped us.">
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
        <div className="space-y-12">
          {events.map((e, i) => (
            <div
              key={e.year}
              className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${
                i % 2 === 1 ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-primary shadow-glow ring-4 ring-background" />
              <div className="pl-12 md:pl-0 md:pr-12 md:text-right [direction:ltr]">
                <div className="inline-block text-5xl md:text-6xl font-bold text-gradient">
                  {e.year}
                </div>
              </div>
              <div className="pl-12 md:pl-12 mt-3 md:mt-0 [direction:ltr]">
                <div className="glass rounded-2xl p-6 glow-hover">
                  <h3 className="font-semibold text-lg">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function VisionMission() {
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

function Services() {
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

function Portfolio() {
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

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something smart together."
      subtitle="Reach out and our team will get back to you shortly."
    >
      <div className="grid lg:grid-cols-5 gap-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 4000);
          }}
          className="lg:col-span-3 glass-strong rounded-3xl p-6 md:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" type="text" placeholder="Your name" />
            <Field label="Email" type="email" placeholder="you@company.com" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Message
            </label>
            <textarea
              required
              rows={6}
              placeholder="Tell us about your project..."
              className="mt-2 w-full rounded-xl bg-background/40 border border-primary/25 px-4 py-3 outline-none focus:border-primary focus:shadow-glow transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold bg-gradient-to-r from-primary to-cyan-glow text-background shadow-glow hover:shadow-glow-strong transition-all hover:scale-[1.02]"
          >
            {sent ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Message sent
              </>
            ) : (
              <>
                Send Message <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          {[
            { icon: Phone, label: "Phone", value: "+63 XXX XXX XXXX" },
            { icon: Mail, label: "Email", value: "hello@smartvend.ph" },
            { icon: MapPin, label: "Office", value: "Metro Manila, Philippines" },
          ].map((c) => (
            <div key={c.label} className="glass rounded-2xl p-5 glow-hover flex items-start gap-4">
              <div className="h-11 w-11 grid place-items-center rounded-xl bg-primary/15 text-cyan-glow">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {c.label}
                </div>
                <div className="mt-1 font-medium">{c.value}</div>
              </div>
            </div>
          ))}
          <div className="glass rounded-2xl overflow-hidden neon-border aspect-[4/3] relative">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <MapPin className="h-7 w-7 text-cyan-glow mx-auto" />
                <p className="mt-2 text-sm text-muted-foreground">Map placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl bg-background/40 border border-primary/25 px-4 py-3 outline-none focus:border-primary focus:shadow-glow transition"
      />
    </div>
  );
}

function Trust() {
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-5">
        <div className="glass rounded-2xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-cyan-glow" />
            <div>
              <div className="font-semibold">Trusted engineering, transparent process.</div>
              <div className="text-xs text-muted-foreground">
                Modern stack · Reliable delivery · Real support
              </div>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold glass neon-border hover:bg-primary/10 transition"
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <About />
        <History />
        <VisionMission />
        <Services />
        <Trust />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
