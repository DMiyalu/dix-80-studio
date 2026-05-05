import Image from "next/image";
import Link from "next/link";

export function ServiceCard({
  href,
  name,
  desc,
  imageUrl,
}: {
  href: string;
  name: string;
  desc: string;
  imageUrl: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[4/5] overflow-hidden bg-surface"
    >
      <Image
        src={imageUrl}
        alt={name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
        <div className="mb-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-accent">
          <span className="h-px w-6 bg-accent" />
          <span className="opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            Découvrir
          </span>
        </div>
        <h3 className="font-display text-2xl font-semibold text-white lg:text-3xl">
          {name}
        </h3>
        <p className="mt-2 max-w-xs text-sm text-white/70">{desc}</p>
      </div>
    </Link>
  );
}
