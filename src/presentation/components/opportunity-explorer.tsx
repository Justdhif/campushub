"use client";

import * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Clock,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  filterAndSortOpportunities,
  OPPORTUNITY_CATEGORIES,
} from "@/application/use-cases/filter-opportunities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  Opportunity,
  OpportunityCategory,
  OpportunitySortOption,
} from "@/domain/entities/opportunity";
import { useWorkspaceState } from "@/presentation/hooks/use-workspace-state";
import { cn } from "cn";

interface OpportunityExplorerProps {
  opportunities: readonly Opportunity[];
  sectionTitle: string;
  sectionSubtitle: string;
  savedOnly?: boolean;
  initialCategory?: OpportunityCategory | "all";
  initialSelectedId?: string;
}

const SORT_LABELS: Record<OpportunitySortOption, string> = {
  relevant: "Paling relevan",
  deadline: "Tenggat terdekat",
  newest: "Terbaru",
};

export function OpportunityExplorer({
  opportunities,
  sectionTitle,
  sectionSubtitle,
  savedOnly = false,
  initialCategory = "all",
  initialSelectedId,
}: OpportunityExplorerProps) {
  const { savedIds, isSaved, toggleSaved } = useWorkspaceState();

  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<OpportunityCategory | "all">(
    initialCategory
  );
  const [remoteOnly, setRemoteOnly] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);
  const [sortBy, setSortBy] =
    React.useState<OpportunitySortOption>("relevant");
  const [selectedId, setSelectedId] = React.useState<string | null>(
    initialSelectedId ?? null
  );

  const baseList = React.useMemo(() => {
    if (!savedOnly) return opportunities;
    return opportunities.filter((item) => savedIds.includes(item.id));
  }, [opportunities, savedIds, savedOnly]);

  const filteredList = React.useMemo(
    () =>
      filterAndSortOpportunities(baseList, {
        query,
        category,
        remoteOnly,
        sortBy,
      }),
    [baseList, query, category, remoteOnly, sortBy]
  );

  const selectedOpportunity = React.useMemo(
    () =>
      selectedId
        ? opportunities.find((item) => item.id === selectedId) ?? null
        : null,
    [opportunities, selectedId]
  );

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setRemoteOnly(false);
    setSortBy("relevant");
  };

  if (selectedOpportunity) {
    const saved = isSaved(selectedOpportunity.id);

    return (
      <section aria-label="Detail peluang">
        <Card className="gap-5 rounded-2xl border border-violet-200 bg-white p-6 ring-0">
          <div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedId(null)}
              className="h-auto px-0 py-1 text-sm font-medium text-slate-600 hover:bg-transparent hover:text-violet-700"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Kembali ke peluang
            </Button>
          </div>

          <div className="space-y-1.5">
            <p className="text-sm text-slate-500">
              {selectedOpportunity.organization} · {selectedOpportunity.category}
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#103757]">
              {selectedOpportunity.title}
            </h2>
            <p className="text-sm text-slate-500">
              {selectedOpportunity.location} · {selectedOpportunity.workMode} ·
              Ditutup dalam {selectedOpportunity.daysLeft} hari
            </p>
          </div>

          <div className="rounded-xl bg-[#f0f5fa] px-4 py-3 text-sm font-semibold text-[#103757]">
            {selectedOpportunity.compensation}
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#103757]">
              Tentang peluang ini
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {selectedOpportunity.description}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#103757]">
              Kriteria peserta
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
              {selectedOpportunity.criteria.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 pt-1">
            <Button
              type="button"
              onClick={() => toggleSaved(selectedOpportunity.id)}
              className={cn(
                "min-h-11 rounded-lg px-5 text-sm font-semibold",
                saved
                  ? "bg-violet-100 text-violet-800 hover:bg-violet-200"
                  : "bg-violet-600 text-white hover:bg-violet-700"
              )}
            >
              {saved ? "Hapus dari tersimpan" : "Simpan peluang ini"}
            </Button>
            <p className="text-xs text-slate-500">
              Data demonstrasi. Pendaftaran eksternal belum tersedia pada
              pratinjau ini.
            </p>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section aria-labelledby="opportunity-list-heading" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2
            id="opportunity-list-heading"
            className="text-xl font-bold tracking-tight text-[#103757]"
          >
            {sectionTitle}
          </h2>
          <p className="text-sm text-slate-500">{sectionSubtitle}</p>
        </div>
        <p className="text-xs font-medium text-slate-500">
          {filteredList.length} peluang
        </p>
      </div>

      {/* Search & Filter Controls */}
      <search aria-label="Cari dan saring peluang" className="space-y-3">
        <div className="flex gap-2.5">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <Label htmlFor="opportunity-search" className="visually-hidden">
              Cari posisi, perusahaan, atau kata kunci
            </Label>
            <Input
              id="opportunity-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari posisi, perusahaan, atau kata kunci..."
              enterKeyHint="search"
              spellCheck={false}
              className="h-11 rounded-xl border-[#dce3ea] bg-white pl-10 text-sm text-[#103757] placeholder:text-slate-400"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            aria-expanded={showFilters}
            onClick={() => setShowFilters((prev) => !prev)}
            className={cn(
              "h-11 rounded-xl border-[#dce3ea] bg-white px-4 text-sm font-medium text-[#103757]",
              showFilters && "border-violet-300 bg-violet-50 text-violet-700"
            )}
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Filter
          </Button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-violet-200 bg-violet-50 p-3 text-sm text-[#103757]">
            <div className="flex items-center gap-2.5">
              <Checkbox
                id="remote-only-filter"
                checked={remoteOnly}
                onCheckedChange={(checked) => setRemoteOnly(Boolean(checked))}
              />
              <Label
                htmlFor="remote-only-filter"
                className="cursor-pointer text-sm font-medium text-[#103757]"
              >
                Hanya online / remote
              </Label>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-auto px-2 py-1 text-xs font-semibold text-violet-700 hover:bg-violet-100"
            >
              Reset filter
            </Button>
          </div>
        )}
      </search>

      {/* Category Tabs & Sort Select */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          value={category}
          onValueChange={(value) =>
            setCategory(value as OpportunityCategory | "all")
          }
        >
          <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="h-9 rounded-lg px-3 text-xs font-medium text-slate-600 data-active:bg-violet-100 data-active:font-semibold data-active:text-violet-800 data-active:shadow-none"
            >
              Semua peluang
            </TabsTrigger>
            {OPPORTUNITY_CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="h-9 rounded-lg px-3 text-xs font-medium text-slate-600 data-active:bg-violet-100 data-active:font-semibold data-active:text-violet-800 data-active:shadow-none"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Select
          value={sortBy}
          onValueChange={(value) => {
            if (value) setSortBy(value as OpportunitySortOption);
          }}
        >
          <SelectTrigger
            aria-label="Urutkan peluang"
            className="h-9 border-transparent bg-transparent px-2 text-xs font-medium text-slate-600 shadow-none hover:bg-white"
          >
            <SelectValue>{SORT_LABELS[sortBy]}</SelectValue>
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="relevant">Paling relevan</SelectItem>
            <SelectItem value="deadline">Tenggat terdekat</SelectItem>
            <SelectItem value="newest">Terbaru</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards Grid or Empty State */}
      {filteredList.length === 0 ? (
        <Card className="items-center justify-center rounded-2xl border border-[#e1e7ed] bg-white p-10 text-center ring-0">
          <div className="space-y-2">
            <p className="text-base font-bold text-[#103757]">
              Belum ada peluang di sini
            </p>
            <p className="text-sm text-slate-500">
              Coba kata kunci lain, ubah filter, atau simpan peluang favoritmu.
            </p>
          </div>
          {(query || category !== "all" || remoteOnly) && (
            <Button
              type="button"
              variant="outline"
              onClick={resetFilters}
              className="mt-2 rounded-lg"
            >
              Reset pencarian & filter
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredList.map((item) => {
            const saved = isSaved(item.id);

            return (
              <Card
                key={item.id}
                className="group justify-between gap-4 rounded-2xl border border-[#e1e7ed] bg-white p-5 ring-0 transition-all hover:border-violet-300 hover:shadow-[0_6px_24px_#1037570c]"
              >
                <div className="space-y-3.5">
                  <CardHeader className="flex-row items-start justify-between gap-3 p-0">
                    <div
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                        item.organizationBadgeClass
                      )}
                      aria-hidden="true"
                    >
                      {item.organizationBadgeText}
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={
                        saved
                          ? `Hapus ${item.title} dari tersimpan`
                          : `Simpan ${item.title}`
                      }
                      aria-pressed={saved}
                      onClick={() => toggleSaved(item.id)}
                      className={cn(
                        "rounded-lg text-slate-400 hover:bg-violet-50 hover:text-violet-700",
                        saved && "bg-violet-50 text-violet-700"
                      )}
                    >
                      <Bookmark
                        className={cn("size-4", saved && "fill-current")}
                        aria-hidden="true"
                      />
                    </Button>
                  </CardHeader>

                  <CardContent className="space-y-2.5 p-0">
                    <p className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                      <span>{item.organization}</span>
                      <Check
                        className="size-3 text-slate-400"
                        aria-hidden="true"
                      />
                    </p>

                    <CardTitle className="text-base font-bold leading-6 text-[#103757]">
                      <button
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className="text-left transition-colors hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        {item.title}
                      </button>
                    </CardTitle>

                    <p className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                      <span>
                        {item.location} • {item.workMode}
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="rounded-md bg-[#f3f5f7] px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {item.highlightTag && (
                        <Badge
                          variant="secondary"
                          className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700"
                        >
                          {item.highlightTag}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="justify-between border-t border-slate-100 bg-transparent px-0 pt-3.5 pb-0">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {item.daysLeft} hari lagi
                  </span>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedId(item.id)}
                    className="h-auto px-1 py-0.5 text-xs font-semibold text-violet-700 hover:bg-transparent hover:text-violet-600"
                  >
                    Lihat detail
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
