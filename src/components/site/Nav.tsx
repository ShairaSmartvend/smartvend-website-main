import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`mx-auto max-w-7xl px-5 ${scrolled ? "" : ""}`}>
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all ${
            scrolled ? "glass-strong shadow-glow" : "bg-transparent"
          }`}
        >
          <a href="#home" className="flex items-center gap-2 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-cyan-glow shadow-glow">
              <span className="text-background font-display font-extrabold">S</span>
              <span className="absolute inset-0 rounded-lg blur-md bg-primary/40 group-hover:bg-primary/70 transition" />
            </span>
            <div className="leading-tight">
              <div className="font-display font-bold tracking-tight text-sm sm:text-base">
                SMARTVEND
              </div>
              <div className="text-[10px] sm:text-[11px] text-muted-foreground tracking-[0.2em]">
                SYSTEM CORP.
              </div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg relative group transition"
              >
                {l.label}
                <span className="absolute left-4 right-4 -bottom-0.5 h-px scale-x-0 group-hover:scale-x-100 origin-left bg-gradient-to-r from-cyan-glow to-primary transition-transform duration-300" />
              </a>
            ))}
          </nav>

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
              <span className="sr-only">Toggle menu</span>
              <div className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-foreground" />
                <span className="block h-0.5 w-5 bg-foreground" />
                <span className="block h-0.5 w-5 bg-foreground" />
              </div>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-3 animate-fade-up">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-primary/10 text-sm"
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
