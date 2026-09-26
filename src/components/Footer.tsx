import Image from "next/image";
import Link from "next/link";
import ContactCta from "./home/ContactCta";
import Reveal from "./motion/Reveal";
import { getHomePage } from "@/lib/content/home";
import { getSiteSettings } from "@/lib/content/site";
import type { Locale } from "@/lib/i18n/config";
import { getUiStrings } from "@/lib/i18n/ui-strings";
import styles from "./Footer.module.css";

/** A single closing composition: invitation, contact details with a live map, and brand signature. */
export default async function Footer({ locale }: { locale: Locale }) {
  const [site, home] = await Promise.all([getSiteSettings(locale), getHomePage(locale)]);
  const strings = getUiStrings(locale);
  const content = home.contact;

  return (
    <footer className={styles.footer} aria-labelledby="contact-heading">
      <div className={styles.shell}>
        {/* The certification badge anchors the whole footer's top-right
            corner — the first thing a visitor sees on arriving at the
            closing section, rather than a small mark buried in the brand
            column below. */}
        <Image
          src="/images/badge-great-place-to-work.webp"
          alt={strings.greatPlaceToWorkAlt}
          width={320}
          height={435}
          className={styles.badge}
        />

        <ContactCta content={content} />

        <div className={styles.base}>
          <Reveal className={styles.grid}>
            {/* Identity column: mark in its real colours and a one-line
                description. */}
            <div className={styles.brand}>
              <Link href={`/${locale}`} className={styles.logoCard}>
                <Image src={site.logo} alt={site.companyName} width={320} height={118} className={styles.logo} />
              </Link>
              <p className={styles.tagline}>{site.description}</p>
              <Image
                src="/images/footer-certification-badges.webp"
                alt={strings.certificationBadgesAlt}
                width={720}
                height={270}
                className={styles.certificationBadges}
              />
            </div>

            {/* Contact rows on one side, a real embedded map preview on the
                other — a visitor can see exactly where KDF is without
                leaving the page, then follow the link to open it properly. */}
            <div className={styles.contactColumn}>
              <div className={styles.details}>
                <div className={styles.contactItem}>
                  <p className={styles.label}>{content.emailLabel}</p>
                  <a className={styles.contactLink} href={`mailto:${site.contact.email}`}>
                    <bdi>{site.contact.email}</bdi>
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <p className={styles.label}>{content.phoneLabel}</p>
                  <a className={styles.contactLink} href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}>
                    <bdi dir="ltr">{site.contact.phone}</bdi>
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <p className={styles.label}>{content.locationLabel}</p>
                  <address>{site.contact.addressLines.map((line) => <span key={line}>{line}</span>)}</address>
                </div>
              </div>
            </div>

            <div className={styles.locationCard}>
              <iframe
                className={styles.mapPreview}
                src="https://www.google.com/maps?q=29.0327,48.1244&z=15&output=embed"
                title={strings.mapLabel}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                className={styles.mapLink}
                href="https://www.google.com/maps/search/?api=1&query=Kuwait%20Drilling%20Fluids%20%26%20Oil%20Service%20Company"
                target="_blank"
                rel="noreferrer"
              >
                {strings.mapLabel}<span aria-hidden="true"> ↗</span>
              </a>
            </div>
          </Reveal>

          <div className={styles.bottom}>
            <p>© {site.copyrightYear} {site.shortName}. {strings.allRightsReserved}</p>
            <p>{strings.developedBy}{" "}<a href={site.developer.url} target="_blank" rel="noreferrer">{site.developer.name}<span aria-hidden="true"> ↗</span></a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
