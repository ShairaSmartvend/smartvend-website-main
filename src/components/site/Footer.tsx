import {
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  MapPin,
  FileText,
  Shield,
  Scale,
} from "lucide-react";
import logoSVSC from "@/assets/logo-svsc-main.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy", icon: Shield },
  { href: "/terms-of-service", label: "Terms of Service", icon: FileText },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-600" },
  { icon: Github, href: "#", label: "GitHub", color: "hover:text-gray-400" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-primary/20 mt-20">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-14">
        {/* Main Footer Grid */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-14 w-14 items-center justify-center rounded-lg bg-white shadow-glow overflow-hidden">
                {/* Automatic continuous diagonal shining effect */}
                <div className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-blue-400/60 to-transparent skew-x-[-20deg]" />
                <img
                  src={logoSVSC}
                  className="h-13 w-13 object-contain relative z-10"
                  alt="SmartVend Logo"
                />
              </span>
              <div>
                <div className="font-display font-bold text-white">SMARTVEND</div>
                <div className="text-[11px] tracking-[0.2em] text-muted-foreground">
                  SYSTEM CORPORATION
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Smart digital solutions for modern businesses — built with purpose, designed for
              impact.
            </p>

            {/* Social Icons - Below Brand Section */}
            <div className="pt-2">
              <div className="flex gap-3">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      aria-label={social.label}
                      className={`h-10 w-10 grid place-items-center rounded-lg glass glow-hover transition-all duration-300 hover:scale-110 ${social.color}`}
                    >
                      <Icon className={`h-4 w-4 ${social.textColor || "text-blue-600"}`} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {links.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="hover:text-primary transition-colors duration-300 hover:pl-1"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {legalLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 hover:text-primary transition-colors duration-300 hover:pl-1"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:smartvendsystem@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  smartvendsystem@smartvend.ph
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-muted-foreground">
          © 2025 SMARTVEND SYSTEM CORPORATION. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
