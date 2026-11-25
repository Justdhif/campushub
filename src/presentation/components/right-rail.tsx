import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { getUrgentOpportunities } from "@/application/use-cases/filter-opportunities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { opportunityRepository } from "@/infrastructure/repositories/static-opportunity-repository";
import { cn } from "cn";

export function RightRail() {
  const urgentOpportunities = getUrgentOpportunities(
    opportunityRepository.getAll(),
    3
  );

  return (
    <aside aria-label="Informasi tenggat dan wawasan" className="space-y-5">
      <Card className="gap-4 rounded-2xl border border-[#e1e7ed] bg-white p-5 ring-0">
        <CardHeader className="gap-1 p-0">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-orange-600" aria-hidden="true" />
            <CardTitle className="text-base font-bold text-[#103757]">
              Segera ditutup
            </CardTitle>
          </div>
          <p className="text-xs text-slate-500">
            Jangan sampai kelewatan kesempatan!
          </p>
        </CardHeader>

        <CardContent className="space-y-4 p-0">
          <ul className="space-y-4">
            {urgentOpportunities.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/jelajahi?peluang=${item.id}`}
                  className="group flex items-start gap-3 rounded-xl p-1 -m-1 transition-colors hover:bg-slate-50"
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold",
                      item.organizationBadgeClass
                    )}
                    aria-hidden="true"
                  >
                    {item.organizationBadgeText}
                  </span>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-semibold leading-snug text-[#103757] group-hover:text-violet-600">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{item.organization}</p>
                    <Badge
                      variant="secondary"
                      className="rounded-md bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-orange-700"
                    >
                      {item.daysLeft} hari lagi
                    </Badge>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-slate-100 pt-3 text-center">
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              className="h-auto px-2 py-1 text-xs font-semibold text-violet-700 hover:bg-transparent hover:text-violet-600"
              render={<Link href="/kalender" />}
            >
              Lihat semua tenggat
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="relative gap-3 overflow-hidden rounded-2xl border border-slate-700 bg-[#151f2d] p-5 text-white ring-0">
        <div
          className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-white/5"
          aria-hidden="true"
        />
        <CardHeader className="gap-3 p-0">
          <span
            className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-violet-200"
            aria-hidden="true"
          >
            <Sparkles className="size-4" />
          </span>
          <p className="text-[11px] font-semibold tracking-widest text-violet-200 uppercase">
            CAMPUS INSIGHT
          </p>
          <CardTitle className="text-lg font-semibold leading-7 text-white">
            Bukan cuma IPK. Pengalaman juga berarti.
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <p className="text-xs leading-relaxed text-slate-300">
            Mulai bangun portofolio dan temukan pengalaman pertamamu hari ini.
          </p>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            className="h-auto px-0 py-1 text-xs font-semibold text-white hover:bg-transparent hover:text-violet-200"
            render={<Link href="/jelajahi?kategori=Magang" />}
          >
            Temukan magang
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Button>
        </CardContent>
      </Card>

      <footer className="space-y-1 px-1 pt-1 text-xs text-slate-500">
        <p>Dibuat untuk langkah besarmu.</p>
        <p>© 2025 CampusHub · Pratinjau lokal</p>
      </footer>
    </aside>
  );
}
