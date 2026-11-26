import Link from "next/link";
import { Briefcase, Globe, GraduationCap, Sparkles } from "lucide-react";
import { getCategoryCounts } from "@/application/use-cases/filter-opportunities";
import { Card } from "@/components/ui/card";
import type { OpportunityCategory } from "@/domain/entities/opportunity";
import { opportunityRepository } from "@/infrastructure/repositories/static-opportunity-repository";
import { cn } from "cn";

const CATEGORY_META: readonly {
  category: OpportunityCategory;
  icon: typeof Briefcase;
  iconClass: string;
}[] = [
  {
    category: "Magang",
    icon: Briefcase,
    iconClass: "bg-violet-100 text-violet-700",
  },
  {
    category: "Beasiswa",
    icon: GraduationCap,
    iconClass: "bg-blue-100 text-blue-700",
  },
  {
    category: "Kompetisi",
    icon: Sparkles,
    iconClass: "bg-orange-100 text-orange-700",
  },
  {
    category: "Bootcamp",
    icon: Globe,
    iconClass: "bg-slate-100 text-slate-700",
  },
];

export function CategorySummaryGrid() {
  const counts = getCategoryCounts(opportunityRepository.getAll());

  return (
    <section aria-label="Ringkasan kategori peluang" className="mb-7">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {CATEGORY_META.map(({ category, icon: Icon, iconClass }) => (
          <Link
            key={category}
            href={`/jelajahi?kategori=${encodeURIComponent(category)}`}
            className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Card className="flex-row items-center gap-3.5 rounded-xl border border-[#e1e7ed] bg-white p-3.5 ring-0 transition-all group-hover:border-violet-300 group-hover:shadow-[0_6px_24px_#1037570c]">
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl",
                  iconClass
                )}
                aria-hidden="true"
              >
                <Icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-violet-700">
                  {category}
                </p>
                <p className="text-xs text-slate-500">
                  {counts[category]} peluang
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
