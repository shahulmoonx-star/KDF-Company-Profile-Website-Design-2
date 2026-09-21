import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import type { HomePage } from "@/lib/content/types";
import styles from "./Solutions.module.css";

/**
 * An image-first editorial mosaic for KDF's core products and services. The
 * photography carries the section; each card keeps only its sequence number
 * and title so the offer can be understood at a glance.
 */
export default function Solutions({ content }: { content: HomePage["solutions"] }) {
  return (
    <section className={styles.section}>
      <span className={styles.orbit} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <Reveal as="p" className={styles.eyebrow}>
              {content.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={90} className={styles.title}>
              {content.title}
            </Reveal>
          </div>
        </header>

        <div className={styles.gallery}>
          {content.items.map((item, index) => (
            <Reveal
              as="article"
              key={item.id}
              variant="up"
              delay={120 + index * 110}
              className={`${styles.card} ${index === 0 ? styles.featured : ""}`}
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes={index === 0 ? "(max-width: 900px) 100vw, 1280px" : "(max-width: 900px) 100vw, 640px"}
                className={styles.image}
              />
              <span className={styles.scrim} aria-hidden="true" />
              <span className={styles.edge} aria-hidden="true" />

              <div className={styles.cardTop}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.marker} aria-hidden="true" />
              </div>

              <div className={styles.cardTitle}>
                <h3>{item.title}</h3>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
