import { HostedAuthScreen } from '@/components/auth/HostedAuthScreen';

export default function SignIn() {
  return (
    <HostedAuthScreen
      mode="sign-in"
      title="Sign in"
      subtitle="Continue with your account."
      buttonLabel="Sign in"
      alternateHref="/(auth)/sign-up"
      alternateLabel="Create an account"
    />
  );
}
