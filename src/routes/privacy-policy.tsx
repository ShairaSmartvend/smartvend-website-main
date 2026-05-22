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
            <p className="text-gray-400 text-lg">Last updated: May 2026</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Introduction */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Privacy Policy</h2>
              <p className="text-gray-400 leading-relaxed">
                Smartvend System Corporation values and respects your privacy. This Privacy Policy
                explains how personal information is collected, used, and protected when using this
                website.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Information We Collect</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                The company may collect personal information such as:
              </p>
              <ul className="space-y-3">
                {[
                  "Full Name",
                  "Email Address",
                  "Contact Number",
                  "Business or inquiry details",
                  "Other information voluntarily submitted through forms or emails",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-400">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Use of Information */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Use of Information</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Collected information may be used for:
              </p>
              <ul className="space-y-3">
                {[
                  "Responding to inquiries and requests",
                  "Providing company services and support",
                  "Improving website functionality and user experience",
                  "Internal business and operational purposes",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-400">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Data Protection */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Data Protection</h2>
              <p className="text-gray-400 leading-relaxed">
                Smartvend System Corporation implements reasonable security measures to help protect
                personal information from unauthorized access, misuse, or disclosure.
              </p>
            </section>

            {/* Sharing of Information */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Sharing of Information</h2>
              <p className="text-gray-400 leading-relaxed">
                Personal information will not be sold or shared with third parties except when
                required by law or necessary for legitimate business operations.
              </p>
            </section>

            {/* Cookies and Website Data */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Cookies and Website Data</h2>
              <p className="text-gray-400 leading-relaxed">
                The website may use cookies or analytics tools to improve website performance and
                user experience.
              </p>
            </section>

            {/* User Rights */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">User Rights</h2>
              <p className="text-gray-400 leading-relaxed">
                Users may request correction or removal of their personal information by contacting
                the company directly.
              </p>
            </section>

            {/* Policy Updates */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Policy Updates</h2>
              <p className="text-gray-400 leading-relaxed">
                This Privacy Policy may be updated periodically without prior notice. Continued use
                of the website signifies acceptance of the updated policy.
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
                  info@smartvendsystem.ph
                </p>
                <p>
                  <span className="text-cyan-400 font-semibold">Company:</span> Smartvend System
                  Corporation
                </p>
              </div>
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
