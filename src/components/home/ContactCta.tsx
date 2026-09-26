"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import Reveal from "@/components/motion/Reveal";
import type { HomePage } from "@/lib/content/types";
import styles from "../Footer.module.css";

/**
 * The closing band's call to action: a newsletter signup rather than a
 * "Talk to KDF" link — the client wants an email capture here, not a
 * duplicate of the contact links already in the row below. There's no
 * newsletter API yet (see docs/backend-integration-plan.md), so submitting
 * just swaps the form for a thank-you line; wiring it to a real endpoint
 * later only touches this one handler.
 *
 * The band's photograph is deliberately muted (see .photograph/.scrim) —
 * texture behind the invitation, not the dominant scene the earlier design
 * used. The panel below this one (the contact details) is solid colour
 * with no photograph at all.
 */
export default function ContactCta({ content }: { content: HomePage["contact"] }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <div className={styles.invitation}>
      <Image
        src={content.image}
        alt={content.imageAlt}
        fill
        sizes="(max-width: 1600px) 100vw, 1536px"
        className={styles.photograph}
        priority={false}
      />
      <div className={styles.scrim} aria-hidden="true" />
      <Reveal className={styles.invitationContent}>
        <h2 id="contact-heading" className={styles.title}>{content.title}</h2>
        {submitted ? (
          <div className={styles.subscribeSuccess} role="status">
            <span className={styles.successBadge}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 13l4.5 4.5L19 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className={styles.successTitle}>{content.subscribeSuccess}</p>
            <p className={styles.successNote}>{content.subscribeSuccessNote}</p>
          </div>
        ) : (
          <form className={styles.subscribeForm} onSubmit={handleSubmit}>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={content.subscribePlaceholder}
              aria-label={content.subscribePlaceholder}
              className={styles.subscribeInput}
            />
            <button type="submit" className={styles.subscribeSubmit} aria-label={content.subscribeCta}>
              <span className={styles.actionArrow}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m6 18 12-12M6 6h12v12" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </button>
          </form>
        )}
      </Reveal>
    </div>
  );
}
