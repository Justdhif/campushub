import type { UserProfile } from "@/domain/entities/user-profile";

export interface WorkspaceStorageRepository {
  getSavedIds(): string[];
  saveSavedIds(ids: readonly string[]): void;
  getProfile(): UserProfile;
  saveProfile(profile: UserProfile): void;
}
