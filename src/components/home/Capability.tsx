import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "./SectionHeading";
import type { HomePage } from "@/lib/content/types";

/**
 * The one dark band on the page — the industrial middle, where the figures
 * are large enough to carry it. Each gauge is an outer element sized to its
 * share of the row, with a Reveal inside scaling from zero, so the fill
 * animates with the same machinery as every other rule on the page.
 */
export default function Capability({ content }: { content: HomePage["capability"] }) {
  return (
    <section className="bg-brand-950">
      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:py-16">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          lead={content.lead}
          tone="dark"
        />

        <div className="mt-10 flex flex-col">
          {content.items.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 110}
              className="grid gap-5 border-t border-brand-800 py-8 last:border-b sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-center sm:gap-12"
            >
              <div>
                <p className="flex flex-wrap items-baseline gap-2.5">
                  <span className="font-mono text-4xl leading-none font-semibold text-cream-50 sm:text-5xl">
                    <CountUp value={item.value} />
                  </span>
                  <span className="font-mono text-sm text-signal-400">{item.unit}</span>
                </p>
                <p className="mt-3 text-sm leading-snug text-brand-300">{item.label}</p>
              </div>

              <div className="relative h-2.5 overflow-hidden rounded-full bg-brand-800">
                <div className="absolute inset-y-0 start-0" style={{ width: `${item.fill * 100}%` }}>
                  <Reveal
                    variant="rule"
                    delay={index * 110 + 220}
                    className="block h-full w-full rounded-full bg-signal-500"
                  />
                </div>
                <span className="kdf-ticks pointer-events-none absolute inset-0" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
