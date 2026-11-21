import "@/global.css";

import { styled } from "nativewind";
import { Text, View } from "react-native";
import { SafeAreaView as RNSSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSSafeAreaView);

export default function App() {
    return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-5">
        <Text className="text-7xl font-sans-extrabold text-primary">Home</Text>

        
       
      </View>
    </SafeAreaView>
  );
}
