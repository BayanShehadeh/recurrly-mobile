import { HOME_BALANCE, HOME_USER } from "@/constants/data";
import { icons } from "@/constants/icon";
import images from "@/constants/images";
import { colors, spacing } from "@/constants/them";
import dayjs from "dayjs";
import { Image as ExpoImage } from "expo-image";
import { styled } from "nativewind";
import { StyleSheet, Text, View } from "react-native";
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

const balance = {
  amount: HOME_BALANCE.amount,
  nextRenewalDate: dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD"),
};

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="p-5">
        <View style={styles.header}>
          <View style={styles.user}>
            <Image source={user.avatar} style={styles.avatar} />
            <Text style={styles.userName}>{user.name}</Text>
          </View>

          <View style={styles.addButton}>
            <Image
              source={icons.plus}
              style={styles.addIcon}
              contentFit="contain"
            />
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Balance</Text>

          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>
              ${balance.amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
            <Text style={styles.balanceDate}>{balance.nextRenewalDate}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing[2] + 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  avatar: {
    width: spacing[16],
    height: spacing[16],
    borderRadius: spacing[16] / 2,
    overflow: "hidden",
  },
  userName: {
    marginLeft: spacing[4],
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "sans-bold",
    color: colors.primary,
    flexShrink: 1,
  },
  addButton: {
    width: spacing[12],
    height: spacing[12],
    borderRadius: spacing[12] / 2,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: {
    width: spacing[6],
    height: spacing[6],
  },
  balanceCard: {
    marginVertical: spacing[2] + 2,
    minHeight: 200,
    justifyContent: "space-between",
    gap: spacing[5],
    backgroundColor: colors.accent,
    padding: spacing[6],
    borderTopLeftRadius: 0,
    borderTopRightRadius: spacing[8],
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: spacing[8],
  },
  balanceLabel: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: "sans-semibold",
    color: "rgba(255,255,255,0.8)",
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  balanceAmount: {
    fontSize: 36,
    lineHeight: 44,
    fontFamily: "sans-extrabold",
    color: "#ffffff",
  },
  balanceDate: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: "sans-medium",
    color: "#ffffff",
  },
});
