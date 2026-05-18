import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { i18n, type Locale } from "@/src/i18n/config";
import { getDictionary, hasLocale } from "@/src/i18n/get-dictionary";
import {
  SERVICE_SLUGS,
  findServiceBySlug,
} from "@/src/application/services/service-catalog";
import { ServicePage } from "@/src/ui/features/service-page/service-page";
import { isServicePageKey } from "@/src/ui/features/service-page/service-page-content";

export function generateStaticParams() {
  return i18n.locales.flatMap((lang) =>
    SERVICE_SLUGS.map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const details = findServiceBySlug(slug);
  if (!details) return {};
  const dict = await getDictionary(lang as Locale);
  if (!isServicePageKey(dict, details.id)) return {};
  const content = dict.servicePages[details.id];
  return {
    title: content.hero.title,
    description: content.hero.subtitle,
  };
}

export default async function ServiceCategoryPage({
  params,
}: PageProps<"/[lang]/services/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const details = findServiceBySlug(slug);
  if (!details) notFound();

  const dict = await getDictionary(lang as Locale);
  return <ServicePage lang={lang as Locale} dict={dict} details={details} />;
}
