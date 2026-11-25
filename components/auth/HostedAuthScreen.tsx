import { useAuth } from '@clerk/expo';
import { useHostedAuth } from '@clerk/expo/hosted-auth';
import { colors, spacing } from '@/constants/them';
import * as AuthSession from 'expo-auth-session';
import { Link, Redirect } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

WebBrowser.maybeCompleteAuthSession();

type HostedAuthScreenProps = {
  mode: 'sign-in' | 'sign-up';
  title: string;
  subtitle: string;
  buttonLabel: string;
  alternateHref: '/(auth)/sign-in' | '/(auth)/sign-up';
  alternateLabel: string;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Authentication failed. Please try again.';
}

export function HostedAuthScreen({
  mode,
  title,
  subtitle,
  buttonLabel,
  alternateHref,
  alternateLabel,
}: HostedAuthScreenProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const { startHostedAuth } = useHostedAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAuth = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: 'firstproject',
        path: 'sso-callback',
      });

      const result = await startHostedAuth({ mode, redirectUrl });

      if (!result.createdSessionId) {
        setErrorMessage('Sign-in was cancelled or incomplete.');
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <Pressable
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleAuth}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          )}
        </Pressable>

        <Link href={alternateHref} style={styles.link}>
          {alternateLabel}
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: spacing[5],
    gap: spacing[3],
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'sans-bold',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'sans-regular',
    color: colors.mutedForeground,
    marginBottom: spacing[2],
  },
  error: {
    fontSize: 14,
    fontFamily: 'sans-medium',
    color: colors.destructive,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[5],
    borderRadius: spacing[3],
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontFamily: 'sans-semibold',
  },
  link: {
    fontSize: 16,
    fontFamily: 'sans-semibold',
    color: colors.accent,
  },
});
