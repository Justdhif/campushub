import { opportunityRepository } from "@/infrastructure/repositories/static-opportunity-repository";
import { CategorySummaryGrid } from "@/presentation/components/category-summary-grid";
import { GreetingHeader } from "@/presentation/components/greeting-header";
import { HeroBanner } from "@/presentation/components/hero-banner";
import { OpportunityExplorer } from "@/presentation/components/opportunity-explorer";
import { WorkspaceShell } from "@/presentation/components/workspace-shell";

export default function HomePage() {
  const opportunities = opportunityRepository.getAll();

  return (
    <WorkspaceShell pageTitle="Beranda">
      <GreetingHeader personalized />
      <HeroBanner />
      <CategorySummaryGrid />
      <OpportunityExplorer
        opportunities={opportunities}
        sectionTitle="Peluang untukmu"
        sectionSubtitle="Pilihan kecil hari ini, dampak besar di masa depan."
      />
    </WorkspaceShell>
  );
}
