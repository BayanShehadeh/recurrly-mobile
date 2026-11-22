import { formatCurrency, formatDate, formatStatusLabel } from "@/lib/utils";
import clsx from "clsx";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

const DETAIL_DATE_FORMAT = "MMM D, YYYY";

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
    { label: "Payment", value: paymentMethod?.trim() },
    { label: "Category", value: category?.trim() || plan?.trim() },
    {
      label: "Started",
      value: startDate ? formatDate(startDate, DETAIL_DATE_FORMAT) : undefined,
    },
    {
      label: "Renewal date",
      value: renewalDate
        ? formatDate(renewalDate, DETAIL_DATE_FORMAT)
        : undefined,
    },
    {
      label: "Status",
      value: status ? formatStatusLabel(status) : undefined,
    },
  ].map((row) => ({
    ...row,
    value: row.value || "Not provided",
  }));

  return (
    <Pressable
      onPress={onPress}
      className={clsx("sub-card", expanded ? "sub-card-expanded" : "bg-card")}
      style={!expanded && color ? { backgroundColor: color } : undefined}
    >
      <View className="sub-head">
        <View className="sub-main">
          <Image source={icon} className="sub-icon" contentFit="cover" />
          <View className="sub-copy">
            <Text numberOfLines={1} className="sub-title">
              {name}
            </Text>
            {!!meta && (
              <Text numberOfLines={1} ellipsizeMode="tail" className="sub-meta">
                {meta}
              </Text>
            )}
          </View>
        </View>

        <View className="sub-price-box">
          <Text className="sub-price">{formatCurrency(price, currency)}</Text>
          <Text className="sub-billing">{billing}</Text>
        </View>
      </View>

      {expanded && (
        <View className="sub-body">
          <View className="sub-details">
            {details.map((row) => (
              <View key={row.label} className="sub-row">
                <View className="sub-row-copy">
                  <Text className="sub-label">{row.label}:</Text>
                  <Text
                    className="sub-value"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
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
              className={clsx(
                "sub-cancel",
                isCancelling && "sub-cancel-disabled",
              )}
            >
              <Text className="sub-cancel-text">
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
