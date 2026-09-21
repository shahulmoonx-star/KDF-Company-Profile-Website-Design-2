import { notFound } from "next/navigation";
import Footprint from "@/components/home/Footprint";
import Hero from "@/components/home/Hero";
import Recognition from "@/components/home/Recognition";
import RegionalPresence from "@/components/home/RegionalPresence";
import Solutions from "@/components/home/Solutions";
import Sustainability from "@/components/home/Sustainability";
import { getHomePage } from "@/lib/content/home";
import { isLocale } from "@/lib/i18n/config";

/**
 * The homepage is a server component: content is fetched on the server and
 * the bands render as HTML. Only the parts that genuinely need the browser
 * — the reveal observers, the count-ups, the solutions selector and the
 * hero's pointer parallax — are client components, so the page stays
 * crawlable and the whole of its copy is in the initial response.
 */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const home = await getHomePage(locale);

  return (
    <main className="flex-1">
      <Hero content={home.hero} />
      <Footprint content={home.footprint} />
      <Solutions content={home.solutions} />
      <RegionalPresence content={home.presence} capability={home.capability} />
      <Recognition content={home.recognition} locale={locale} />
      <Sustainability content={home.sustainability} />
    </main>
  );
}
