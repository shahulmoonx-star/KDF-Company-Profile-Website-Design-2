import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import type { HomePage } from "@/lib/content/types";

/**
 * Treat / Protect / Assure — rebuilt to be carried by its photographs
 * rather than by its copy.
 *
 * The first version of this section put a small landscape photo on top of a
 * navy plate and filled the plate with a number, a title, a sentence and a
 * row of tags. Too much reading for what is really a three-word idea, and
 * the picture was the smallest part of it. Here the proportions are
 * reversed: each stage is a tall 4:5 portrait plate, and the only words on
 * the page are the stage's own name and the chemistry it covers.
 *
 * `content.lead` is deliberately not rendered. It stays in the content
 * model (the CMS field and the API contract are unchanged, and it is still
 * available for the interior Production Technologies page) — the homepage
 * simply does not need a paragraph to introduce three words.
 *
 * The composition device is the overlapping plaque: a cream card pulled up
 * over the foot of each photograph so the two overlap instead of stacking.
 * That is what keeps this from reading as a repeat of the Solutions wall a
 * few bands up, which is landscape, full-bleed and sets its type *inside*
 * the image.
 *
 * Photographs are the reference build's own
 * (design/kdf-kuwait-fluid-spark-main) service-production /
 * service-technical / service-water shots, copied in as
 * home-treat-1.jpg / home-protect-1.jpg / home-assure-1.jpg. They are
 * content, so replacing them is a home.ts edit, not a change here.
 */
export default function ProductionTechnologies({ content }: { content: HomePage["production"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-cream-100">
      {/* A warm brand glow bleeding down from the top edge, so the band
          reads as lit rather than as a flat sheet of cream. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-[radial-gradient(75%_100%_at_50%_0%,rgba(245,101,1,0.16),transparent_72%)]"
      />

      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div>
            <Reveal
              as="p"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal-600"
            >
              {content.eyebrow}
            </Reveal>

            {/* The heading is the three stage names — there is no separate
                title field, because any other wording would be saying the
                same thing twice. Only the full stops are brand orange: it
                punctuates the sequence without picking a favourite stage. */}
            <Reveal
              as="h2"
              delay={90}
              className="mt-4 text-[2.15rem] leading-[1.03] font-semibold tracking-tight text-balance text-brand-950 sm:text-5xl lg:text-[3.4rem]"
            >
              {content.pillars.map((pillar, index) => (
                <span key={pillar.id}>
                  <span className="whitespace-nowrap">
                    {pillar.title}
                    <span className="text-signal-500">.</span>
                  </span>
                  {index < content.pillars.length - 1 ? " " : null}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal
            variant="rule"
            delay={380}
            className="hidden h-[3px] w-24 shrink-0 rounded-full bg-signal-500 sm:mb-3 sm:block rtl:origin-right"
          />
        </div>

        <div className="mt-12 grid gap-9 sm:grid-cols-3 sm:gap-5 lg:mt-14 lg:gap-7">
          {content.pillars.map((pillar, index) => (
            <Reveal key={pillar.id} delay={260 + index * 130} className="group relative">
              <div className="relative overflow-hidden rounded-[28px] bg-brand-950 shadow-[0_26px_64px_-36px_rgba(17,24,29,0.65)]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={pillar.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.08]"
                  />

                  {/* Top-down only at the head, and a deeper foot so the
                      plaque has something to sit against. Nothing over the
                      middle of the frame, which is the part worth seeing. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-b from-brand-950/55 via-transparent to-brand-950/45"
                  />

                  {/* The stage number, outlined rather than filled — it
                      belongs to the photograph without competing with it,
                      then fills brand orange on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute start-6 top-5 font-mono text-[46px] leading-none font-bold text-cream-50/15 transition-colors duration-500 group-hover:text-signal-500/80 [-webkit-text-stroke:1.5px_rgba(253,251,247,0.8)]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* The same measure that draws under every heading on the
                      site, here as the hover response. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[4px] origin-left scale-x-0 bg-signal-500 transition-transform duration-[620ms] ease-out group-hover:scale-x-100 rtl:origin-right"
                  />
                </div>
              </div>

              <div className="relative z-10 mx-4 -mt-16 rounded-[20px] border border-cream-300 bg-cream-50 p-5 shadow-[0_20px_46px_-28px_rgba(17,24,29,0.5)] transition-transform duration-[620ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5 sm:mx-5">
                <div className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-signal-500" />
                  <h3 className="text-[1.45rem] leading-none font-semibold tracking-tight text-brand-950">
                    {pillar.title}
                  </h3>
                </div>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {pillar.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] leading-none text-brand-500 ring-1 ring-cream-300 transition-colors duration-500 group-hover:ring-signal-200"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
