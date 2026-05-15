import { useState, useEffect } from "react";
import { ArrowRight, Smartphone, Monitor } from "lucide-react";
import { Particles } from "@/components/site/Particles";
import heroImg from "@/assets/cleanIt.png";
import heroImg2 from "@/assets/POS.png";

export function Hero() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center pt-32 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0">
        <Particles />
      </div>
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-glow/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05]">
            Where Good <br />
            <span className="text-gradient">Ideas</span> Become <br />
            Great <span className="text-gradient">Systems</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl">
            We provide innovative, reliable, and user-friendly technology solutions designed to
            improve businesses and everyday services.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold bg-gradient-to-r from-primary to-cyan-glow text-background shadow-glow hover:shadow-glow-strong transition-all hover:scale-[1.03]"
            >
              Explore Services <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold glass neon-border hover:bg-primary/10 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-cyan-glow/20 blur-3xl rounded-full" />

          <div
            className="relative rounded-3xl overflow-hidden neon-border perspective-1000"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <div
              className={`relative transition-all duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
            >
              <div className="backface-hidden">
                <img
                  src={heroImg}
                  alt="CleanIt App Dashboard"
                  width={1536}
                  height={1024}
                  className="w-full h-auto"
                />
              </div>

              <div className="absolute inset-0 backface-hidden rotate-y-180">
                <img
                  src={heroImg2}
                  alt="POS System Dashboard"
                  width={1536}
                  height={1024}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <button
              onClick={() => setIsFlipped(false)}
              className={`w-2 h-2 rounded-full transition-all ${!isFlipped ? "w-4 bg-cyan-glow" : "bg-white/50"}`}
            />
            <button
              onClick={() => setIsFlipped(true)}
              className={`w-2 h-2 rounded-full transition-all ${isFlipped ? "w-4 bg-cyan-glow" : "bg-white/50"}`}
            />
          </div>

          <div className="absolute -top-6 -right-6 hidden sm:block">
            <div className="glass-strong rounded-2xl p-4 shadow-glow perspective-1000">
              <div
                className={`relative transition-all duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
              >
                <div className="backface-hidden">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 grid place-items-center rounded-lg bg-cyan-glow/20">
                      <Smartphone className="h-5 w-5 text-cyan-glow" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">CleanIt App</div>
                      <div className="text-xs text-muted-foreground">Launching June 2026</div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 grid place-items-center rounded-lg bg-cyan-glow/20">
                      <Monitor className="h-5 w-5 text-cyan-glow" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">POS System</div>
                      <div className="text-xs text-muted-foreground">Previous Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
