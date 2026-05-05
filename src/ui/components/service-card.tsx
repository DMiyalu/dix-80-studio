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
      className="group block overflow-hidden rounded-2xl bg-surface transition-shadow hover:shadow-xl hover:shadow-black/10"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-6 lg:p-7">
        <div className="mb-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-accent">
          <span className="h-px w-6 bg-accent" />
          Découvrir
        </div>
        <h3 className="font-display text-2xl font-semibold text-foreground lg:text-3xl">
          {name}
        </h3>
        <p className="mt-2 text-sm text-muted">{desc}</p>
      </div>
    </Link>
  );
}
