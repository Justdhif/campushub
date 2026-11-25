"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Bell,
  Bookmark,
  Calendar,
  ChevronRight,
  GraduationCap,
  HelpCircle,
  LayoutGrid,
  LogIn,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CampusHubLogo } from "@/presentation/components/campushub-logo";
import { RightRail } from "@/presentation/components/right-rail";
import { useWorkspaceState } from "@/presentation/hooks/use-workspace-state";
import { cn } from "cn";

interface WorkspaceShellProps {
  pageTitle: string;
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { href: "/", label: "Beranda", icon: LayoutGrid },
  { href: "/jelajahi", label: "Jelajahi peluang", icon: Search },
  { href: "/tersimpan", label: "Tersimpan", icon: Bookmark, hasSavedBadge: true },
  { href: "/kalender", label: "Kalender", icon: Calendar },
  { href: "/profil", label: "Profil saya", icon: GraduationCap },
  { href: "/registrasi", label: "Registrasi", icon: LogIn },
] as const;

export function WorkspaceShell({ pageTitle, children }: WorkspaceShellProps) {
  const pathname = usePathname();
  const {
    savedIds,
    displayName,
    initials,
    isInfoBannerOpen,
    openInfoBanner,
    dismissInfoBanner,
  } = useWorkspaceState();

  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <a
        href="#main-content"
        className="visually-hidden fixed top-3 left-3 z-50 rounded-lg bg-violet-700 px-3 py-2 text-sm font-semibold text-white shadow-md"
      >
        Lewati ke konten utama
      </a>

      {/* Persistent Desktop Sidebar (224px) */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[224px] flex-col border-r border-[#dfe5ec] bg-white px-5 py-8 lg:flex">
        <div className="mb-8 px-1">
          <CampusHubLogo variant="light" />
        </div>

        <p className="mb-3 px-3 text-xs font-semibold tracking-widest text-slate-500 uppercase">
          WORKSPACE
        </p>

        <nav aria-label="Workspace" className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-[#e2ecf5] font-semibold text-violet-700"
                    : "font-medium text-slate-600 hover:bg-slate-50 hover:text-violet-700"
                )}
              >
                <Icon className="size-[18px] shrink-0" aria-hidden="true" />
                <span className="truncate">{item.label}</span>
                {"hasSavedBadge" in item && item.hasSavedBadge && (
                  <Badge
                    variant="secondary"
                    className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                  >
                    {savedIds.length}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-4 pt-6">
          <div className="rounded-xl bg-[#f0f4f8] p-4">
            <Sparkles
              className="mb-2 size-4 text-[#103757]"
              aria-hidden="true"
            />
            <p className="text-sm font-bold leading-snug text-[#103757]">
              Langkah kecil, masa depan besar.
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
              Peluang terbaik dimulai dari keberanian mencoba.
            </p>
            <Link
              href="/jelajahi"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-violet-700 hover:underline"
            >
              Mulai eksplorasi
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={openInfoBanner}
            className="h-auto w-full justify-start gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-violet-700"
          >
            <HelpCircle className="size-[18px]" aria-hidden="true" />
            Pusat bantuan
          </Button>

          <Link
            href="/profil"
            className="flex items-center gap-3 rounded-xl border-t border-slate-100 pt-3 transition-colors hover:opacity-90"
          >
            <Avatar size="lg" className="bg-[#dce8f2] text-[#103757]">
              <AvatarFallback className="bg-[#dce8f2] text-sm font-semibold text-[#103757]">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#103757]">
                {displayName}
              </p>
              <p className="text-xs text-slate-500">Edit profil</p>
            </div>
            <ChevronRight
              className="size-4 shrink-0 text-slate-400"
              aria-hidden="true"
            />
          </Link>
        </div>
      </aside>

      {/* Main Content Area Offset */}
      <div className="lg:pl-[224px]">
        <header className="flex h-[88px] items-center justify-between gap-4 border-b border-slate-700 bg-[#151f2d] px-5 text-white md:px-8">
          <div className="min-w-0">
            <p className="text-lg font-bold tracking-tight text-white">
              {pageTitle}
            </p>
            <p className="hidden truncate text-xs text-slate-300 sm:block">
              Ruang untuk menemukan langkah besarmu.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <span className="hidden text-xs text-slate-300 sm:inline">
              Senin, 19 Mei 2025
            </span>
            <span
              className="hidden h-5 w-px bg-slate-600 sm:inline-block"
              aria-hidden="true"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Tampilkan informasi notifikasi"
              aria-expanded={isInfoBannerOpen}
              onClick={() =>
                isInfoBannerOpen ? dismissInfoBanner() : openInfoBanner()
              }
              className="relative size-11 rounded-lg border-slate-600 bg-transparent text-white hover:bg-slate-800 hover:text-white"
            >
              <Bell className="size-4" aria-hidden="true" />
              <span
                className="absolute top-2.5 right-2.5 size-2 rounded-full bg-red-500"
                aria-hidden="true"
              />
            </Button>
            <Link
              href="/profil"
              aria-label={`Profil ${displayName}`}
              className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Avatar size="lg" className="bg-[#dce8f2] text-[#103757]">
                <AvatarFallback className="bg-[#dce8f2] text-sm font-semibold text-[#103757]">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        {/* Mobile Horizontal Navigation */}
        <nav
          aria-label="Navigasi workspace mobile"
          className="flex gap-2 overflow-x-auto border-b border-[#dfe5ec] bg-white px-4 py-2.5 lg:hidden"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-[#e2ecf5] font-semibold text-violet-700"
                    : "font-medium text-slate-600 hover:bg-slate-50"
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                <span>{item.label}</span>
                {"hasSavedBadge" in item && item.hasSavedBadge && (
                  <Badge
                    variant="secondary"
                    className="rounded-md bg-slate-100 px-1.5 py-0 text-[11px] text-slate-600"
                  >
                    {savedIds.length}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Dismissible Info / Help Banner */}
        {isInfoBannerOpen && (
          <div
            role="status"
            className="mx-5 mt-5 flex items-start justify-between gap-4 rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-900 md:mx-8"
          >
            <p className="leading-relaxed">
              Selamat datang di CampusHub! Ini adalah pratinjau dengan data
              contoh. Peluang tersimpan hanya disimpan di browser ini. Butuh
              bantuan? Mulai dengan mencari bidang yang kamu minati.
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Tutup pemberitahuan"
              onClick={dismissInfoBanner}
              className="shrink-0 text-violet-700 hover:bg-violet-100"
            >
              <X className="size-4" aria-hidden="true" />
            </Button>
          </div>
        )}

        <main id="main-content" tabIndex={-1} className="mx-auto max-w-[1560px] p-5 md:p-8">
          <div className="grid min-w-0 grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">{children}</div>
            <RightRail />
          </div>
        </main>
      </div>
    </div>
  );
}
