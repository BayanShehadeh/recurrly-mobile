import { useClerk, useUser } from '@clerk/expo';
import images from '@/constants/images';
import { colors, spacing } from '@/constants/them';
import { Image } from 'expo-image';
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
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Sign-out failed:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const displayName =
    user?.firstName ||
    user?.fullName ||
    user?.emailAddresses[0]?.emailAddress ||
    'User';
  const email = user?.emailAddresses[0]?.emailAddress;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        {!isLoaded ? (
          <ActivityIndicator size="large" color={colors.accent} />
        ) : (
          <>
            <View style={styles.card}>
              <View style={styles.profileRow}>
                <Image
                  source={
                    user?.imageUrl ? { uri: user.imageUrl } : images.avatar
                  }
                  style={styles.avatar}
                  contentFit="cover"
                />
                <View style={styles.profileCopy}>
                  <Text style={styles.displayName}>{displayName}</Text>
                  {email ? <Text style={styles.email}>{email}</Text> : null}
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Account</Text>
              <View style={styles.accountRows}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Account ID</Text>
                  <Text
                    style={styles.rowValue}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {user?.id ? `${user.id.substring(0, 20)}...` : 'N/A'}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Joined</Text>
                  <Text style={styles.rowValue}>
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </Text>
                </View>
              </View>
            </View>

            <Pressable
              style={[
                styles.signOutButton,
                isSigningOut && styles.signOutButtonDisabled,
              ]}
              onPress={handleSignOut}
              disabled={isSigningOut}
            >
              {isSigningOut ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signOutText}>Sign Out</Text>
              )}
            </Pressable>
          </>
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
  },
  title: {
    marginBottom: spacing[6],
    fontSize: 30,
    fontFamily: 'sans-bold',
    color: colors.primary,
  },
  card: {
    marginBottom: spacing[5],
    borderRadius: spacing[6],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: spacing[5],
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  avatar: {
    width: spacing[16],
    height: spacing[16],
    borderRadius: spacing[16] / 2,
  },
  profileCopy: {
    flex: 1,
    gap: spacing[1],
  },
  displayName: {
    fontSize: 18,
    fontFamily: 'sans-bold',
    color: colors.primary,
  },
  email: {
    fontSize: 14,
    fontFamily: 'sans-medium',
    color: colors.mutedForeground,
  },
  sectionTitle: {
    marginBottom: spacing[3],
    fontSize: 16,
    fontFamily: 'sans-semibold',
    color: colors.primary,
  },
  accountRows: {
    gap: spacing[2],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[2],
    gap: spacing[3],
  },
  rowLabel: {
    fontSize: 14,
    fontFamily: 'sans-medium',
    color: colors.mutedForeground,
  },
  rowValue: {
    flexShrink: 1,
    fontSize: 14,
    fontFamily: 'sans-medium',
    color: colors.primary,
  },
  signOutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing[4],
    backgroundColor: colors.destructive,
    paddingVertical: spacing[4],
    minHeight: 52,
  },
  signOutButtonDisabled: {
    opacity: 0.7,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'sans-bold',
    color: '#fff',
  },
});
