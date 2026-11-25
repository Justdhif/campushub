import type { Opportunity } from "@/domain/entities/opportunity";

export interface OpportunityRepository {
  getAll(): readonly Opportunity[];
  getById(id: string): Opportunity | undefined;
}
