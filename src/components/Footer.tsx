import Image from "next/image";
import Link from "next/link";
import ContactCta from "./home/ContactCta";
import Reveal from "./motion/Reveal";
import { getHomePage } from "@/lib/content/home";
import { getSiteSettings } from "@/lib/content/site";
import type { Locale } from "@/lib/i18n/config";
import { getUiStrings } from "@/lib/i18n/ui-strings";
import styles from "./Footer.module.css";

/** A single closing composition: invitation, contact details and brand signature. */
export default async function Footer({ locale }: { locale: Locale }) {
  const [site, home] = await Promise.all([getSiteSettings(locale), getHomePage(locale)]);
  const strings = getUiStrings(locale);
  const content = home.contact;

  return (
    <footer className={styles.footer} aria-labelledby="contact-heading">
      <div className={styles.shell}>
        <ContactCta content={content} contact={site.contact} />
        <div className={styles.base}>
          <Reveal className={styles.contactGrid}>
            <div className={styles.brand}>
              <Link href={`/${locale}`} className={styles.logoCard}>
                <Image src={site.logo} alt={site.companyName} width={320} height={118} className={styles.logo} />
              </Link>
            </div>
            <div className={styles.contactItem}>
              <p className={styles.label}>{content.emailLabel}</p>
              <a className={styles.contactLink} href={`mailto:${site.contact.email}`}>
                <bdi>{site.contact.email}</bdi><span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className={styles.contactItem}>
              <p className={styles.label}>{content.phoneLabel}</p>
              <a className={styles.contactLink} href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}>
                <bdi dir="ltr">{site.contact.phone}</bdi><span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className={styles.contactItem}>
              <p className={styles.label}>{content.locationLabel}</p>
              <address>{site.contact.addressLines.map((line) => <span key={line}>{line}</span>)}</address>
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
