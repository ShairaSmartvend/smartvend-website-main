import { useEffect, useState } from "react";
import logoSVSC from "@/assets/logo-svsc-main.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    const handleActiveSection = () => {
      let current = "#home";

      // Check each main section
      for (const link of links) {
        const section = document.querySelector(link.href);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        const buffer = 150;

        if (rect.top <= buffer && rect.bottom >= buffer) {
          current = link.href;
          break;
        }
      }

      // Check ALL About sub-sections (History AND Mission & Vision)
      const aboutSection = document.querySelector("#about");
      const historySection = document.querySelector("#history");
      const missionVisionSection = document.querySelector("#mission-vision");

      const missionSection = document.querySelector("#mission");
      const visionSection = document.querySelector("#vision");
      const missionAndVision = document.querySelector("#mission-and-vision");

      const scrollY = window.scrollY;

      const isElementInView = (element: Element | null) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      };

      const isInAbout =
        isElementInView(aboutSection) ||
        isElementInView(historySection) ||
        isElementInView(missionVisionSection) ||
        isElementInView(missionSection) ||
        isElementInView(visionSection) ||
        isElementInView(missionAndVision);

      if (aboutSection && !isInAbout) {
        const aboutRect = aboutSection.getBoundingClientRect();
        const aboutTop = aboutRect.top + window.scrollY;
        const aboutBottom = aboutRect.bottom + window.scrollY;

        if (scrollY >= aboutTop - 100 && scrollY < aboutBottom) {
          setActive("#about");
          return;
        }
      }

      if (isInAbout) {
        current = "#about";
      }

      setActive(current);
    };

    const onScrollCombined = () => {
      onScroll();
      handleActiveSection();
    };

    onScrollCombined();

    window.addEventListener("scroll", onScrollCombined);
    return () => window.removeEventListener("scroll", onScrollCombined);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all ${
            scrolled ? "glass-strong shadow-glow" : "bg-transparent"
          }`}
        >
          {/* LOGO - BIGGER SIZE, NO HOVER EFFECT */}
          <a href="#home" className="flex items-center gap-3">
            <span className="relative flex h-16 w-16 items-center justify-center rounded-lg bg-white shadow-glow overflow-hidden">
              {/* Automatic continuous diagonal shining effect */}
              <div className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-blue-400/60 to-transparent skew-x-[-20deg]" />

              <img src={logoSVSC} className="h-12 w-12 object-contain relative z-10" />
            </span>

            <div className="leading-tight">
              <div className="font-display font-bold tracking-tight text-base sm:text-lg">
                SMARTVEND
              </div>
              <div className="text-[11px] sm:text-xs text-muted-foreground tracking-[0.2em]">
                SYSTEM CORPORATION
              </div>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`px-4 py-2 text-sm rounded-lg relative group transition ${
                  active === l.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}

                {/* UNDERLINE - consistent for all nav items */}
                <span
                  className={`absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-cyan-glow to-primary transition-transform duration-300 origin-left ${
                    active === l.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-primary to-cyan-glow text-background shadow-glow hover:shadow-glow-strong transition-all hover:scale-[1.03]"
            >
              Get Started
            </a>

            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden h-10 w-10 grid place-items-center rounded-lg glass"
            >
              <div className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-foreground" />
                <span className="block h-0.5 w-5 bg-foreground" />
                <span className="block h-0.5 w-5 bg-foreground" />
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-3 animate-fade-up">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm ${
                  active === l.href
                    ? "bg-primary/10 text-foreground"
                    : "hover:bg-primary/10 text-muted-foreground"
                }`}
              >
                {l.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block text-center rounded-lg px-4 py-3 text-sm font-semibold bg-gradient-to-r from-primary to-cyan-glow text-background"
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
