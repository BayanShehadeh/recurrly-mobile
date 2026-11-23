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
import { colors, spacing } from "@/constants/them";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Later: replace with user data from the database
const user = {
  avatar: images.avatar,
  name: HOME_USER.name,
};

const balance = {
  amount: formatCurrency(HOME_BALANCE.amount),
  nextRenewalDate: formatDate(HOME_BALANCE.nextRenewalDate),
};

export default function HomeScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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

          <Pressable style={styles.addButton} accessibilityRole="button">
            <Image
              source={icons.plus}
              style={styles.addIcon}
              contentFit="contain"
            />
          </Pressable>
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.upcomingRow}
          >
            {UPCOMING_SUBSCRIPTIONS.length === 0 ? (
              <Text style={styles.emptyState}>No upcoming renewals yet.</Text>
            ) : (
              UPCOMING_SUBSCRIPTIONS.map((item) => (
                <UpcomingSubscriptionCard key={item.id} data={item} />
              ))
            )}
          </ScrollView>
        </View>

        <View style={styles.subscriptionsSection}>
          <ListHeading title="All Subscriptions" />
          {HOME_SUBSCRIPTIONS.length === 0 ? (
            <Text style={styles.emptyState}>No subscriptions yet.</Text>
          ) : (
            HOME_SUBSCRIPTIONS.map((item) => (
              <View key={item.id} style={styles.subscriptionItem}>
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
                  paymentMethod={item.paymentMethod}
                  status={item.status}
                  startDate={item.startDate}
                  expanded={expandedId === item.id}
                  onPress={() =>
                    setExpandedId((current) =>
                      current === item.id ? null : item.id,
                    )
                  }
                  onCancelPress={() => {}}
                />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[30],
  },
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
  upcomingRow: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  subscriptionsSection: {
    paddingBottom: spacing[4],
  },
  subscriptionItem: {
    marginBottom: spacing[3],
  },
  emptyState: {
    paddingVertical: spacing[4],
    fontSize: 14,
    fontFamily: "sans-medium",
    color: "rgba(0,0,0,0.6)",
  },
});
