export function Field({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl bg-background/40 border border-primary/25 px-4 py-3 outline-none focus:border-primary focus:shadow-glow transition"
      />
    </div>
  );
}
