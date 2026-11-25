import { opportunityRepository } from "@/infrastructure/repositories/static-opportunity-repository";
import { CalendarAgenda } from "@/presentation/components/calendar-agenda";
import { CategorySummaryGrid } from "@/presentation/components/category-summary-grid";
import { GreetingHeader } from "@/presentation/components/greeting-header";
import { WorkspaceShell } from "@/presentation/components/workspace-shell";

export default function CalendarPage() {
  const opportunities = opportunityRepository.getAll();

  return (
    <WorkspaceShell pageTitle="Kalender">
      <GreetingHeader title="Jangan lewatkan momennya ✦" />
      <CategorySummaryGrid />
      <CalendarAgenda opportunities={opportunities} />
    </WorkspaceShell>
  );
}
