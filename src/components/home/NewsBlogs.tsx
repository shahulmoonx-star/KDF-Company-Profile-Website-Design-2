"use client";

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import type { HomePage } from "@/lib/content/types";
import styles from "./NewsBlogs.module.css";

/**
 * The closing section, right before the footer: a static News & Blogs
 * showcase on the same continuously auto-scrolling marquee as Awards &
 * certifications, but with the interaction removed — there are no article
 * pages yet, so nothing here is clickable. Each card shows everything it
 * has to say (photo, year, a one-line title, up to three lines of
 * description) with no popup or further detail behind it. Currently seeded
 * with KDF announcement graphics as placeholder content until real
 * news/blog posts replace them — see the HomeNewsItem doc comment in
 * types.ts.
 *
 * Hover-to-pause is CSS only (`.viewport:hover .track` in the stylesheet)
 * — there is no drag/swipe here. That was tried and reverted: dragging the
 * real `scrollLeft` while the duplicated track was still animating (or
 * freshly stopped mid-cycle) left a visible gap between the two `<ul>`
 * copies, breaking the marquee's seamless loop. A manual scroll affordance
 * isn't needed anyway — nothing in this section is keyboard-focusable, and
 * the marquee already surfaces every card on its own.
 */
export default function NewsBlogs({ content }: { content: HomePage["news"] }) {
  const { items } = content;

  if (!items.length) return null;

  return (
    <section id="news" aria-labelledby="news-title" className={styles.section}>
      <div className={styles.heading}>
        <Reveal>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="news-title" className={styles.title}>{content.title}</h2>
        </Reveal>
      </div>
      <Reveal delay={150}>
        <div className={styles.viewport}>
          {[false, true].map((duplicate) => (
            <ul key={String(duplicate)} className={`${styles.track} ${duplicate ? styles.duplicate : ""}`} aria-hidden={duplicate || undefined}>
              {items.map((item) => (
                <li key={item.id} className={styles.card}>
                  <div className={styles.sheet}>
                    <Image
                      src={item.image}
                      alt={duplicate ? "" : item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 260px, 300px"
                      className={styles.photo}
                    />
                    <span className={styles.year}>{item.year}</span>
                  </div>
                  <div className={styles.caption}>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
