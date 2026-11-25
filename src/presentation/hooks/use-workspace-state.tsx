"use client";

import * as React from "react";
import {
  DEFAULT_USER_PROFILE,
  getInitials,
  type UserProfile,
} from "@/domain/entities/user-profile";
import { workspaceStorageRepository } from "@/infrastructure/repositories/local-workspace-storage-repository";

interface WorkspaceContextValue {
  savedIds: readonly string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
  displayName: string;
  firstName: string;
  initials: string;
  isInfoBannerOpen: boolean;
  openInfoBanner: () => void;
  dismissInfoBanner: () => void;
}

const WorkspaceContext = React.createContext<WorkspaceContextValue | null>(
  null
);

const EMPTY_SAVED_IDS: readonly string[] = [];

const listeners = new Set<() => void>();
let cachedSavedIds: readonly string[] | null = null;
let cachedProfile: UserProfile | null = null;

function subscribeToWorkspaceStore(listener: () => void): () => void {
  listeners.add(listener);
  const handleStorage = () => {
    cachedSavedIds = null;
    cachedProfile = null;
    listener();
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function emitWorkspaceChange(): void {
  for (const listener of listeners) {
    listener();
  }
}

function getSavedIdsSnapshot(): readonly string[] {
  if (!cachedSavedIds) {
    cachedSavedIds = workspaceStorageRepository.getSavedIds();
  }
  return cachedSavedIds;
}

function getSavedIdsServerSnapshot(): readonly string[] {
  return EMPTY_SAVED_IDS;
}

function getProfileSnapshot(): UserProfile {
  if (!cachedProfile) {
    cachedProfile = workspaceStorageRepository.getProfile();
  }
  return cachedProfile;
}

function getProfileServerSnapshot(): UserProfile {
  return DEFAULT_USER_PROFILE;
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const savedIds = React.useSyncExternalStore(
    subscribeToWorkspaceStore,
    getSavedIdsSnapshot,
    getSavedIdsServerSnapshot
  );
  const profile = React.useSyncExternalStore(
    subscribeToWorkspaceStore,
    getProfileSnapshot,
    getProfileServerSnapshot
  );
  const [isInfoBannerOpen, setIsInfoBannerOpen] = React.useState(false);

  const isSaved = React.useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  );

  const toggleSaved = React.useCallback((id: string) => {
    const current = getSavedIdsSnapshot();
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    cachedSavedIds = next;
    workspaceStorageRepository.saveSavedIds(next);
    emitWorkspaceChange();
  }, []);

  const updateProfile = React.useCallback((nextProfile: UserProfile) => {
    cachedProfile = nextProfile;
    workspaceStorageRepository.saveProfile(nextProfile);
    emitWorkspaceChange();
  }, []);

  const displayName = profile.fullName.trim() || "Andi Pratama";
  const firstName = displayName.split(/\s+/)[0] || "Andi";
  const initials = getInitials(displayName);

  const value = React.useMemo<WorkspaceContextValue>(
    () => ({
      savedIds,
      isSaved,
      toggleSaved,
      profile,
      updateProfile,
      displayName,
      firstName,
      initials,
      isInfoBannerOpen,
      openInfoBanner: () => setIsInfoBannerOpen(true),
      dismissInfoBanner: () => setIsInfoBannerOpen(false),
    }),
    [
      savedIds,
      isSaved,
      toggleSaved,
      profile,
      updateProfile,
      displayName,
      firstName,
      initials,
      isInfoBannerOpen,
    ]
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspaceState(): WorkspaceContextValue {
  const ctx = React.useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspaceState must be used within WorkspaceProvider");
  }
  return ctx;
}
