import type {
  Opportunity,
  OpportunityCategory,
  OpportunityFilter,
} from "@/domain/entities/opportunity";

export const OPPORTUNITY_CATEGORIES: readonly OpportunityCategory[] = [
  "Magang",
  "Beasiswa",
  "Kompetisi",
  "Bootcamp",
];

/**
 * Filters and sorts opportunities purely according to search query, category, remote flag, and sort option.
 */
export function filterAndSortOpportunities(
  opportunities: readonly Opportunity[],
  filter: OpportunityFilter
): Opportunity[] {
  const normalizedQuery = filter.query.trim().toLowerCase();

  const filtered = opportunities.filter((item) => {
    if (filter.category !== "all" && item.category !== filter.category) {
      return false;
    }
    if (filter.remoteOnly && !item.isRemote) {
      return false;
    }
    if (!normalizedQuery) return true;

    const searchable = [
      item.title,
      item.organization,
      item.category,
      item.location,
      item.workMode,
      ...item.tags,
      item.highlightTag ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });

  if (filter.sortBy === "deadline") {
    return [...filtered].sort((a, b) => a.daysLeft - b.daysLeft);
  }
  if (filter.sortBy === "newest") {
    return [...filtered].sort((a, b) => b.publishedOrder - a.publishedOrder);
  }
  return [...filtered].sort((a, b) => a.publishedOrder - b.publishedOrder);
}

export function getCategoryCounts(
  opportunities: readonly Opportunity[]
): Record<OpportunityCategory, number> {
  const counts: Record<OpportunityCategory, number> = {
    Magang: 0,
    Beasiswa: 0,
    Kompetisi: 0,
    Bootcamp: 0,
  };

  for (const item of opportunities) {
    counts[item.category] += 1;
  }

  return counts;
}

export function getUrgentOpportunities(
  opportunities: readonly Opportunity[],
  limit = 3
): Opportunity[] {
  return [...opportunities]
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, limit);
}
