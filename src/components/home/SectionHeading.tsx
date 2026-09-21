import Reveal from "@/components/motion/Reveal";

/**
 * The heading block every band on the homepage opens with: an eyebrow, a
 * title, an orange rule that draws itself, and an optional lead paragraph.
 * Keeping it in one place is what makes the bands read as one page rather
 * than eight separately designed ones.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <div className="max-w-3xl">
      <Reveal
        as="p"
        className={`font-mono text-[11px] font-bold uppercase tracking-[0.3em] ${
          dark ? "text-signal-400" : "text-signal-600"
        }`}
      >
        {eyebrow}
      </Reveal>

      <Reveal
        as="h2"
        delay={90}
        className={`mt-5 text-[1.9rem] leading-[1.18] font-semibold text-balance sm:text-4xl ${
          dark ? "text-cream-50" : "text-brand-950"
        }`}
      >
        {title}
      </Reveal>

      <Reveal
        variant="rule"
        delay={380}
        className="mt-7 block h-[3px] w-20 rounded-full bg-signal-500"
      />

      {lead && (
        <Reveal
          as="p"
          delay={240}
          className={`mt-7 text-base leading-relaxed ${dark ? "text-brand-200" : "text-brand-500"}`}
        >
          {lead}
        </Reveal>
      )}
    </div>
  );
}
