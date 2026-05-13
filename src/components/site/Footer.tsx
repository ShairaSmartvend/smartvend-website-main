import { Github, Linkedin, Twitter, Facebook } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-primary/20 mt-20">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="mx-auto max-w-7xl px-5 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 grid place-items-center rounded-lg bg-gradient-to-br from-primary to-cyan-glow text-background font-display font-extrabold shadow-glow">
              S
            </span>
            <div>
              <div className="font-display font-bold">SMARTVEND</div>
              <div className="text-[11px] tracking-[0.2em] text-muted-foreground">SYSTEM CORP.</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            Smart digital solutions for modern businesses — built with purpose, designed for impact.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-primary transition-colors">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <div className="flex gap-3">
            {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="h-10 w-10 grid place-items-center rounded-lg glass glow-hover"
              >
                <Icon className="h-4 w-4 text-primary" />
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">hello@smartvend.ph</p>
        </div>
      </div>
      <div className="border-t border-primary/15">
        <div className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-muted-foreground">
          © 2025 SMARTVEND SYSTEM CORPORATION. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
