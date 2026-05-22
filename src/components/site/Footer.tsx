import { Facebook, Instagram, Mail, FileText, Shield } from "lucide-react";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
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
  { icon: FaTiktok, href: "#", label: "TikTok", color: "hover:text-pink-500" },
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-600" },
  { icon: FaXTwitter, href: "#", label: "X", color: "hover:text-gray-400" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-primary/20 mt-20">
      {/* Shining line effect at the top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      {/* Shine animation keyframes for logo */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
        .animate-shine {
          animation: shine 2.5s infinite linear;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-14 lg:gap-y-8">
          {/* Column 1 – Brand (with logo shine) */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-13 w-13 items-center justify-center rounded-lg bg-white shadow-md overflow-hidden">
                <div className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
                <img
                  src={logoSVSC}
                  className="h-12 w-12 object-contain relative z-10"
                  alt="SmartVend Logo"
                />
              </span>
              <div>
                <div className="font-display font-bold text-white">SMARTVEND</div>
                <div className="text-[10px] tracking-[0.2em] text-muted-foreground">
                  SYSTEM CORPORATION
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Smart digital solutions for modern businesses — built with purpose, designed for
              impact.
            </p>
            <div className="w-full border-t border-white/20"></div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <a
                // href="mailto:info@smartvendsystem.ph"
                className="hover:text-primary transition-colors cursor-text"
              >
                info@smartvendsystem.ph
              </a>
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-base">Quick Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {links.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="hover:text-primary transition-colors duration-300 hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Legal */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-base">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {legalLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 hover:text-primary transition-colors duration-300 hover:underline"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4 – Socials (original glass styling preserved) */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-base">Follow Us</h4>
            <p className="text-sm text-muted-foreground mb-5">
              Connect with us on social media for updates and news.
            </p>
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
                    <Icon className="h-4 w-4 text-sky-600" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-xs text-muted-foreground">
          © 2025 SMARTVEND SYSTEM CORPORATION. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
