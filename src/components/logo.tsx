import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 font-display text-lg font-semibold text-foreground",
        className,
      )}
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={160}
        height={84}
        priority
        className="h-9 w-auto"
      />
      <span>MadeRidge Website Design</span>
    </Link>
  );
}
