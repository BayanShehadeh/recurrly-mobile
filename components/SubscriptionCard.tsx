import { formatCurrency, formatDate } from "@/constants/lib/utils";
import { colors, spacing } from "@/constants/them";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
  paymentMethod,
  status,
  startDate,
  expanded,
  onPress,
  onCancelPress,
  isCancelling,
}: SubscriptionCardProps) => {
  const meta =
    category?.trim() ||
    plan?.trim() ||
    (renewalDate ? formatDate(renewalDate) : "");

  const details = [
    status ? { label: "Status", value: status } : null,
    plan ? { label: "Plan", value: plan } : null,
    category ? { label: "Category", value: category } : null,
    paymentMethod ? { label: "Payment", value: paymentMethod } : null,
    startDate
      ? { label: "Started", value: formatDate(startDate, "MMM D, YYYY") }
      : null,
    renewalDate
      ? { label: "Renewal", value: formatDate(renewalDate, "MMM D, YYYY") }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        expanded && styles.cardExpanded,
        color ? { backgroundColor: color } : null,
      ]}
    >
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

      {expanded && (
        <View style={styles.body}>
          <View style={styles.details}>
            {details.map((row) => (
              <View key={row.label} style={styles.row}>
                <View style={styles.rowCopy}>
                  <Text style={styles.label}>{row.label}</Text>
                  <Text style={styles.value} numberOfLines={1}>
                    {row.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {onCancelPress && (
            <Pressable
              onPress={onCancelPress}
              disabled={isCancelling}
              style={[styles.cancel, isCancelling && styles.cancelDisabled]}
            >
              <Text style={styles.cancelText}>
                {isCancelling ? "Cancelling..." : "Cancel Subscription"}
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </Pressable>
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
  cardExpanded: {
    backgroundColor: colors.subscription,
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
  body: {
    marginTop: spacing[6],
    gap: spacing[4],
  },
  details: {
    gap: spacing[6],
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[3],
  },
  rowCopy: {
    minWidth: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  label: {
    flexShrink: 0,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "sans-medium",
    color: colors.mutedForeground,
  },
  value: {
    flex: 1,
    fontFamily: "sans-bold",
    color: colors.primary,
  },
  cancel: {
    marginTop: spacing[2],
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: colors.primary,
    paddingVertical: spacing[4],
  },
  cancelDisabled: {
    backgroundColor: "rgba(8, 17, 38, 0.35)",
  },
  cancelText: {
    fontFamily: "sans-bold",
    color: colors.background,
  },
});
