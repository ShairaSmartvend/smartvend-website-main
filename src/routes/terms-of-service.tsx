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
              of Service
            </h1>
            <p className="text-gray-400 text-lg">Last updated: January 2025</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Introduction */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Terms of Service Agreement</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you
                ("User" or "you") and SmartVend System Corporation ("Company," "we," "us," or
                "our"). By accessing, using, or browsing our website and services, you agree to be
                bound by these Terms. If you do not agree to any part of these Terms, you may not
                use our services.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective
                immediately upon posting to the website. Your continued use of our services
                following the posting of changes constitutes your acceptance of those changes.
              </p>
            </section>

            {/* Use License */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">License to Use</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                We grant you a limited, non-exclusive, non-transferable, and revocable license to
                access and use our website and services for lawful purposes only. This license does
                not permit you to:
              </p>
              <ul className="space-y-3">
                {[
                  "Modify or copy any materials from our services",
                  "Use materials for any commercial purpose or for any public display",
                  "Attempt to decompile or reverse engineer any code on our services",
                  "Remove any copyright or other proprietary notations from materials",
                  "Transfer materials to another person or 'mirror' materials on another server",
                  "Violate any applicable laws or regulations",
                  "Use our services to harass, abuse, or threaten any person",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-400">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Intellectual Property Rights */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Intellectual Property Rights</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                All content on our website, including text, graphics, logos, images, audio, video,
                and software, is the property of SmartVend System Corporation or our content
                suppliers and is protected by international copyright laws. The compilation and
                arrangement of all content on our website is our exclusive property.
              </p>
              <p className="text-gray-400 leading-relaxed">
                You are granted a limited license to print or download materials from our website
                for personal, non-commercial use only. All other use of the content on our website
                is prohibited without our prior written permission.
              </p>
            </section>

            {/* User Responsibilities */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">User Responsibilities</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                As a user of our services, you agree to:
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Accurate Information",
                    desc: "Provide accurate, current, and complete information when using our services",
                  },
                  {
                    title: "Account Security",
                    desc: "Maintain the confidentiality of your account credentials and be responsible for all activities under your account",
                  },
                  {
                    title: "Legal Use",
                    desc: "Use our services only for lawful purposes and in a way that does not infringe upon the rights of others",
                  },
                  {
                    title: "No Interference",
                    desc: "Not interfere with or disrupt the normal operation of our services or servers",
                  },
                  {
                    title: "Harmful Content",
                    desc: "Not submit any content that is illegal, threatening, abusive, defamatory, obscene, or otherwise objectionable",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="border-l-2 border-cyan-400 pl-4">
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Services Description */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Services Description</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                SmartVend System Corporation provides a range of digital solutions including:
              </p>
              <ul className="space-y-2 mb-6 text-gray-400">
                {[
                  "Web development and design services",
                  "Mobile application development",
                  "Point-of-sale (POS) system solutions",
                  "Cloud infrastructure and solutions",
                  "UI/UX design services",
                  "Custom software development",
                  "Consultation and strategy services",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 leading-relaxed">
                While we strive to provide high-quality services, we make no warranties or
                guarantees about the results or outcomes of our services.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                To the fullest extent permitted by law, SmartVend System Corporation shall not be
                liable for any indirect, incidental, special, consequential, or punitive damages
                resulting from:
              </p>
              <ul className="space-y-2 mb-4 text-gray-400">
                {[
                  "Your use of or inability to use our services",
                  "Loss of profits, data, or business opportunities",
                  "Unauthorized access to or alteration of your information",
                  "Statements or conduct of any third party",
                  "Any other matter relating to our services",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 leading-relaxed text-sm bg-white/5 border border-white/10 rounded-lg p-4">
                <span className="font-semibold text-cyan-400">Note:</span> Some jurisdictions do not
                allow the exclusion or limitation of certain damages, so this limitation may not
                apply to you.
              </p>
            </section>

            {/* Indemnification */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Indemnification</h2>
              <p className="text-gray-400 leading-relaxed">
                You agree to indemnify, defend, and hold harmless SmartVend System Corporation and
                its officers, directors, employees, and agents from any claims, damages, losses,
                liabilities, and expenses arising from your use of our services, your violation of
                these Terms, or your infringement of any rights of a third party.
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer of Warranties</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Our services are provided on an "AS IS" and "AS AVAILABLE" basis without warranties
                of any kind, express or implied, including:
              </p>
              <ul className="space-y-2 text-gray-400">
                {[
                  "Implied warranties of merchantability or fitness for a particular purpose",
                  "Warranties of title, non-infringement, or accuracy of content",
                  "Warranties that services will meet your requirements or be uninterrupted",
                  "Warranties that any defects will be corrected",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Termination */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We reserve the right to terminate or suspend your access to our services at any
                time, with or without cause, with or without notice. Reasons for termination may
                include, but are not limited to:
              </p>
              <ul className="space-y-2 mb-4 text-gray-400">
                {[
                  "Violation of these Terms of Service",
                  "Illegal or fraudulent activity",
                  "Abuse of our services or resources",
                  "Violation of applicable laws or regulations",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 leading-relaxed">
                Upon termination, your right to use our services will immediately cease, and any
                content posted by you may be removed from our servers.
              </p>
            </section>

            {/* Governing Law */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
              <p className="text-gray-400 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the
                laws of the jurisdiction in which SmartVend System Corporation is located, without
                regard to its conflict of law provisions. You agree to submit to the exclusive
                jurisdiction of the courts located in that jurisdiction.
              </p>
            </section>

            {/* Severability */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Severability</h2>
              <p className="text-gray-400 leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, that
                provision shall be severed, and the remaining provisions shall remain in full force
                and effect. The invalid provision shall be modified to the minimum extent necessary
                to make it valid and enforceable.
              </p>
            </section>

            {/* Contact Information */}
            <section className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                If you have questions about these Terms of Service or need to report a violation,
                please contact us:
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

            {/* Entire Agreement */}
            <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Entire Agreement</h2>
              <p className="text-gray-400 leading-relaxed">
                These Terms of Service, along with our Privacy Policy and any other policies or
                agreements referenced herein, constitute the entire agreement between you and
                SmartVend System Corporation regarding the use of our services. These Terms
                supersede all prior negotiations, understandings, and agreements, whether written or
                oral, regarding the same subject matter.
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
