import Image from "next/image";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "./SectionHeading";
import type { HomePage } from "@/lib/content/types";

/**
 * "About KDF" — the section right after the Hero, opening the page's case
 * with scale rather than description: seven figures instead of a paragraph
 * of prose. Deliberately not a photographic backdrop like the loading
 * screen or Sustainability's card deck: the brief asked for the imagery
 * framing the numbers from the sides, not sitting behind them, so the dark
 * instrument-panel band (bg-brand-950 + the same blueprint grid motif
 * Sustainability uses, just in the cool navy register instead of orange)
 * stays the one continuous surface the eye reads first, with a photograph
 * standing in each margin like a frame around it.
 *
 * One viewport tall on desktop (min-h-screen, not a hard h-screen — content
 * that's taller than the viewport at extreme zoom/font-size settings should
 * still be reachable, not clipped) and its natural stacked height on
 * phones, where seven stats need more room than one screen comfortably
 * gives.
 */
export default function About({ content }: { content: HomePage["about"] }) {
  const stats = content.stats;

  return (
    <section className="relative isolate overflow-hidden bg-brand-950 min-h-screen flex items-center py-16 lg:py-0">
      {/* blueprint grid backdrop, same motif as Sustainability's but in the
          cool brand register rather than orange, since this band is dark
          rather than cream. */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(253,251,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(253,251,247,1) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden="true"
      />
      {/* A soft orange glow low in the frame — the one warm accent in an
          otherwise cool, technical band, echoing the brand rule under the
          heading rather than competing with it. */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-[0.14] pointer-events-none"
        style={{
          background: "radial-gradient(60% 60% at 50% 100%, #f56501 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)_minmax(0,220px)] lg:gap-8 lg:px-10 xl:grid-cols-[minmax(0,280px)_minmax(0,1fr)_minmax(0,280px)]">
        {/* left flanking image — hidden below lg, since a phone-width column
            has no room to frame anything without crowding the stats. */}
        <Reveal
          variant="fade"
          className="relative hidden aspect-[3/4] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] lg:block"
        >
          <Image
            src={content.imageStart}
            alt={content.imageStartAlt}
            fill
            sizes="280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
          <span className="absolute inset-x-0 bottom-0 h-1 bg-signal-500" aria-hidden="true" />
        </Reveal>

        {/* center: heading + stat grid */}
        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="mx-auto flex flex-col items-center">
            <SectionHeading eyebrow={content.eyebrow} title={content.title} lead={content.lead} tone="dark" />
          </div>

          <dl className="mx-auto mt-12 flex flex-wrap justify-center gap-x-8 gap-y-10 lg:mt-14 lg:gap-x-10">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.id}
                delay={120 + index * 90}
                className="relative flex w-[calc(50%-16px)] flex-col items-center border-t-2 border-white/10 pt-5 sm:w-[calc(33.333%-22px)] lg:w-[calc(33.333%-27px)]"
              >
                <dd className="font-mono text-[2.1rem] leading-none font-bold text-cream-50 sm:text-4xl lg:text-[2.6rem]">
                  {stat.display ?? (
                    <>
                      <CountUp value={stat.value} />
                      {stat.suffix}
                    </>
                  )}
                </dd>
                <dt className="mt-3 max-w-[9rem] text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-300 sm:text-xs">
                  {stat.label}
                </dt>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* right flanking image */}
        <Reveal
          variant="fade"
          delay={140}
          className="relative hidden aspect-[3/4] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] lg:block"
        >
          <Image
            src={content.imageEnd}
            alt={content.imageEndAlt}
            fill
            sizes="280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
          <span className="absolute inset-x-0 bottom-0 h-1 bg-signal-500" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}
