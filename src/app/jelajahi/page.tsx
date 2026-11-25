import { Suspense } from "react";
import { OPPORTUNITY_CATEGORIES } from "@/application/use-cases/filter-opportunities";
import type { OpportunityCategory } from "@/domain/entities/opportunity";
import { opportunityRepository } from "@/infrastructure/repositories/static-opportunity-repository";
import { CategorySummaryGrid } from "@/presentation/components/category-summary-grid";
import { GreetingHeader } from "@/presentation/components/greeting-header";
import { OpportunityExplorer } from "@/presentation/components/opportunity-explorer";
import { WorkspaceShell } from "@/presentation/components/workspace-shell";

async function ExploreResults({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; peluang?: string }>;
}) {
  const params = await searchParams;
  const opportunities = opportunityRepository.getAll();

  const initialCategory: OpportunityCategory | "all" =
    params.kategori &&
    OPPORTUNITY_CATEGORIES.includes(params.kategori as OpportunityCategory)
      ? (params.kategori as OpportunityCategory)
      : "all";

  return (
    <OpportunityExplorer
      key={`${initialCategory}-${params.peluang ?? ""}`}
      opportunities={opportunities}
      sectionTitle="Peluang untukmu"
      sectionSubtitle="Pilihan kecil hari ini, dampak besar di masa depan."
      initialCategory={initialCategory}
      initialSelectedId={params.peluang}
    />
  );
}

export default function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; peluang?: string }>;
}) {
  const opportunities = opportunityRepository.getAll();

  return (
    <WorkspaceShell pageTitle="Jelajahi peluang">
      <GreetingHeader personalized />
      <CategorySummaryGrid />
      <Suspense
        fallback={
          <OpportunityExplorer
            opportunities={opportunities}
            sectionTitle="Peluang untukmu"
            sectionSubtitle="Pilihan kecil hari ini, dampak besar di masa depan."
          />
        }
      >
        <ExploreResults searchParams={searchParams} />
      </Suspense>
    </WorkspaceShell>
  );
}
