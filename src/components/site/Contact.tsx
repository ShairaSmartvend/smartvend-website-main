import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const formatPhoneDisplay = (raw: string) => {
    if (!raw) return "";
    if (raw.length <= 4) return raw;
    if (raw.length <= 7) return raw.slice(0, 4) + " " + raw.slice(4);
    return raw.slice(0, 4) + " " + raw.slice(4, 7) + " " + raw.slice(7, 11);
  };

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      setError("Email service not configured. Please contact support.");
      setIsLoading(false);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      to_name: "Smartvend",
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams);
      setSent(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error("Error sending email:", err);
      setError("Failed to send message. Please try again later.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numbersOnly = value.replace(/\D/g, "");
      if (numbersOnly.length <= 11) {
        setFormData({ ...formData, phone: numbersOnly });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  return (
    // Using a plain section instead of the Section component to avoid overflow issues
    <section id="contact" className="py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm uppercase tracking-wider text-cyan-400 font-semibold">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Let's build something smart together.
          </h2>
          <p className="text-muted-foreground">
            Reach out and our team will get back to you shortly.
          </p>
        </div>

        {/* 
          CRITICAL: 
          - This grid container has NO overflow property.
          - The right column's parent (lg:sticky) will now work.
          - Left column wrapper ensures proper alignment with sticky form card.
        */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN – scrolls naturally with proper alignment */}
          <Reveal direction="up" delay={0} once>
            <div className="flex flex-col space-y-8">
              {/* Contact Cards */}
              <div className="space-y-4">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+63 (9) 171 802 216",
                    detail: "Monday - Friday, 9AM - 5PM",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "info@smartvendsystem.tech",
                    detail: "24/7 Support",
                  },
                  {
                    icon: MapPin,
                    label: "Office",
                    value: "Unit 211 Jocfer Building, Commonwealth Ave. Quezon City",
                    href: "https://www.google.com/maps/search/Jocfer+Building/@14.672824,121.076996,17z",
                    detail: "Metro Manila, Philippines",
                  },
                ].map(c => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.label === "Office" ? "_blank" : undefined}
                    rel={c.label === "Office" ? "noopener noreferrer" : undefined}
                    className="group relative block overflow-hidden rounded-2xl border border-cyan-400/30 bg-card/90 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />
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

              {/* Map – fixed height */}
              <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  title="SmartVend Office Location"
                  className="w-full h-96 md:h-96 transition-all duration-700"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1926.8134253856176!2d121.0769961424699!3d14.672824055072091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b74afcf4461b%3A0x318f1a6946597505!2sJOCFER%20Building!5e0!3m2!1sen!2sph!4v1779330533550!5m2!1sen!2sph"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          {/* RIGHT COLUMN – Sticky card with improved alignment */}
          <Reveal direction="up" delay={100} once>
            {/* 
              The sticky wrapper: 
              - lg:sticky lg:top-32 (adjusted offset for better alignment)
              - The parent container (grid) has no overflow, so sticky works.
              - Positioned to align with the map section below contact cards
            */}
            <div className="lg:sticky lg:top-32" style={{ position: "sticky", top: "8rem" }}>
              <div className="rounded-2xl border border-cyan-400/30 bg-card/90 p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-foreground">Send us a message</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="relative">
                      <label className="block text-sm font-semibold text-muted-foreground mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        {focusedField === "name" && (
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 to-primary/70 rounded-lg blur-md" />
                        )}
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus("name")}
                          onBlur={handleBlur}
                          required
                          disabled={isLoading}
                          placeholder="Juan Dela Cruz"
                          className="relative w-full rounded-lg border border-cyan-400/30 bg-background/80 px-4 py-3 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-semibold text-muted-foreground mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        {focusedField === "email" && (
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 to-primary/70 rounded-lg blur-md" />
                        )}
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus("email")}
                          onBlur={handleBlur}
                          required
                          disabled={isLoading}
                          placeholder="juan@gmail.com"
                          className="relative w-full rounded-lg border border-cyan-400/30 bg-background/80 px-4 py-3 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-muted-foreground mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      {focusedField === "phone" && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 to-primary/70 rounded-lg blur-md" />
                      )}
                      <input
                        type="tel"
                        name="phone"
                        value={formatPhoneDisplay(formData.phone)}
                        onChange={handleChange}
                        onFocus={() => handleFocus("phone")}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        placeholder="0912 345 6789"
                        className="relative w-full rounded-lg border border-cyan-400/30 bg-background/80 px-4 py-3 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-muted-foreground mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      {focusedField === "message" && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 to-primary/70 rounded-lg blur-md" />
                      )}
                      <textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => handleFocus("message")}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        rows={5}
                        placeholder="Tell us about your project or inquiry..."
                        className="relative w-full rounded-lg border border-cyan-400/30 bg-background/80 px-4 py-3 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 resize-none z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-500 bg-red-500/10 rounded-lg p-3 text-sm border border-red-500/30">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="relative w-full">
                    <button
                      type="submit"
                      disabled={isLoading}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <div className="relative flex items-center justify-center gap-2">
                        {sent ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Message Sent!</span>
                          </>
                        ) : isLoading ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>Sending...</span>
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
                </form>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Success Toast */}
        {sent && (
          <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5" />
              <div>
                <p className="font-semibold">Thanks for contacting us!</p>
                <p className="text-sm">We’ll reply as soon as possible.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
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
    </section>
  );
}
