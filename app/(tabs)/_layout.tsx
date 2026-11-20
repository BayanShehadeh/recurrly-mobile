import { tabs } from '@/constants/data';
import { colors, components } from '@/constants/them';
import clsx from 'clsx';
import { Image as ExpoImage } from 'expo-image';
import { Tabs } from 'expo-router';
import { styled } from 'nativewind';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabBar = components.tabBar;
const Image = styled(ExpoImage);

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  const TabIcon = ({ focused, icon }: TabIconProps) => (
    <View
      className="tabs-icon"
      style={{
        width: tabBar.iconFrame,
        height: tabBar.iconFrame,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        className={clsx('tabs-pill', focused && 'tabs-active')}
        style={{
          width: tabBar.iconFrame,
          height: tabBar.iconFrame,
          borderRadius: tabBar.iconFrame / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: focused ? colors.accent : 'transparent',
        }}
      >
        <Image
          source={icon}
          className="tabs-glyph"
          contentFit="contain"
          style={{
            width: tabBar.iconFrame / 2,
            height: tabBar.iconFrame / 2,
          }}
        />
      </View>
    </View>
  );

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
          paddingVertical: tabBar.height/2-tabBar.iconFrame/1.6,
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
