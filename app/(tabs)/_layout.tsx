import { tabs } from '@/constants/data';
import clsx from 'clsx';
import { Image as ExpoImage } from 'expo-image';
import { Tabs } from 'expo-router';
import { styled } from 'nativewind';
import { View } from 'react-native';

const Image = styled(ExpoImage);

export default function TabsLayout() {
  const TabIcon = ({ focused, icon }: TabIconProps) => (
    <View className="tabs-icon">
      <View className={clsx('tabs-pill', focused && 'tabs-active')}>
        <Image source={icon} className="tabs-glyph" contentFit="contain" />
      </View>
    </View>
  );

  return (
    <Tabs screenOptions={{ headerShown: false }}>
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
