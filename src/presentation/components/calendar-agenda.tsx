import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Opportunity } from "@/domain/entities/opportunity";

interface CalendarAgendaProps {
  opportunities: readonly Opportunity[];
}

export function CalendarAgenda({ opportunities }: CalendarAgendaProps) {
  const sortedByDeadline = [...opportunities].sort(
    (a, b) => a.daysLeft - b.daysLeft
  );

  return (
    <section aria-labelledby="calendar-agenda-heading">
      <Card className="gap-4 rounded-2xl border border-[#e1e7ed] bg-white p-6 ring-0">
        <h2
          id="calendar-agenda-heading"
          className="text-lg font-bold tracking-tight text-[#103757]"
        >
          Agenda tenggat peluang
        </h2>

        <ul className="space-y-3">
          {sortedByDeadline.map((item) => (
            <li key={item.id}>
              <Link
                href={`/jelajahi?peluang=${item.id}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-[#e1e7ed] bg-white p-3.5 transition-colors hover:border-violet-300 hover:bg-slate-50/70"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-bold text-violet-700">
                    {item.daysLeft}h
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#103757]">
                      {item.title}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {item.organization} · {item.daysLeft} hari lagi
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className="size-4 shrink-0 text-slate-400"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
