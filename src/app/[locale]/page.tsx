import { notFound } from "next/navigation";
import About from "@/components/home/About";
import Footprint from "@/components/home/Footprint";
import Hero from "@/components/home/Hero";
import NewsBlogs from "@/components/home/NewsBlogs";
import Recognition from "@/components/home/Recognition";
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
      <About content={home.about} />
      <Footprint content={home.footprint} />
      <Solutions content={home.solutions} />
      {/* RegionalPresence (the GCC/MENA map) is hidden for now per request. */}
      <Recognition content={home.recognition} locale={locale} />
      <Sustainability content={home.sustainability} />
      <NewsBlogs content={home.news} />
    </main>
  );
}
