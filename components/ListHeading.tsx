import { colors, spacing } from "@/constants/them";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ListHeading = ({ title }: ListHeadingProps) => {
  return (
    <View style={styles.head}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.action}>
        <Text style={styles.actionText}>View all</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListHeading;

const styles = StyleSheet.create({
  head: {
    marginVertical: spacing[4],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: "sans-bold",
    color: colors.primary,
  },
  action: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
  },
  actionText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "sans-semibold",
    color: colors.primary,
  },
});
