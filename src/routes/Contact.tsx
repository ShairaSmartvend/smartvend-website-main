import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Section } from "./Section";
import { Field } from "./Field";

export function Contact() {
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
            { icon: Phone, label: "Phone", value: "+63 (9) 171 802 216" },
            { icon: Mail, label: "Email", value: "smartvendsystem@gmail.com" },
            {
              icon: MapPin,
              label: "Office",
              value: "Unit 211 Jocfer Building, Commonwealth Ave. Quezon City",
            },
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
              <div className="w-full rounded-2xl overflow-hidden border border-border">
                <div className="rounded-2xl overflow-hidden border border-border w-full">
                  <iframe
                    title="SmartVend Office Location"
                    className="w-full h-[50vh] md:h-[70vh] grayscale contrast-125"
                    style={{ filter: "invert(0.9) hue-rotate(180deg) contrast(0.85)" }}
                    src="https://www.google.com/maps?q=Unit+211+Jocfer+Building+Commonwealth+Ave+Quezon+City&output=embed"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
