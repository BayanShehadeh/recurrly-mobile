import { HOME_USER } from "@/constants/data";
import images from "@/constants/images";
import { Image as ExpoImage } from "expo-image";
import { styled } from "nativewind";
import { Text, View } from "react-native";
import { SafeAreaView as RNSSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSSafeAreaView);
const Image = styled(ExpoImage, {
  className: {
    target: "style",
    nativeStyleMapping: {
      width: true,
      height: true,
    },
  },
});

// Later: replace with user data from the database
const user = {
  avatar: images.avatar,
  name: HOME_USER.name,
};

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="p-5">
        <View
          className="home-header"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View
            className="home-user"
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Image source={user.avatar} className="home-avatar" />
            <Text className="home-user-name">{user.name}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
