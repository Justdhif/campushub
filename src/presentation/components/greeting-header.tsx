"use client";

import { useWorkspaceState } from "@/presentation/hooks/use-workspace-state";

interface GreetingHeaderProps {
  title?: string;
  personalized?: boolean;
}

export function GreetingHeader({
  title,
  personalized = false,
}: GreetingHeaderProps) {
  const { firstName } = useWorkspaceState();

  const headingText = personalized
    ? `Halo, ${firstName}! Siap melangkah lebih jauh? ✦`
    : title ?? "Peluang pilihanmu ✦";

  return (
    <div className="mb-6 space-y-1.5">
      <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
        MASA DEPANMU DIMULAI DI SINI
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-[#103757] md:text-[28px]">
        {headingText}
      </h1>
      <p className="text-sm text-slate-500">
        Temukan peluang yang tepat untuk tumbuh, belajar, dan berdampak.
      </p>
    </div>
  );
}
