import { OnboardingShell } from "@/presentation/components/onboarding-shell";
import { RegistrationForm } from "@/presentation/components/registration-form";

export default function RegistrationPage() {
  return (
    <OnboardingShell activeStep={1}>
      <RegistrationForm />
    </OnboardingShell>
  );
}
