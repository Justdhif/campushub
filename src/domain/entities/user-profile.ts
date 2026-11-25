import type { OpportunityCategory } from "./opportunity";

export type EducationLevel = "D3" | "D4" | "S1" | "S2" | "S3";

export interface UserProfile {
  readonly fullName: string;
  readonly email: string;
  readonly university: string;
  readonly major: string;
  readonly level: EducationLevel | "";
  readonly semester: string;
  readonly city: string;
  readonly interests: readonly OpportunityCategory[];
  readonly bio: string;
}

export interface RegistrationInput {
  readonly fullName: string;
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly acceptedPreviewNotice: boolean;
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  fullName: "",
  email: "",
  university: "",
  major: "",
  level: "",
  semester: "",
  city: "",
  interests: [],
  bio: "",
};

/**
 * Computes profile completeness percentage (0-100) across the 8 required profile fields.
 */
export function calculateProfileCompleteness(profile: UserProfile): number {
  const completedCount = [
    profile.fullName.trim().length > 0,
    profile.email.trim().length > 0,
    profile.university.trim().length > 0,
    profile.major.trim().length > 0,
    profile.level.length > 0,
    profile.semester.length > 0,
    profile.city.trim().length > 0,
    profile.interests.length > 0,
  ].filter(Boolean).length;

  return Math.round((completedCount / 8) * 100);
}

/**
 * Derives 2-letter initials for the workspace avatar, falling back to "AP".
 */
export function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "AP";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
