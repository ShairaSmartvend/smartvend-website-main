export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        {(eyebrow || title) && (
          <div className="mb-14 max-w-3xl">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.25em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-cyan" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-4 text-base md:text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
