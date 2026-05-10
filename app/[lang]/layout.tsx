import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { i18n, type Locale } from "@/src/i18n/config";
import { getDictionary, hasLocale } from "@/src/i18n/get-dictionary";
import { Header } from "@/src/ui/components/header";
import { Footer } from "@/src/ui/components/footer";
import { ScrollToTop } from "@/src/ui/components/scroll-to-top";
import { StoreProvider } from "@/src/infrastructure/store/store-provider";
import { BookingModal } from "@/src/ui/features/booking-modal/booking-modal";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "80Dix Studio — Studio photo à Trois-Rivières",
    template: "%s · 80Dix Studio",
  },
  description:
    "Studio photo professionnel à Trois-Rivières. Mariage, corporate, sport, portrait, événementiel. Location de studio équipé.",
};

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <html
      lang={lang}
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <StoreProvider>
          <Header lang={lang as Locale} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer lang={lang as Locale} dict={dict} />
          <BookingModal lang={lang as Locale} dict={dict} />
          <ScrollToTop label={dict.hero.scroll} />
        </StoreProvider>
      </body>
    </html>
  );
}
