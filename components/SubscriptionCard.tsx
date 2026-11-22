import { formatCurrency, formatDate } from "@/constants/lib/utils";
import { colors, spacing } from "@/constants/them";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const SubscriptionCard = ({
  name,
  price,
  currency,
  icon,
  billing,
  color,
  category,
  plan,
  renewalDate,
}: SubscriptionCardProps) => {
  const meta =
    category?.trim() ||
    plan?.trim() ||
    (renewalDate ? formatDate(renewalDate) : "");

  return (
    <View style={[styles.card, color ? { backgroundColor: color } : null]}>
      <View style={styles.head}>
        <View style={styles.main}>
          <Image source={icon} style={styles.icon} contentFit="cover" />
          <View style={styles.copy}>
            <Text numberOfLines={1} style={styles.title}>
              {name}
            </Text>
            {!!meta && (
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.meta}>
                {meta}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.priceBox}>
          <Text style={styles.price}>{formatCurrency(price, currency)}</Text>
          <Text style={styles.billing}>{billing}</Text>
        </View>
      </View>
    </View>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing[3],
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: spacing[4],
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing[2],
  },
  main: {
    minWidth: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  icon: {
    width: spacing[16],
    height: spacing[16],
    borderRadius: 8,
    overflow: "hidden",
  },
  copy: {
    minWidth: 0,
    flex: 1,
  },
  title: {
    marginBottom: spacing[1],
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "sans-bold",
    color: colors.primary,
  },
  meta: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "sans-semibold",
    color: colors.mutedForeground,
  },
  priceBox: {
    marginLeft: spacing[3],
    flexShrink: 0,
    alignItems: "flex-end",
  },
  price: {
    marginBottom: spacing[1],
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "sans-bold",
    color: colors.primary,
  },
  billing: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "sans-medium",
    color: colors.mutedForeground,
  },
});
