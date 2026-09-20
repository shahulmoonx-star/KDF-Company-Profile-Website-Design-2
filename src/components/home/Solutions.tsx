"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "./SectionHeading";
import type { HomePage } from "@/lib/content/types";

/**
 * The three disciplines as an expanding wall of photographs: each is a
 * full-bleed image panel, and opening one widens it (or, on a phone, grows
 * it downward) while the other two collapse to a spine showing just their
 * number and title.
 *
 * **The section's height never changes.** That was the defect in the
 * previous version — the detail panel was sized by its own content, so
 * switching between a discipline with eight capabilities and one with four
 * made the whole page jump. Here the geometry is fixed and the content
 * fits inside it: on desktop the row has a set height and the panels trade
 * *width* (flex-grow), which cannot affect the section's height at all; on
 * mobile the open and closed heights are both fixed, so any combination of
 * one-open-two-closed sums to exactly the same total.
 *
 * Capabilities are a marked list rather than pills: the production-chemistry
 * entries are full clauses ("Protect — scale, corrosion, hydrate &
 * asphaltene inhibitors"), and text that long inside a rounded pill wraps
 * into an unreadable blob at phone widths.
 *
 * Photography is placeholder — see the note in home.ts. Swapping in the
 * real images is a content edit, not a change here.
 */
export default function Solutions({ content }: { content: HomePage["solutions"] }) {
  const [activeId, setActiveId] = useState(content.items[0].id);

  return (
    <section className="relative isolate overflow-hidden bg-cream-50">
      {/* The rig sits in the empty space beside the heading, top end corner,
          at full strength — no fade, no desaturation. Anchored by its top
          edge so the platform and derrick (the part worth seeing) land in
          that gap, with the leg running down behind the panels. Behind
          everything via -z-10 against the section's own stacking context,
          so the opaque panels simply cover the leg. lg and up only: below
          that there is no empty space for it to occupy. */}
      <div
        className="pointer-events-none absolute -top-6 end-[-50px] -z-10 hidden w-[330px] lg:block xl:w-[390px]"
        aria-hidden="true"
      >
        <Image
          src="/images/shape-2.webp"
          alt=""
          width={1920}
          height={1920}
          className="h-auto w-full"
        />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:py-16">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} lead={content.lead} />

        <Reveal variant="up" delay={120} className="mt-10 block">
          <div className="flex flex-col gap-3 lg:h-[560px] lg:flex-row lg:gap-4">
            {content.items.map((item, index) => {
              const isActive = item.id === activeId;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-expanded={isActive}
                  className={`group relative overflow-hidden rounded-[22px] text-start transition-[height,flex-grow] duration-[620ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                    isActive
                      ? "h-[460px] lg:h-full lg:flex-[2.6_1_0%]"
                      : "h-[104px] lg:h-full lg:flex-[1_1_0%]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className={`object-cover transition-transform duration-[1400ms] ease-out ${
                      isActive ? "scale-110" : "scale-100 group-hover:scale-105"
                    }`}
                  />

                  {/* Deeper over the open panel, which carries body copy;
                      lighter over the closed spines, which carry only a
                      title and can let more of the photograph through. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive
                        ? "bg-gradient-to-t from-brand-950 via-brand-950/70 to-brand-950/25"
                        : "bg-gradient-to-t from-brand-950/95 via-brand-950/55 to-brand-950/30"
                    }`}
                  />

                  {/* The measure drawing itself across the open panel —
                      the same rule motif as the loading screen and the
                      section headings. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-signal-500 transition-transform duration-[620ms] ease-out rtl:origin-right ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />

                  <div className="relative flex h-full flex-col justify-end p-5 sm:p-7 lg:p-8">
                    <span className="font-mono text-[11px] tabular-nums tracking-[0.22em] text-signal-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3
                      className={`mt-2 font-semibold text-balance text-cream-50 transition-all duration-500 ${
                        isActive ? "text-xl lg:text-[1.7rem]" : "text-lg lg:text-xl"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <div
                      className={`overflow-hidden transition-all duration-[620ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                        isActive ? "mt-5 max-h-[340px] opacity-100" : "mt-0 max-h-0 opacity-0"
                      }`}
                    >
                      <p className="max-w-xl text-sm leading-relaxed text-brand-200">
                        {item.strap}
                      </p>

                      <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                        {item.capabilities.map((capability, capabilityIndex) => (
                          <li
                            key={capability}
                            style={{
                              transitionDelay: isActive
                                ? `${220 + capabilityIndex * 55}ms`
                                : "0ms",
                            }}
                            className={`flex items-start gap-2.5 text-[13px] leading-snug text-brand-200 transition-all duration-500 ${
                              isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-signal-500"
                            />
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
