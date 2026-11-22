import ListHeading from "@/components/ListHeading";
import SubscriptionCard from "@/components/SubscriptionCard";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  HOME_USER,
  UPCOMING_SUBSCRIPTIONS,
} from "@/constants/data";
import { icons } from "@/constants/icon";
import images from "@/constants/images";
import { formatCurrency, formatDate } from "@/constants/lib/utils";
import { colors, spacing } from "@/constants/them";
import { Image as ExpoImage } from "expo-image";
import { styled } from "nativewind";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
  amount: formatCurrency(HOME_BALANCE.amount),
  nextRenewalDate: formatDate(HOME_BALANCE.nextRenewalDate),
};

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="p-5">
        <View style={styles.header}>
          <View style={styles.user}>
            <Image source={user.avatar} style={styles.avatar} />
            <Text
              style={styles.userName}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              {user.name}
            </Text>
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
            <Text style={styles.balanceAmount}>{balance.amount}</Text>
            <Text style={styles.balanceDate}>{balance.nextRenewalDate}</Text>
          </View>
        </View>



        <View>
          <ListHeading title="Upcoming" />
          <FlatList
            data={UPCOMING_SUBSCRIPTIONS}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <UpcomingSubscriptionCard data={item} />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyState}>
                No upcoming renewals yet.
              </Text>
            }
          />
        </View>



        <View>
          <ListHeading title="All Subscriptions" />
          <FlatList
            data={HOME_SUBSCRIPTIONS}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <SubscriptionCard
                name={item.name}
                price={item.price}
                currency={item.currency}
                icon={item.icon}
                billing={item.billing}
                color={item.color}
                category={item.category}
                plan={item.plan}
                renewalDate={item.renewalDate}
                expanded={false}
                onPress={() => {}}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyState}>
                No subscriptions yet.
              </Text>
            }
          />
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
    gap: spacing[3],
  },
  user: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },
  avatar: {
    width: spacing[16],
    height: spacing[16],
    borderRadius: spacing[16] / 2,
    overflow: "hidden",
  },
  userName: {
    flex: 1,
    marginLeft: spacing[3],
    marginRight: spacing[2],
    fontSize: 20,
    lineHeight: 26,
    fontFamily: "sans-bold",
    color: colors.primary,
  },
  addButton: {
    width: spacing[12],
    height: spacing[12],
    borderRadius: spacing[12] / 2,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
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
  emptyState: {
    paddingVertical: spacing[4],
    fontSize: 14,
    fontFamily: "sans-medium",
    color: "rgba(0,0,0,0.6)",
  },
});
