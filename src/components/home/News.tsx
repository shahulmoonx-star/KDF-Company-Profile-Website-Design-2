import Reveal from "@/components/motion/Reveal";
import SectionHeading from "./SectionHeading";
import type { HomePage } from "@/lib/content/types";

export default function News({ content }: { content: HomePage["news"] }) {
  return (
    <section className="bg-cream-50">
      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:py-16">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {content.items.map((item, index) => (
            <Reveal key={item.id} as="li" delay={index * 110}>
              <article className="group flex h-full flex-col rounded-[20px] border border-cream-300 bg-cream-100 p-8 transition-transform duration-200 hover:-translate-y-1">
                <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-brand-400">
                  <span className="text-signal-600">{item.year}</span>
                  <span className="h-px w-6 bg-cream-300" aria-hidden="true" />
                  {item.category}
                </p>
                <h3 className="mt-5 flex-1 text-[17px] leading-snug font-medium text-balance text-brand-800 transition-colors group-hover:text-brand-950">
                  {item.title}
                </h3>
                <span className="mt-7 block h-[3px] w-10 origin-left rounded-full bg-signal-500 transition-all duration-300 group-hover:w-20 rtl:origin-right" />
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
