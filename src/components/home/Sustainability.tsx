import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import type { HomePage } from "@/lib/content/types";
import styles from "./Sustainability.module.css";

export default function Sustainability({ content }: { content: HomePage["sustainability"] }) {
  return (
    <section id="sustainability" className={styles.section} aria-labelledby="sustainability-title">
      <div className={styles.inner}>
        <Reveal className={styles.heading}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="sustainability-title" className={styles.title}>{content.title}</h2>
        </Reveal>
        <div className={styles.gallery}>
          {content.pillars.map((pillar, index) => (
            <Reveal key={pillar.id} delay={index * 140} className={styles.tile}>
              <figure className={styles.figure}>
                <div className={styles.photo}>
                  <Image src={pillar.image} alt={pillar.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 40vw" className={styles.image} />
                </div>
                <span className={styles.scrim} aria-hidden="true" />
                <figcaption className={styles.caption}>
                  <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{pillar.title}</h3>
                  <span className={styles.rule} aria-hidden="true" />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
