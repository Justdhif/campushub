import { OnboardingShell } from "@/presentation/components/onboarding-shell";
import { ProfileForm } from "@/presentation/components/profile-form";

export default function ProfilePage() {
  return (
    <OnboardingShell activeStep={2}>
      <ProfileForm />
    </OnboardingShell>
  );
}
