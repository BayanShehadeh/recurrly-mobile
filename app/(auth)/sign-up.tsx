import { HostedAuthScreen } from '@/components/auth/HostedAuthScreen';

export default function SignUp() {
  return (
    <HostedAuthScreen
      mode="sign-up"
      title="Sign up"
      subtitle="Create an account to get started."
      buttonLabel="Sign up"
      alternateHref="/(auth)/sign-in"
      alternateLabel="Already have an account? Sign in"
    />
  );
}
