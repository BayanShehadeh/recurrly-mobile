import { colors, spacing } from '@/constants/them';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SubscriptionDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Text style={styles.title}>Subscription Details</Text>
        {!!id && <Text style={styles.meta}>ID: {String(id)}</Text>}
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
    gap: spacing[2],
  },
  title: {
    fontSize: 24,
    fontFamily: 'sans-bold',
    color: colors.primary,
  },
  meta: {
    fontSize: 14,
    fontFamily: 'sans-medium',
    color: colors.mutedForeground,
  },
});
