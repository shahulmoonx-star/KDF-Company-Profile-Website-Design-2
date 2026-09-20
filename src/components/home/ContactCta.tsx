import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import type { HomePage, SiteSettings } from "@/lib/content/types";
import styles from "../Footer.module.css";

export default function ContactCta({ content, contact }: {
  content: HomePage["contact"];
  contact: SiteSettings["contact"];
}) {
  return (
    <div className={styles.invitation}>
      <Image
        src={content.image}
        alt={content.imageAlt}
        fill
        sizes="(max-width: 1600px) 100vw, 1536px"
        className={styles.photograph}
      />
      <div className={styles.scrim} aria-hidden="true" />
      <Reveal className={styles.invitationContent}>
        <h2 id="contact-heading" className={styles.title}>{content.title}</h2>
        <a href={`mailto:${contact.email}`} className={styles.action}>
          <span>{content.cta}</span>
          <span className={styles.actionArrow}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 18 12-12M6 6h12v12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
        </a>
      </Reveal>
    </div>
  );
}
