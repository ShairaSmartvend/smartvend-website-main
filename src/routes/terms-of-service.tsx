import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfServiceComponent,
});

function TermsOfServiceComponent() {
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
                Terms
              </span>{" "}
              and Agreement
            </h1>
            <p className="text-gray-400 text-lg">Last updated: May 2026</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Introduction */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Terms and Agreement</h2>
              <p className="text-gray-400 leading-relaxed">
                By accessing and using this website, you agree to comply with the following Terms
                and Agreement. If you do not agree with any part of these terms, please discontinue
                use of the website.
              </p>
            </section>

            {/* Website Use */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Website Use</h2>
              <p className="text-gray-400 leading-relaxed">
                This website is intended to provide information about Smartvend System Corporation,
                its services, systems, and digital solutions. Users agree to use the website only
                for lawful purposes and must not attempt to damage, disrupt, or gain unauthorized
                access to the website or its systems.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Intellectual Property</h2>
              <p className="text-gray-400 leading-relaxed">
                All website content, including logos, text, graphics, images, software, and designs
                are owned by Smartvend System Corporation and protected by applicable intellectual
                property laws. Unauthorized use, copying, or distribution is prohibited.
              </p>
            </section>

            {/* Information and Services */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Information and Services</h2>
              <p className="text-gray-400 leading-relaxed">
                The company reserves the right to modify, update, or remove website content and
                services at any time without prior notice. Information provided on the website is
                for general informational purposes only.
              </p>
            </section>

            {/* User Submissions */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">User Submissions</h2>
              <p className="text-gray-400 leading-relaxed">
                Any information submitted through forms, applications, or inquiries must be accurate
                and lawful. Smartvend System Corporation reserves the right to review submitted
                information for business and operational purposes.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Limitation of Liability</h2>
              <p className="text-gray-400 leading-relaxed">
                Smartvend System Corporation shall not be liable for any damages, technical issues,
                interruptions, data loss, or unauthorized access resulting from the use of this
                website.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Third-Party Links</h2>
              <p className="text-gray-400 leading-relaxed">
                The website may contain links to third-party websites. Smartvend System Corporation
                is not responsible for the content, policies, or services of external websites.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Changes to Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                These Terms and Agreement may be updated at any time without prior notice. Continued
                use of the website means acceptance of any revisions.
              </p>
            </section>

            {/* Contact Us */}
            <section className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                If you have questions about these Terms and Agreement, please contact us:
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
