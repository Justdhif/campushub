"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Briefcase,
  Check,
  Globe,
  GraduationCap,
  Plus,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { OpportunityCategory } from "@/domain/entities/opportunity";
import {
  calculateProfileCompleteness,
  type EducationLevel,
  type UserProfile,
} from "@/domain/entities/user-profile";
import { useWorkspaceState } from "@/presentation/hooks/use-workspace-state";
import { cn } from "cn";

const EDUCATION_LEVELS: readonly EducationLevel[] = [
  "D3",
  "D4",
  "S1",
  "S2",
  "S3",
];

const SEMESTER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9+"] as const;

const INTEREST_OPTIONS: readonly {
  value: OpportunityCategory;
  icon: typeof Briefcase;
}[] = [
  { value: "Magang", icon: Briefcase },
  { value: "Beasiswa", icon: GraduationCap },
  { value: "Kompetisi", icon: Sparkles },
  { value: "Bootcamp", icon: Globe },
];

export function ProfileForm() {
  const router = useRouter();
  const { profile, updateProfile } = useWorkspaceState();

  const [edits, setEdits] = React.useState<Partial<UserProfile>>({});
  const [savedFeedback, setSavedFeedback] = React.useState(false);

  const draft = React.useMemo<UserProfile>(
    () => ({ ...profile, ...edits }),
    [profile, edits]
  );

  const setDraft = React.useCallback(
    (updater: (prev: UserProfile) => UserProfile) => {
      setEdits((prevEdits) => {
        const current = { ...profile, ...prevEdits };
        return updater(current);
      });
    },
    [profile]
  );

  const completeness = React.useMemo(
    () => calculateProfileCompleteness(draft),
    [draft]
  );

  const toggleInterest = (category: OpportunityCategory) => {
    setSavedFeedback(false);
    setDraft((prev) => {
      const exists = prev.interests.includes(category);
      const interests = exists
        ? prev.interests.filter((item) => item !== category)
        : [...prev.interests, category];
      return { ...prev, interests };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile(draft);
    setSavedFeedback(true);
    router.push("/");
  };

  return (
    <Card className="rounded-3xl border border-[#e1e7ed] bg-white p-6 ring-0 md:p-8">
      <div className="mb-5 space-y-1.5">
        <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
          LANGKAH 02 DARI 02
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[#103757]">
          Kenalan lebih dekat, yuk!
        </h1>
        <p className="text-sm text-slate-500">
          Lengkapi profil agar tujuan dan minatmu terkumpul di satu tempat.
        </p>
      </div>

      {/* Completeness Progress Bar */}
      <div className="mb-6 rounded-xl bg-[#f0f5fa] p-4">
        <Progress value={completeness} className="gap-2.5">
          <ProgressLabel className="text-xs font-semibold text-[#103757]">
            Kelengkapan profil
          </ProgressLabel>
          <ProgressValue className="text-xs font-bold text-[#103757]">
            {() => `${completeness}%`}
          </ProgressValue>
        </Progress>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="profile-fullname"
              className="text-sm font-medium text-[#103757]"
            >
              Nama lengkap <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="profile-fullname"
              name="fullName"
              required
              autoComplete="name"
              placeholder="Nama lengkap kamu"
              value={draft.fullName}
              onChange={(event) => {
                setSavedFeedback(false);
                setDraft((prev) => ({ ...prev, fullName: event.target.value }));
              }}
              className="h-11 rounded-lg border-[#dce3ea] px-3.5 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="profile-email"
              className="text-sm font-medium text-[#103757]"
            >
              Email <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="profile-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              spellCheck={false}
              placeholder="kamu@email.com"
              value={draft.email}
              onChange={(event) => {
                setSavedFeedback(false);
                setDraft((prev) => ({ ...prev, email: event.target.value }));
              }}
              className="h-11 rounded-lg border-[#dce3ea] px-3.5 text-sm"
            />
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-5">
          <div>
            <h2 className="text-sm font-bold text-[#103757]">
              Pendidikan &amp; domisili
            </h2>
            <p className="text-xs text-slate-500">
              Ceritakan kesibukanmu saat ini.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="profile-university"
              className="text-sm font-medium text-[#103757]"
            >
              Perguruan tinggi <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="profile-university"
              name="university"
              required
              placeholder="Contoh: Universitas Indonesia"
              value={draft.university}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  university: event.target.value,
                }))
              }
              className="h-11 rounded-lg border-[#dce3ea] px-3.5 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="profile-major"
              className="text-sm font-medium text-[#103757]"
            >
              Program studi <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="profile-major"
              name="major"
              required
              placeholder="Contoh: Teknik Informatika"
              value={draft.major}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, major: event.target.value }))
              }
              className="h-11 rounded-lg border-[#dce3ea] px-3.5 text-sm"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="profile-level"
                className="text-sm font-medium text-[#103757]"
              >
                Jenjang <span aria-hidden="true">*</span>
              </Label>
              <Select
                value={draft.level}
                onValueChange={(value) =>
                  setDraft((prev) => ({
                    ...prev,
                    level: (value ?? "") as EducationLevel | "",
                  }))
                }
              >
                <SelectTrigger
                  id="profile-level"
                  className="h-11 w-full rounded-lg border-[#dce3ea] px-3.5 text-sm"
                >
                  <SelectValue placeholder="Pilih jenjang" />
                </SelectTrigger>
                <SelectContent>
                  {EDUCATION_LEVELS.map((lvl) => (
                    <SelectItem key={lvl} value={lvl}>
                      {lvl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="profile-semester"
                className="text-sm font-medium text-[#103757]"
              >
                Semester <span aria-hidden="true">*</span>
              </Label>
              <Select
                value={draft.semester}
                onValueChange={(value) =>
                  setDraft((prev) => ({ ...prev, semester: value ?? "" }))
                }
              >
                <SelectTrigger
                  id="profile-semester"
                  className="h-11 w-full rounded-lg border-[#dce3ea] px-3.5 text-sm"
                >
                  <SelectValue placeholder="Pilih semester" />
                </SelectTrigger>
                <SelectContent>
                  {SEMESTER_OPTIONS.map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="profile-city"
              className="text-sm font-medium text-[#103757]"
            >
              Kota domisili <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="profile-city"
              name="city"
              required
              autoComplete="address-level2"
              placeholder="Contoh: Bandung"
              value={draft.city}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, city: event.target.value }))
              }
              className="h-11 rounded-lg border-[#dce3ea] px-3.5 text-sm"
            />
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-5">
          <div>
            <p className="text-sm font-bold text-[#103757]">
              Peluang yang kamu cari <span aria-hidden="true">*</span>
            </p>
            <p className="text-xs text-slate-500">
              Pilih satu atau lebih minatmu.
            </p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {INTEREST_OPTIONS.map(({ value, icon: Icon }) => {
              const selected = draft.interests.includes(value);

              return (
                <Button
                  key={value}
                  type="button"
                  variant="outline"
                  aria-pressed={selected}
                  onClick={() => toggleInterest(value)}
                  className={cn(
                    "h-11 justify-between rounded-xl border-[#dce3ea] px-3.5 text-sm font-medium text-[#103757]",
                    selected &&
                      "border-violet-500 bg-violet-50 font-semibold text-violet-800"
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon className="size-4 text-slate-500" aria-hidden="true" />
                    {value}
                  </span>
                  {selected ? (
                    <Check
                      className="size-4 text-violet-700"
                      aria-hidden="true"
                    />
                  ) : (
                    <Plus className="size-4 text-slate-400" aria-hidden="true" />
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="profile-bio"
            className="text-sm font-medium text-[#103757]"
          >
            Tentang kamu{" "}
            <span className="font-normal text-slate-500">(opsional)</span>
          </Label>
          <Textarea
            id="profile-bio"
            name="bio"
            maxLength={300}
            rows={4}
            placeholder="Ceritakan minat, keterampilan, atau tujuanmu..."
            value={draft.bio}
            onChange={(event) =>
              setDraft((prev) => ({
                ...prev,
                bio: event.target.value.slice(0, 300),
              }))
            }
            className="rounded-xl border-[#dce3ea] p-3.5 text-sm"
          />
          <p className="text-right text-xs text-slate-500">
            {draft.bio.length}/300
          </p>
        </div>

        <Button
          type="submit"
          className="h-11 w-full rounded-lg bg-violet-600 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Simpan profil
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>

        {savedFeedback && (
          <p role="status" className="text-center text-xs text-emerald-700">
            Profil tersimpan di browser ini.
          </p>
        )}

        <p className="text-center text-xs text-slate-500">
          Data ini tidak tersinkron ke perangkat lain. Kamu dapat mengeditnya
          kapan saja.
        </p>
      </form>
    </Card>
  );
}
