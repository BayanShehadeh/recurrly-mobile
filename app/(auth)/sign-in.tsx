import { colors, spacing } from '@/constants/them';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign in</Text>
        <Link href="/(auth)/sign-up" style={styles.link}>
          Create an account
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
  content: {
    flex: 1,
    padding: spacing[5],
    gap: spacing[3],
  },
  title: {
    fontSize: 24,
    fontFamily: 'sans-bold',
    color: colors.primary,
  },
  link: {
    fontSize: 16,
    fontFamily: 'sans-semibold',
    color: colors.accent,
  },
});
