import { formatCurrency } from "@/constants/lib/utils";
import { colors, spacing } from "@/constants/them";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const UpcomingSubscriptionCard = ({
  data: { name, price, daysLeft, icon },
}: UpcomingSubscriptionCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={icon} style={styles.icon} contentFit="contain" />
        <View style={styles.copy}>
          <Text style={styles.price}>{formatCurrency(price)}</Text>
          <Text style={styles.meta}>
            {daysLeft > 1 ? `${daysLeft} days left` : "Last day"}
          </Text>
        </View>
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

export default UpcomingSubscriptionCard;

const styles = StyleSheet.create({
  card: {
    marginRight: spacing[3],
    width: 148,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    padding: spacing[3],
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  icon: {
    width: 40,
    height: 40,
  },
  copy: {
    flexShrink: 1,
  },
  price: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: "sans-bold",
    color: colors.primary,
  },
  meta: {
    marginTop: 1,
    fontSize: 11,
    lineHeight: 14,
    fontFamily: "sans-semibold",
    color: colors.mutedForeground,
  },
  name: {
    marginTop: spacing[2],
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "sans-bold",
    color: colors.primary,
  },
});
