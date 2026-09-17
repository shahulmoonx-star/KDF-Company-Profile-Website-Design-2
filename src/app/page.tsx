import { getSiteSettings } from "@/lib/content/site";

export default async function Home() {
  const site = await getSiteSettings();

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-signal-500 uppercase">
          Since 1966
        </p>
        <h1 className="mt-4 text-3xl leading-tight font-bold text-brand-700 sm:text-4xl">
          {site.companyName}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-brand-500">
          {site.description}
        </p>
        <p className="mt-10 text-sm text-brand-400">
          Site in progress — sections are added phase by phase.
        </p>
      </div>
    </main>
  );
}
