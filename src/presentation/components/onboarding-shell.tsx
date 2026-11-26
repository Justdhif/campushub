"use client";

import Link from "next/link";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CampusHubLogo } from "@/presentation/components/campushub-logo";
import { useWorkspaceState } from "@/presentation/hooks/use-workspace-state";
import { cn } from "cn";

interface OnboardingShellProps {
  activeStep: 1 | 2;
  children: React.ReactNode;
}

export function OnboardingShell({
  activeStep,
  children,
}: OnboardingShellProps) {
  const { isRegistered, isProfileCompleted } = useWorkspaceState();
  const isEditingExistingProfile = activeStep === 2 && isProfileCompleted;

  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <header className="flex min-h-20 flex-wrap items-center justify-between gap-3 border-b border-slate-700 bg-violet-900 px-5 py-4 text-white md:px-10">
        <CampusHubLogo variant="dark" />
        <Button
          variant="ghost"
          nativeButton={false}
          className="h-auto px-2 py-1 text-sm font-medium text-slate-200 hover:bg-transparent hover:text-white"
          render={<Link href="/" />}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke beranda
        </Button>
      </header>

      <main
        id="main-content"
        className="mx-auto grid max-w-6xl items-start gap-8 px-5 py-8 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-12 lg:gap-14"
      >
        {/* Left Informational Panel */}
        <aside
          aria-label="Informasi tahapan"
          className="space-y-6 rounded-3xl bg-[#e7eff6] p-7 lg:p-9"
        >
          <Badge
            variant="outline"
            className="h-auto rounded-full border-violet-200 bg-white/80 px-3 py-1 text-[11px] font-semibold tracking-wider text-violet-800"
          >
            {isEditingExistingProfile ? "PROFIL MAHASISWA" : "LANGKAH PERTAMAMU"}
          </Badge>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-violet-700 md:text-[28px]">
              {isEditingExistingProfile
                ? "Jaga profilmu tetap relevan."
                : "Masa depan besar, dimulai dari kamu."}
            </h2>
            <p className="text-sm leading-relaxed text-[#425f7b]">
              {isEditingExistingProfile
                ? "Perbarui latar belakang pendidikan dan minat agar rekomendasi peluang semakin sesuai."
                : "Kenalkan dirimu dan jelajahi kesempatan untuk belajar, bertumbuh, dan melangkah lebih jauh."}
            </p>
          </div>

          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  isRegistered || activeStep === 1
                    ? "bg-violet-700 text-white"
                    : "border border-violet-300 bg-white text-violet-700"
                )}
              >
                {isRegistered ? (
                  <Check className="size-3.5" aria-hidden="true" />
                ) : (
                  "1"
                )}
              </span>
              <div>
                <p className="text-sm font-semibold text-violet-700">
                  Daftarkan dirimu
                </p>
                <p className="text-xs text-[#425f7b]">
                  {isRegistered
                    ? "Identitas lokal sudah aktif."
                    : "Mulai perjalanan barumu di CampusHub."}
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  activeStep === 2 && isRegistered
                    ? "bg-violet-700 text-white"
                    : "border border-violet-300 bg-white text-violet-700"
                )}
              >
                {isProfileCompleted ? (
                  <Check className="size-3.5" aria-hidden="true" />
                ) : (
                  "2"
                )}
              </span>
              <div>
                <p className="text-sm font-semibold text-violet-700">
                  Lengkapi profil
                </p>
                <p className="text-xs text-[#425f7b]">
                  Ceritakan pendidikan dan minatmu.
                </p>
              </div>
            </li>
          </ol>

          <div className="rounded-2xl bg-white p-5">
            <Sparkles
              className="mb-2 size-4 text-violet-700"
              aria-hidden="true"
            />
            <blockquote className="text-sm font-bold leading-relaxed text-violet-700">
              “Kamu tidak harus hebat untuk memulai. Tapi kamu harus memulai
              untuk menjadi hebat.”
            </blockquote>
            <p className="mt-2 text-xs text-slate-500">
              Satu langkah lebih dekat dengan impianmu.
            </p>
          </div>

          <p className="text-xs leading-relaxed text-[#425f7b]">
            Pratinjau lokal · Bukan pembuatan akun sungguhan.
            <br />
            Data profil hanya tersimpan di browser ini.
          </p>
        </aside>

        {/* Right Form Card */}
        <div>{children}</div>
      </main>
    </div>
  );
}
