export function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
      <svg
        aria-hidden="true"
        className="mb-6 h-8 w-8 text-accent"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M9.17 6C5.76 6 3 8.76 3 12.17V18h6v-6H6.17C6.17 9.86 7.86 8 9.17 8V6zm11 0c-3.41 0-6.17 2.76-6.17 6.17V18h6v-6h-2.83c0-2.31 1.69-4.17 3-4.17V6z" />
      </svg>
      <blockquote className="flex-1 text-lg leading-relaxed text-foreground/90">
        “{quote}”
      </blockquote>
      <figcaption className="mt-8 border-t border-border pt-5">
        <div className="text-sm font-semibold text-foreground">{name}</div>
        <div className="text-xs uppercase tracking-widest text-muted">
          {role}
        </div>
      </figcaption>
    </figure>
  );
}
