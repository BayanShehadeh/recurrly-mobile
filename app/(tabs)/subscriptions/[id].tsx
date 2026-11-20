import { useLocalSearchParams } from 'expo-router';
import { styled } from 'nativewind';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView as RNSSafeAreaView } from 'react-native-safe-area-context';

const SafeAreaView = styled(RNSSafeAreaView);

const SubscriptionDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-5">
        <Text>Subscription Details</Text>
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionDetails;
