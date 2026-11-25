import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { cn } from "cn";

interface CampusHubLogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function CampusHubLogo({
  variant = "light",
  className,
}: CampusHubLogoProps) {
  const isDarkSurface = variant === "dark";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2",
        className
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white">
        <GraduationCap className="size-5" aria-hidden="true" />
      </span>
      <span className="text-[24px] leading-none font-extrabold tracking-[-1px]">
        <span className={isDarkSurface ? "text-white" : "text-violet-700"}>
          campus
        </span>
        <span className={isDarkSurface ? "text-white" : "text-violet-600"}>
          hub.
        </span>
      </span>
    </Link>
  );
}
