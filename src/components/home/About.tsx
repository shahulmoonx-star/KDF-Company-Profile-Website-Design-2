import Image from "next/image";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import type { HomePage } from "@/lib/content/types";

/**
 * "About KDF" - the section right after the Hero. A light, editorial
 * treatment that sits on the same cream body colour as the rest of the
 * page: a single photograph carrying a "Since {foundedYear}" corner
 * ribbon, paired with a heading, one justified paragraph, and all seven
 * figures shown together in one evenly weighted row.
 */
export default function About({ content }: { content: HomePage["about"] }) {
  return (
    <section
      id="about"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-cream-50 py-20 sm:py-24 lg:py-16"
    >
      {/* Soft orange glow - the section's one accent of colour beyond the
          photograph. Purely decorative. */}
      <div
        className="pointer-events-none absolute -top-24 end-0 h-[420px] w-[420px] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: "radial-gradient(circle, #f56501 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-14 xl:gap-20">
          {/* ---- photo ---- */}
          <Reveal variant="fade" className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-[0_40px_80px_-32px_rgba(17,24,29,0.35)]">
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                sizes="(max-width: 1024px) 84vw, 480px"
                className="object-cover"
              />

              {/* "Since 1966" corner ribbon */}
              <div className="absolute -end-14 top-9 w-52 rotate-45 bg-signal-500 py-2 text-center shadow-[0_8px_20px_rgba(0,0,0,0.25)] rtl:-rotate-45">
                <span className="text-[13px] font-bold tracking-[0.08em] text-cream-50 uppercase">
                  Since {content.foundedYear}
                </span>
              </div>
            </div>
          </Reveal>

          {/* ---- content ---- */}
          <div>
            <Reveal
              as="p"
              className="font-mono text-[11px] font-bold tracking-[0.3em] text-signal-600 uppercase"
            >
              {content.eyebrow}
            </Reveal>

            <Reveal
              as="h2"
              delay={90}
              className="mt-5 max-w-xl text-[1.9rem] leading-[1.18] font-semibold text-balance text-brand-950 sm:text-4xl lg:text-[2.6rem]"
            >
              {content.title}
            </Reveal>

            <Reveal
              as="p"
              delay={200}
              className="mt-6 text-justify text-[15.5px] leading-relaxed text-brand-500 sm:text-base"
            >
              {content.description}
            </Reveal>

            {/* all seven figures, one evenly weighted row. flex-wrap (not a
                4-column grid) so the trailing 3 items on the second row
                centre as their own group instead of hugging the start
                edge under an invisible 4th column. */}
            <dl className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-8 border-t border-cream-300 pt-10 text-center">
              {content.stats.map((stat, index) => (
                <Reveal key={stat.id} delay={280 + index * 70} className="w-[calc(50%-0.75rem)] sm:w-[calc(25%-1.125rem)]">
                  <dd className="font-sans text-[1.9rem] leading-none font-bold text-brand-950 tabular-nums sm:text-[2.1rem]">
                    {stat.display ?? (
                      <>
                        <CountUp value={stat.value} />
                        {stat.suffix}
                      </>
                    )}
                  </dd>
                  <dt className="mx-auto mt-2.5 min-h-[2.4em] max-w-[9rem] text-[12px] leading-snug font-medium text-balance text-brand-500">
                    {stat.label}
                  </dt>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
