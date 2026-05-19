import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyComponent,
});

function PrivacyPolicyComponent() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0d1117] to-[#080e18] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        {/* Header with back button */}
        <div className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-40 bg-gradient-to-r from-[#0d1117]/95 to-[#0a0a0f]/95">
          <div className="mx-auto max-w-4xl px-5 py-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-400/30 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400/60 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-600/20 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-sm font-medium transition-all duration-300">Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl px-5 py-20">
          {/* Page Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-cyan-400 border border-white/10 mb-6">
              <Sparkles className="h-3 w-3" />
              Legal
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Privacy
              </span>{" "}
              Policy
            </h1>
            <p className="text-gray-400 text-lg">Last updated: January 2025</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Introduction */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nunc, eget aliquam nisl nunc vel nisl. Curabitur vitae lorem at elit fermentum facilisis. Integer ac nisl nec libero malesuada tincidunt. Donec vel justo sed sapien volutpat tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi.

              </p>
              <p className="text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nunc, eget aliquam nisl nunc vel nisl. Curabitur vitae lorem at elit fermentum facilisis. Integer ac nisl nec libero malesuada tincidunt. Donec vel justo sed sapien volutpat tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi.

              </p>
            </section>

            {/* Information We Collect */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Information We Collect</h2>
              <div className="space-y-6">
                <div className="border-l-2 border-cyan-400 pl-4">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Personal Information</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We collect information you voluntarily provide to us when you interact with our
                    services, such as your name, email address, phone number, company name, and any
                    other information you choose to provide during consultation bookings or
                    inquiries.
                  </p>
                </div>
                <div className="border-l-2 border-cyan-400 pl-4">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                    Automatically Collected Information
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla.

                  </p>
                </div>
                <div className="border-l-2 border-cyan-400 pl-4">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                    Cookies and Tracking Technologies
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    We use cookies and similar tracking technologies to enhance your browsing
                    experience, remember your preferences, and gather analytics about how you use
                    our website. You can control cookie preferences through your browser settings.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">How We Use Your Information</h2>
              <ul className="space-y-3">
                {[
                  "To provide, maintain, and improve our services and respond to your inquiries",
                  "To process consultation requests and provide you with relevant information",
                  "To send you promotional materials, newsletters, and updates (with your consent)",
                  "To analyze website usage patterns and optimize user experience",
                  "To comply with legal obligations and enforce our terms and conditions",
                  "To protect against fraud, security threats, and unauthorized access",
                  "To communicate with you about changes to our services or policies",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-400">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. However,
                we may share your information with:
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  "Service providers who assist us in operating our website and conducting our business",
                  "Business partners for joint marketing initiatives or services (with your consent)",
                  "Law enforcement or governmental agencies when required by law",
                  "Other parties in connection with company transactions or when necessary to protect our rights",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-400">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Data Security */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your personal
                information from unauthorized access, alteration, disclosure, or destruction. These
                measures include encryption, secure server infrastructure, and restricted access
                controls.
              </p>
              <p className="text-gray-400 leading-relaxed">
                However, no method of transmission over the internet is completely secure. While we
                strive to protect your information, we cannot guarantee absolute security. You
                acknowledge the inherent risks of transmitting information online.
              </p>
            </section>

            {/* Your Rights and Choices */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Your Rights and Choices</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                You have the following rights regarding your personal information:
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Access",
                    desc: "Request access to the personal information we have collected about you",
                  },
                  {
                    title: "Correction",
                    desc: "Request correction of any inaccurate or incomplete information",
                  },
                  {
                    title: "Deletion",
                    desc: "Request deletion of your personal information, subject to certain exceptions",
                  },
                  {
                    title: "Opt-Out",
                    desc: "Opt out of receiving marketing communications from us at any time",
                  },
                  {
                    title: "Portability",
                    desc: "Request a copy of your information in a portable format",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="border-l-2 border-blue-400 pl-4">
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Retention */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
              <p className="text-gray-400 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes
                outlined in this Privacy Policy, unless a longer retention period is required or
                permitted by law. When information is no longer needed, we securely delete or
                anonymize it. If you request deletion of your data, we will comply within the
                timeframe required by applicable law.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
              <p className="text-gray-400 leading-relaxed">
                Our services are not intended for children under the age of 13. We do not knowingly
                collect personal information from children under 13. If we become aware that we have
                collected information from a child under 13, we will take steps to delete such
                information and terminate the child's account.
              </p>
            </section>

            {/* Contact Us */}
            <section className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                If you have questions about this Privacy Policy, wish to exercise your rights, or
                have concerns about our privacy practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-400">
                <p>
                  <span className="text-cyan-400 font-semibold">Email:</span>{" "}
                  smartvendsystem@smartvend.ph
                </p>
                <p>
                  <span className="text-cyan-400 font-semibold">Company:</span> SmartVend System
                  Corporation
                </p>
              </div>
            </section>
            {/* Changes to Policy */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-400 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our
                practices, technology, legal requirements, or other factors. We will notify you of
                any material changes by updating the "Last Updated" date at the top of this policy.
                Your continued use of our services following the posting of changes constitutes your
                acceptance of those changes.
              </p>
            </section>
          </div>
        </div>
      </div>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group p-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-in fade-in slide-in-from-bottom-4"
          aria-label="Scroll to top"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 animate-pulse" />
          <ArrowUp className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      )}
    </div>
  );
}
