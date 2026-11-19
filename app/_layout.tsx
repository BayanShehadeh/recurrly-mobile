import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="onboarding" options={{ title: 'Onboarding' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
