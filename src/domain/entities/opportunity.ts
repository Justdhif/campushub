export type OpportunityCategory =
  | "Magang"
  | "Beasiswa"
  | "Kompetisi"
  | "Bootcamp";

export type OpportunitySortOption = "relevant" | "deadline" | "newest";

export interface Opportunity {
  readonly id: string;
  readonly title: string;
  readonly organization: string;
  readonly organizationBadgeText: string;
  readonly organizationBadgeClass: string;
  readonly category: OpportunityCategory;
  readonly location: string;
  readonly workMode: string;
  readonly isRemote: boolean;
  readonly daysLeft: number;
  readonly tags: readonly string[];
  readonly highlightTag?: string;
  readonly compensation: string;
  readonly description: string;
  readonly criteria: readonly string[];
  readonly publishedOrder: number;
}

export interface OpportunityFilter {
  readonly query: string;
  readonly category: OpportunityCategory | "all";
  readonly remoteOnly: boolean;
  readonly sortBy: OpportunitySortOption;
}
