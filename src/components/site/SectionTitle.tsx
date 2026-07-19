type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  center = false,
}: SectionTitleProps) {
  return (
    <div className={center ? "text-center" : "text-left"}>
      <p className="font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-bold text-[#111111]">{title}</h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-2xl text-black/60">{description}</p>
      ) : null}
    </div>
  );
}
