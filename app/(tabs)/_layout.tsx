import { useAuth } from '@clerk/expo';
import { tabs } from '@/constants/data';
import { colors, components } from '@/constants/them';
import { Image } from 'expo-image';
import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabBar = components.tabBar;

function TabIcon({ focused, icon }: TabIconProps) {
  return (
    <View style={styles.iconFrame}>
      <View
        style={[
          styles.pill,
          focused && { backgroundColor: colors.accent },
        ]}
      >
        <Image source={icon} style={styles.glyph} contentFit="contain" />
      </View>
    </View>
  );
}

export default function TabsLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const insets = useSafeAreaInsets();

  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height: tabBar.height,
          marginHorizontal: tabBar.horizontalInset,
          borderRadius: tabBar.radius,
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarItemStyle: {
          paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
        },
        tabBarIconStyle: {
          width: tabBar.iconFrame,
          height: tabBar.iconFrame,
          alignSelf: 'center',
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  iconFrame: {
    width: tabBar.iconFrame,
    height: tabBar.iconFrame,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    width: tabBar.iconFrame,
    height: tabBar.iconFrame,
    borderRadius: tabBar.iconFrame / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  glyph: {
    width: tabBar.iconFrame / 2,
    height: tabBar.iconFrame / 2,
  },
});
