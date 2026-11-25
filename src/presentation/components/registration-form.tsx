"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  validateRegistration,
  type RegistrationErrors,
} from "@/application/use-cases/validate-registration";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RegistrationInput } from "@/domain/entities/user-profile";
import { useWorkspaceState } from "@/presentation/hooks/use-workspace-state";

export function RegistrationForm() {
  const router = useRouter();
  const { profile, updateProfile } = useWorkspaceState();

  const [edits, setEdits] = React.useState<Partial<RegistrationInput>>({});
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof RegistrationInput, boolean>>
  >({});
  const [submitted, setSubmitted] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);

  const values = React.useMemo<RegistrationInput>(
    () => ({
      fullName: edits.fullName ?? profile.fullName,
      email: edits.email ?? profile.email,
      password: edits.password ?? "",
      confirmPassword: edits.confirmPassword ?? "",
      acceptedPreviewNotice: edits.acceptedPreviewNotice ?? false,
    }),
    [edits, profile.email, profile.fullName]
  );

  const setValues = React.useCallback(
    (updater: (prev: RegistrationInput) => RegistrationInput) => {
      setEdits((prevEdits) => {
        const current: RegistrationInput = {
          fullName: prevEdits.fullName ?? profile.fullName,
          email: prevEdits.email ?? profile.email,
          password: prevEdits.password ?? "",
          confirmPassword: prevEdits.confirmPassword ?? "",
          acceptedPreviewNotice: prevEdits.acceptedPreviewNotice ?? false,
        };
        return updater(current);
      });
    },
    [profile.email, profile.fullName]
  );

  const allErrors = React.useMemo(() => validateRegistration(values), [values]);

  const visibleError = (field: keyof RegistrationInput): string | undefined => {
    if (!submitted && !touched[field]) return undefined;
    return allErrors[field];
  };

  const handleFieldBlur = (field: keyof RegistrationInput) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const errors: RegistrationErrors = validateRegistration(values);
    if (Object.keys(errors).length > 0) {
      const firstInvalidField = Object.keys(errors)[0];
      const target = formRef.current?.querySelector<HTMLElement>(
        `[data-field="${firstInvalidField}"]`
      );
      target?.focus();
      return;
    }

    // Store only profile identity locally; password is never persisted in localStorage.
    updateProfile({
      ...profile,
      fullName: values.fullName.trim(),
      email: values.email.trim(),
    });
    router.push("/profil");
  };

  const nameError = visibleError("fullName");
  const emailError = visibleError("email");
  const passwordError = visibleError("password");
  const confirmError = visibleError("confirmPassword");
  const noticeError = visibleError("acceptedPreviewNotice");

  return (
    <Card className="rounded-3xl border border-[#e1e7ed] bg-white p-6 ring-0 md:p-8">
      <div className="mb-6 space-y-1.5">
        <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
          LANGKAH 01 DARI 02
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[#103757]">
          Mulai perjalananmu
        </h1>
        <p className="text-sm text-slate-500">
          Isi data di bawah untuk melanjutkan ke profilmu.
        </p>
      </div>

      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="reg-fullname"
              className="text-sm font-medium text-[#103757]"
            >
              Nama lengkap <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="reg-fullname"
              data-field="fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              enterKeyHint="next"
              placeholder="Nama lengkap kamu"
              value={values.fullName}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, fullName: event.target.value }))
              }
              onBlur={() => handleFieldBlur("fullName")}
              aria-invalid={Boolean(nameError)}
              aria-describedby={nameError ? "reg-fullname-error" : undefined}
              className="h-11 rounded-lg border-[#dce3ea] px-3.5 text-sm"
            />
            {nameError && (
              <p id="reg-fullname-error" className="text-xs text-orange-600">
                {nameError}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="reg-email"
              className="text-sm font-medium text-[#103757]"
            >
              Email <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="reg-email"
              data-field="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              spellCheck={false}
              enterKeyHint="next"
              placeholder="kamu@email.com"
              value={values.email}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
              onBlur={() => handleFieldBlur("email")}
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? "reg-email-error" : undefined}
              className="h-11 rounded-lg border-[#dce3ea] px-3.5 text-sm"
            />
            {emailError && (
              <p id="reg-email-error" className="text-xs text-orange-600">
                {emailError}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="reg-password"
            className="text-sm font-medium text-[#103757]"
          >
            Kata sandi <span aria-hidden="true">*</span>
          </Label>
          <p id="reg-password-hint" className="text-xs text-slate-500">
            Minimal 8 karakter, dengan huruf dan angka. Tidak disimpan.
          </p>
          <div className="relative">
            <Input
              id="reg-password"
              data-field="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              enterKeyHint="next"
              placeholder="Buat kata sandi"
              value={values.password}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, password: event.target.value }))
              }
              onBlur={() => handleFieldBlur("password")}
              aria-invalid={Boolean(passwordError)}
              aria-describedby={
                passwordError
                  ? "reg-password-hint reg-password-error"
                  : "reg-password-hint"
              }
              className="h-11 rounded-lg border-[#dce3ea] pr-24 pl-3.5 text-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-pressed={showPassword}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-1.5 h-8 -translate-y-1/2 px-2.5 text-xs font-semibold text-violet-700 hover:bg-violet-50"
            >
              {showPassword ? "Sembunyikan" : "Tampilkan"}
            </Button>
          </div>
          {passwordError && (
            <p id="reg-password-error" className="text-xs text-orange-600">
              {passwordError}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="reg-confirm-password"
            className="text-sm font-medium text-[#103757]"
          >
            Konfirmasi kata sandi <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="reg-confirm-password"
            data-field="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            enterKeyHint="done"
            placeholder="Ulangi kata sandi"
            value={values.confirmPassword}
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                confirmPassword: event.target.value,
              }))
            }
            onBlur={() => handleFieldBlur("confirmPassword")}
            aria-invalid={Boolean(confirmError)}
            aria-describedby={confirmError ? "reg-confirm-error" : undefined}
            className="h-11 rounded-lg border-[#dce3ea] px-3.5 text-sm"
          />
          {confirmError && (
            <p id="reg-confirm-error" className="text-xs text-orange-600">
              {confirmError}
            </p>
          )}
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex items-start gap-2.5">
            <Checkbox
              id="reg-preview-notice"
              data-field="acceptedPreviewNotice"
              checked={values.acceptedPreviewNotice}
              onCheckedChange={(checked) => {
                setTouched((prev) => ({
                  ...prev,
                  acceptedPreviewNotice: true,
                }));
                setValues((prev) => ({
                  ...prev,
                  acceptedPreviewNotice: Boolean(checked),
                }));
              }}
              aria-invalid={Boolean(noticeError)}
              className="mt-0.5"
            />
            <Label
              htmlFor="reg-preview-notice"
              className="cursor-pointer text-xs leading-relaxed font-normal text-slate-600"
            >
              Saya memahami ini pratinjau dan data profil disimpan secara lokal
              di browser ini.
            </Label>
          </div>
          {noticeError && (
            <p className="text-xs text-orange-600">{noticeError}</p>
          )}
        </div>

        <Button
          type="submit"
          className="h-11 w-full rounded-lg bg-violet-600 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Lanjutkan ke profil
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>

        <p className="text-center text-xs text-slate-500">
          Kata sandi hanya digunakan untuk validasi formulir, bukan autentikasi.
        </p>
      </form>
    </Card>
  );
}
