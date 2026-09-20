"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import type { HomePage, RecognitionImage } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/config";
import { getUiStrings } from "@/lib/i18n/ui-strings";
import styles from "./Recognition.module.css";

type GalleryCard = RecognitionImage & { id: string; title: string; fullTitle: string; caption: string };

export default function Recognition({ content, locale }: { content: HomePage["recognition"]; locale: Locale }) {
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<GalleryCard | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const strings = getUiStrings(locale);
  const cards: GalleryCard[] = [
    ...content.certifications.map((item) => ({ ...item, title: item.standard, fullTitle: item.standard, caption: item.label })),
    ...content.awards.map((item) => ({ ...item, title: item.shortTitle, fullTitle: item.title, caption: item.year })),
  ];

  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [selected]);

  function openPreview(card: GalleryCard) {
    setSelected(card);
    dialogRef.current?.showModal();
  }

  if (!cards.length) return null;

  return (
    <section id="recognition" aria-labelledby="recognition-title" className={styles.section}>
      <div className={styles.heading}>
        <Reveal>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="recognition-title" className={styles.title}>{content.title}</h2>
        </Reveal>
        <button type="button" className={styles.control} aria-label={paused ? strings.playGallery : strings.pauseGallery} aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="2" /></svg>}
        </button>
      </div>
      <Reveal delay={150}>
        <div className={`${styles.viewport} ${paused ? styles.manual : ""}`} data-preview={selected ? "open" : undefined}>
          {[false, true].map((duplicate) => (
            <ul key={String(duplicate)} className={`${styles.track} ${duplicate ? styles.duplicate : ""}`} aria-hidden={duplicate || undefined}>
              {cards.map((card) => (
                <li key={card.id} className={styles.card}>
                  <button type="button" className={styles.sheet} tabIndex={duplicate ? -1 : 0} aria-label={`${strings.enlargeImage}: ${card.fullTitle}`} onClick={() => openPreview(card)} onFocus={(event) => { if (!duplicate && event.currentTarget.matches(":focus-visible")) setPaused(true); }}>
                    <Image src={card.image} alt={duplicate ? "" : card.imageAlt} fill sizes="(max-width: 640px) 220px, 270px" className={card.imagePlaceholder ? styles.placeholderImage : styles.documentImage} />
                    {card.imagePlaceholder && <span className={styles.previewBadge}>{strings.previewImage}</span>}
                    <span className={styles.expand} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M14 5h5v5M19 5l-6 6M10 19H5v-5m0 5 6-6" stroke="currentColor" strokeWidth="1.5" /></svg></span>
                  </button>
                  <div className={styles.caption}><h3>{card.title}</h3><p>{card.caption}</p></div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Reveal>
      <dialog ref={dialogRef} className={styles.dialog} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }} aria-labelledby="recognition-preview-title">
        <button type="button" className={styles.close} onClick={() => dialogRef.current?.close()} aria-label={strings.closePreview} autoFocus>×</button>
        {selected && <div className={styles.previewContent}>
          <div className={styles.previewSheet}><Image src={selected.image} alt={selected.imageAlt} fill sizes="(max-width: 640px) 85vw, 500px" className={styles.documentImage} /></div>
          <h3 id="recognition-preview-title">{selected.fullTitle}</h3>
          <p>{selected.imagePlaceholder ? strings.previewImage : selected.caption}</p>
        </div>}
      </dialog>
    </section>
  );
}
