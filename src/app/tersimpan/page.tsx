import { opportunityRepository } from "@/infrastructure/repositories/static-opportunity-repository";
import { CategorySummaryGrid } from "@/presentation/components/category-summary-grid";
import { GreetingHeader } from "@/presentation/components/greeting-header";
import { OpportunityExplorer } from "@/presentation/components/opportunity-explorer";
import { WorkspaceShell } from "@/presentation/components/workspace-shell";

export default function SavedPage() {
  const opportunities = opportunityRepository.getAll();

  return (
    <WorkspaceShell pageTitle="Tersimpan">
      <GreetingHeader title="Peluang pilihanmu ✦" />
      <CategorySummaryGrid />
      <OpportunityExplorer
        opportunities={opportunities}
        sectionTitle="Koleksi tersimpan"
        sectionSubtitle="Simpan hari ini, wujudkan esok hari."
        savedOnly
      />
    </WorkspaceShell>
  );
}
