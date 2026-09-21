"use client";

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
 * The band's photograph is not rendered here. It is one image behind the
 * whole footer — this invitation and the contact rows below it — so it
 * lives on the footer shell in Footer.tsx instead.
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
      <Reveal className={styles.invitationContent}>
        <h2 id="contact-heading" className={styles.title}>{content.title}</h2>
        {submitted ? (
          <p className={styles.subscribeSuccess}>{content.subscribeSuccess}</p>
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
