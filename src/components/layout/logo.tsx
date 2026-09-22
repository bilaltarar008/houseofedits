import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  priority,
  onClick,
}: {
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group flex items-center", className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <Image
        src="/images/house_of_edits_logo_high_quality.png"
        alt={siteConfig.name}
        width={96}
        height={96}
        priority={priority}
        className="size-11 shrink-0 rounded-full object-contain"
      />
    </Link>
  );
}
