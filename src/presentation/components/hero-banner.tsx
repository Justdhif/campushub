import Link from "next/link";
import { ArrowRight, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mb-7 flex min-h-[223px] flex-col justify-between overflow-hidden rounded-2xl bg-[#e7eff6] p-7 md:flex-row md:items-center md:p-8"
    >
      <div className="relative z-10 max-w-lg space-y-4">
        <Badge
          variant="outline"
          className="h-auto rounded-full border-violet-200 bg-white/75 px-3 py-1 text-[11px] font-semibold tracking-wider text-violet-800"
        >
          SATU PLATFORM, RIBUAN KEMUNGKINAN
        </Badge>

        <h2
          id="hero-heading"
          className="text-2xl font-bold leading-tight tracking-tight text-[#103757] md:text-[30px]"
        >
          Potensimu tanpa batas. Peluangmu juga.
        </h2>

        <p className="max-w-md text-sm leading-relaxed text-[#425f7b]">
          Dari magang pertama hingga beasiswa impian, temukan langkah
          selanjutnya di CampusHub.
        </p>

        <div className="pt-1">
          <Button
            nativeButton={false}
            className="min-h-11 rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white hover:bg-violet-700"
            render={<Link href="/jelajahi" />}
          >
            Jelajahi peluang
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Geometric Card & Orbit Illustration */}
      <div
        className="relative mt-8 hidden h-44 w-64 shrink-0 items-center justify-center sm:flex md:mt-0"
        aria-hidden="true"
      >
        <div className="absolute size-48 rounded-full border border-violet-300/60" />
        <div className="absolute size-32 rounded-full border border-violet-300/60" />

        <Sparkles className="absolute top-2 right-4 size-4 text-violet-500" />
        <span className="absolute bottom-3 left-3 text-lg text-violet-700">
          ✦
        </span>

        {/* Layered slanted blocks */}
        <div className="absolute right-8 -bottom-4 h-28 w-24 rotate-12 rounded-2xl bg-[#a3bfd7]" />
        <div className="absolute right-14 -bottom-6 h-24 w-20 -rotate-6 rounded-2xl bg-[#48759d]" />

        {/* Main floating card */}
        <div className="relative z-10 flex h-28 w-36 -rotate-12 flex-col justify-between rounded-2xl border-4 border-white bg-white/95 p-3.5 shadow-xl shadow-violet-300/40">
          <span className="flex size-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
            <GraduationCap className="size-4" />
          </span>
          <div className="space-y-1.5">
            <div className="h-2.5 w-24 rounded-full bg-[#b8cfe2]" />
            <div className="h-2 w-16 rounded-full bg-[#e7eef4]" />
          </div>
        </div>

        {/* Floating briefcase chip */}
        <div className="absolute top-1 left-12 z-20 flex size-10 rotate-12 items-center justify-center rounded-xl border-2 border-white bg-white text-violet-700 shadow-lg shadow-violet-300/40">
          <Briefcase className="size-4" />
        </div>
      </div>
    </section>
  );
}
