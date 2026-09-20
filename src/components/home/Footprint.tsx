import Image from "next/image";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import type { HomePage } from "@/lib/content/types";
import ClientMarquee from "./ClientMarquee";

/**
 * The footprint band, built around a dotted world map: the map is the
 * argument the section is making — operating reach — so it sits behind the
 * heading as atmosphere rather than as a separate illustration. It is
 * anchored to the start edge and mirrors in Arabic along with everything
 * else.
 *
 * Three things share the band because they are one claim: who KDF is (the
 * heading), who trusts it (the scrolling client logos), and at what scale
 * (the figures). The figures sit below a hairline as supporting evidence
 * rather than as the headline they used to be.
 */
export default function Footprint({ content }: { content: HomePage["footprint"] }) {
  return (
    <section className="relative isolate overflow-hidden border-y border-cream-300 bg-cream-100">
      <div
        className="pointer-events-none absolute inset-y-0 inset-x-0 -z-10 mx-auto w-full max-w-[980px] opacity-[0.16]"
        aria-hidden="true"
      >
        {/* The source PNG's dots are a pale grey, which nearly vanished
            against the cream background even at high opacity — brightness(0)
            forces every dot to solid black (its own alpha shape is
            untouched), then the low opacity above brings it back to a
            subtle but clearly visible dark watermark rather than a barely
            legible light-on-light one. Centred horizontally in the section
            (mx-auto on the wrapper, object-center here) rather than
            anchored to the start edge — the same in both directions, so
            no rtl override is needed. */}
        <Image
          src="/images/world-dot.png"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 980px"
          className="object-contain object-center [filter:brightness(0)]"
        />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 py-10 lg:py-12">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
          <div className="max-w-md">
            <Reveal
              as="p"
              className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-signal-600"
            >
              {content.eyebrow}
            </Reveal>
            <Reveal
              as="h2"
              delay={90}
              className="mt-5 text-[1.75rem] leading-[1.2] font-semibold text-balance text-brand-950 sm:text-[2rem]"
            >
              {content.title}
            </Reveal>
            <Reveal
              variant="rule"
              delay={320}
              className="mt-6 block h-[3px] w-20 rounded-full bg-signal-500"
            />
            <Reveal as="p" delay={200} className="mt-6 text-sm leading-relaxed text-brand-500">
              {content.clientsLead}
            </Reveal>
          </div>

          <Reveal delay={260}>
            <ClientMarquee clients={content.clients} />
          </Reveal>
        </div>

        {/* Centred as its own band rather than inheriting the start-edge
            alignment of the heading column above it — each figure is
            centred in its own cell too, so the row reads as an
            independent strip of numbers at every width, including the
            two-up mobile layout. */}
        <dl className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 border-t border-cream-300 pt-6 text-center sm:grid-cols-4 lg:mt-8">
          {content.stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 120} className="flex flex-col items-center">
              <dd className="order-1 font-mono text-4xl leading-none font-semibold text-brand-950 lg:text-5xl">
                <CountUp value={stat.value} />
                {stat.suffix}
              </dd>
              <dt className="order-2 mt-3 text-sm leading-snug text-brand-500">{stat.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
