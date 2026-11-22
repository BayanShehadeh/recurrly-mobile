import { formatCurrency } from "@/constants/lib/utils";
import { colors, spacing } from "@/constants/them";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const UpcomingSubscriptionCard = ({
  data: { price, daysLeft, icon },
}: UpcomingSubscriptionCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={icon}
          style={styles.icon}
          contentFit="contain"
        />
        <View style={styles.copy}>
          <Text style={styles.price}>{formatCurrency(price)}</Text>
          <Text style={styles.meta}>{daysLeft} days left</Text>
        </View>
      </View>
    </View>
  );
};

export default UpcomingSubscriptionCard;

const styles = StyleSheet.create({
  card: {
    marginRight: spacing[4],
    width: 176,
    borderRadius: spacing[4],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    padding: spacing[4],
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  icon: {
    width: spacing[14],
    height: spacing[14],
  },
  copy: {
    flexShrink: 1,
  },
  price: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "sans-bold",
    color: colors.primary,
  },
  meta: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "sans-semibold",
    color: colors.mutedForeground,
  },
});
