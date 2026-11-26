import {
  DEFAULT_USER_PROFILE,
  type UserProfile,
} from "@/domain/entities/user-profile";
import type { WorkspaceStorageRepository } from "@/domain/repositories/workspace-storage-repository";

const SAVED_IDS_KEY = "campushub.savedOpportunityIds";
const PROFILE_KEY = "campushub.userProfile";

export class LocalWorkspaceStorageRepository
  implements WorkspaceStorageRepository
{
  getSavedIds(): string[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(SAVED_IDS_KEY);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed)
        ? parsed.filter((id): id is string => typeof id === "string")
        : [];
    } catch {
      return [];
    }
  }

  saveSavedIds(ids: readonly string[]): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(SAVED_IDS_KEY, JSON.stringify(ids));
    } catch {
      // Ignore storage quota or private-mode failures.
    }
  }

  getProfile(): UserProfile {
    if (typeof window === "undefined") return DEFAULT_USER_PROFILE;
    try {
      const raw = window.localStorage.getItem(PROFILE_KEY);
      if (!raw) return DEFAULT_USER_PROFILE;
      const parsed = JSON.parse(raw) as Partial<UserProfile>;
      const hasLegacyIdentity =
        typeof parsed.fullName === "string" &&
        parsed.fullName.trim().length > 0;
      return {
        ...DEFAULT_USER_PROFILE,
        ...parsed,
        isRegistered: parsed.isRegistered ?? hasLegacyIdentity,
        isProfileCompleted: parsed.isProfileCompleted ?? false,
        interests: Array.isArray(parsed.interests) ? parsed.interests : [],
      };
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  }

  saveProfile(profile: UserProfile): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore storage quota or private-mode failures.
    }
  }
}

export const workspaceStorageRepository = new LocalWorkspaceStorageRepository();
