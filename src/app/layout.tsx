import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import { getSiteSettings } from "@/lib/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadata is derived from the same CMS-managed site settings the rest of
 * the app reads, so the title, description and favicon all change with the
 * API rather than being hardcoded here.
 */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    title: {
      default: site.companyName,
      template: `%s | ${site.shortName}`,
    },
    description: site.description,
    applicationName: site.companyName,
    icons: { icon: site.favicon },
    authors: [{ name: site.developer.name, url: site.developer.url }],
    creator: site.developer.name,
    publisher: site.companyName,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
