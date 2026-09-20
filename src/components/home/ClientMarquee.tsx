import Image from "next/image";
import type { HomeClient } from "@/lib/content/types";
import styles from "./ClientMarquee.module.css";

/**
 * Continuously scrolling wall of client logos. Deliberately not a client
 * component: the whole thing is a CSS animation, so it ships no JavaScript
 * and starts moving as soon as the stylesheet lands.
 *
 * The second track is the same list again, marked aria-hidden so assistive
 * tech reads the client list once rather than twice — it exists purely to
 * make the loop seamless (see the stylesheet).
 *
 * Nothing here is scaled or transformed, deliberately. An earlier version
 * gave each logo a `transform: scale()` to compensate for how differently
 * the supplied files use their square canvas (the marks fill between 56%
 * and 100% of their canvas height, so `object-contain` — which fits the
 * canvas, not the mark — renders some much smaller than others). That
 * cropped the logos: `transform` grows an element visually without growing
 * its layout box, and the viewport's `overflow: hidden` clips to the
 * un-grown box, so the bottom of each scaled logo — exactly where these
 * logos carry their company name — was cut off.
 *
 * So: plain `object-contain`, which by definition can never exceed its
 * box. The trade-off is that a logo sitting small inside its own canvas
 * renders smaller than its neighbours. Evening that out properly means
 * cropping the transparent margin out of the source files themselves,
 * which would also cut their weight substantially — worth doing, but it
 * is a change to the client's assets rather than to this component.
 */
export default function ClientMarquee({ clients }: { clients: HomeClient[] }) {
  return (
    <div className={styles.viewport}>
      {[false, true].map((isDuplicate) => (
        <ul
          key={String(isDuplicate)}
          className={styles.track}
          aria-hidden={isDuplicate || undefined}
        >
          {clients.map((client) => (
            <li
              key={client.id}
              className="flex h-28 w-[190px] shrink-0 items-center justify-center px-3 sm:h-32 sm:w-[220px]"
            >
              <Image
                src={client.logo}
                alt={isDuplicate ? "" : client.name}
                width={1254}
                height={1254}
                className="h-full w-full object-contain"
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
