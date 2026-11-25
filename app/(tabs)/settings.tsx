import { useAuth, useUser } from '@clerk/expo';
import { colors, spacing } from '@/constants/them';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      router.replace('/(auth)/sign-in');
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        {!isLoaded ? (
          <ActivityIndicator size="large" color={colors.accent} />
        ) : isSignedIn ? (
          <View style={styles.account}>
            <Text style={styles.label}>Signed in as</Text>
            <Text style={styles.email}>
              {user?.primaryEmailAddress?.emailAddress ??
                user?.username ??
                'Account'}
            </Text>
            <Pressable
              style={[styles.button, isSigningOut && styles.buttonDisabled]}
              onPress={handleSignOut}
              disabled={isSigningOut}
            >
              {isSigningOut ? (
                <ActivityIndicator color={colors.background} />
              ) : (
                <Text style={styles.buttonText}>Sign out</Text>
              )}
            </Pressable>
          </View>
        ) : (
          <View style={styles.account}>
            <Text style={styles.label}>You are signed out</Text>
            <Pressable onPress={() => router.replace('/(auth)/sign-in')}>
              <Text style={styles.link}>Sign in</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing[5],
    gap: spacing[5],
  },
  title: {
    fontSize: 24,
    fontFamily: 'sans-bold',
    color: colors.primary,
  },
  account: {
    gap: spacing[3],
  },
  label: {
    fontSize: 14,
    fontFamily: 'sans-medium',
    color: colors.mutedForeground,
  },
  email: {
    fontSize: 16,
    fontFamily: 'sans-semibold',
    color: colors.primary,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[5],
    borderRadius: spacing[3],
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
