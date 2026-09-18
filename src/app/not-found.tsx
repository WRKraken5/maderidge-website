import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="mb-3 text-3xl font-semibold sm:text-4xl">
          This page does not exist.
        </h1>
        <p className="mb-6 text-ink-soft">
          The page you were looking for may have moved or the link may be out
          of date. Here are two ways to get back on track.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/">Return to the homepage</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Contact MadeRidge</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
