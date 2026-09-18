import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";

export function WorkCard({
  image,
  alt,
  title,
  description,
  href,
  delay,
}: {
  image: string;
  alt: string;
  title: string;
  description: string;
  href: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <Card className="overflow-hidden p-4">
        <div className="relative mb-3 aspect-video overflow-hidden rounded-md border border-border">
          <Image src={image} alt={alt} fill sizes="(min-width: 40rem) 50vw, 100vw" className="object-cover object-top" />
        </div>
        <h3 className="mb-1 text-lg font-semibold">{title}</h3>
        <p className="mb-2 text-sm text-ink-soft">{description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          View website &rarr;
        </a>
      </Card>
    </Reveal>
  );
}
