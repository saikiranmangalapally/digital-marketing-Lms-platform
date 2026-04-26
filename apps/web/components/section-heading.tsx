export function SectionHeading({
  eyebrow,
  title,
  body
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">{eyebrow}</div>
      <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="text-base leading-7 text-slate sm:text-lg">{body}</p>
    </div>
  );
}
