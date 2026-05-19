import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Section } from "./Section";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 4000);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    // Phone number validation: numbers only, max 12 characters
    if (name === "phone") {
      const numbersOnly = value.replace(/[^0-9]/g, "");
      if (numbersOnly.length <= 12) {
        setFormData({ ...formData, [name]: numbersOnly });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFocus = field => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <Section
      id="contact"
      eyebrow="Get in Touch"
      title="Let's build something smart together."
      subtitle="Reach out and our team will get back to you shortly."
    >
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Side - Company Info and Map */}
        <div className="space-y-8">
          {/* Contact Details */}
          <div className="space-y-4">
            {[
              {
                icon: Phone,
                label: "Phone",
                value: "+63 (9) 171 802 216",
                href: "tel:+639171802216",
                detail: "Mon-Fri, 9AM - 6PM",
              },
              {
                icon: Mail,
                label: "Email",
                value: "smartvendsystem@gmail.com",
                href: "mailto:smartvendsystem@gmail.com",
                detail: "24/7 Support",
              },
              {
                icon: MapPin,
                label: "Office",
                value: "Unit 211 Jocfer Building, Commonwealth Ave. Quezon City",
                href: "https://maps.google.com/?q=Unit+211+Jocfer+Building+Commonwealth+Ave+Quezon+City",
                detail: "Metro Manila, Philippines",
              },
            ].map((c, idx) => (
              <a
                key={c.label}
                href={c.href}
                target={c.label === "Office" ? "_blank" : undefined}
                rel={c.label === "Office" ? "noopener noreferrer" : undefined}
                className="group relative block overflow-hidden rounded-2xl border border-cyan-400/30 bg-card/90 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                {/* Moving highlight effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full group-active:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />

                {/* Click ripple effect */}
                <div className="absolute inset-0 bg-cyan-400/0 transition-all duration-300 group-active:bg-cyan-400/5" />

                <div className="relative p-5">
                  <div className="flex items-start gap-5">
                    <div className="h-12 w-12 rounded-xl bg-cyan-400/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <c.icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {c.label}
                      </div>
                      <div className="mt-1 text-foreground font-semibold group-hover:text-cyan-400 transition-colors">
                        {c.value}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{c.detail}</div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Map */}
          <div className="w-full rounded-2xl overflow-hidden shadow-lg mt-6">
            <iframe
              title="SmartVend Office Location"
              className="w-full h-96 md:h-[400px] transition-all duration-700"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.042187804405!2d121.074789!3d14.706762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b06e5b3f2b6d%3A0x2c5c3f8e9a1b2c3d!2sJocfer%20Building%2C%20Commonwealth%20Ave%2C%20Quezon%20City%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right Side - Form Card */}
        <div className="relative">
          <div className="sticky top-24">
            <div className="rounded-2xl border border-cyan-400/30 bg-card/90 p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground">Send us a message</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Fill out the form and we'll get back to you within 24 hours
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-muted-foreground mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      {focusedField === "name" && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/40 to-blue-900/60 rounded-lg blur-md" />
                      )}
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={handleBlur}
                        required
                        placeholder="Juan Dela Cruz"
                        className="relative w-full rounded-lg border border-cyan-400/30 bg-background/80 px-4 py-3 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 z-10"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-muted-foreground mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      {focusedField === "email" && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg blur-md" />
                      )}
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        required
                        placeholder="juan@gmail.com"
                        className="relative w-full rounded-lg border border-cyan-400/30 bg-background/80 px-4 py-3 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 z-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-muted-foreground mb-2">
                    Phone Number (Max 12 digits)
                  </label>
                  <div className="relative">
                    {focusedField === "phone" && (
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg blur-md" />
                    )}
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus("phone")}
                      onBlur={handleBlur}
                      placeholder="09123456789"
                      className="relative w-full rounded-lg border border-cyan-400/30 bg-background/80 px-4 py-3 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 z-10"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-muted-foreground mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    {focusedField === "message" && (
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg blur-md" />
                    )}
                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus("message")}
                      onBlur={handleBlur}
                      rows={5}
                      placeholder="Tell us about your project or inquiry..."
                      className="relative w-full rounded-lg border border-cyan-400/30 bg-background/80 px-4 py-3 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 resize-none z-10"
                    />
                  </div>
                </div>

                {/* Send Message Button - Subtle Effects */}
                <div className="relative w-full">
                  <button
                    type="submit"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98]"
                  >
                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div className="relative flex items-center justify-center gap-2">
                      {sent ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Message Sent!</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send
                            className={`h-4 w-4 transition-transform duration-300 ${
                              isHovering ? "translate-x-0.5 -translate-y-0.5" : ""
                            }`}
                          />
                        </>
                      )}
                    </div>
                  </button>
                </div>

                {/* Success Message Toast */}
                {sent && (
                  <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Thank you!</p>
                        <p className="text-sm">We'll respond within 24 hours</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </Section>
  );
}
