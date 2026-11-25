import type { RegistrationInput } from "@/domain/entities/user-profile";

export type RegistrationErrors = Partial<
  Record<keyof RegistrationInput, string>
>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HAS_LETTER_AND_DIGIT = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

/**
 * Validates the registration preview form fields without persisting credentials.
 */
export function validateRegistration(
  input: RegistrationInput
): RegistrationErrors {
  const errors: RegistrationErrors = {};

  if (input.fullName.trim().length < 2) {
    errors.fullName = "Masukkan nama lengkap minimal 2 karakter.";
  }

  if (!EMAIL_REGEX.test(input.email.trim())) {
    errors.email = "Masukkan alamat email dengan format nama@email.com.";
  }

  if (!HAS_LETTER_AND_DIGIT.test(input.password)) {
    errors.password =
      "Kata sandi minimal 8 karakter dan wajib mengandung huruf serta angka.";
  }

  if (input.confirmPassword !== input.password || !input.confirmPassword) {
    errors.confirmPassword = "Konfirmasi kata sandi harus sama.";
  }

  if (!input.acceptedPreviewNotice) {
    errors.acceptedPreviewNotice =
      "Centang pernyataan pratinjau lokal sebelum melanjutkan.";
  }

  return errors;
}
