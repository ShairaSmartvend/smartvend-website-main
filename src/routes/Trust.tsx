import { ShieldCheck, ArrowRight } from "lucide-react";

export function Trust() {
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-5">
        <div className="glass rounded-2xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-cyan-glow" />
            <div>
              <div className="font-semibold">Trusted engineering, transparent process.</div>
              <div className="text-xs text-muted-foreground">
                Modern stack · Reliable delivery · Real support
              </div>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold glass neon-border hover:bg-primary/10 transition"
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
