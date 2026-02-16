import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { GalaxyBackground } from "@/components/ui/galaxy-background";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Thibaud Masurel",
    default: "Thibaud Masurel — Développeur Full-Stack",
  },
  description:
    "Portfolio de Thibaud Masurel, développeur full-stack spécialisé en Go, React et Next.js.",
  openGraph: {
    title: "Thibaud Masurel — Développeur Full-Stack",
    description:
      "Portfolio de Thibaud Masurel, développeur full-stack spécialisé en Go, React et Next.js.",
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    siteName: "Thibaud Masurel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thibaud Masurel — Développeur Full-Stack",
    description:
      "Portfolio de Thibaud Masurel, développeur full-stack spécialisé en Go, React et Next.js.",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
          {/* Ambient gradient orbs */}
          <div className="orb w-96 h-96 bg-indigo-500 top-[-10%] left-[-5%]" />
          <div className="orb w-80 h-80 bg-purple-500 top-[40%] right-[-10%]" />
          <div className="orb w-72 h-72 bg-cyan-500 bottom-[-5%] left-[30%]" />

          {/* Interactive star field */}
          <GalaxyBackground />

          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
