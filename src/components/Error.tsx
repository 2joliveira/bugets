import { colors, fontFamily } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export function Error({ error }: { error: string }) {
  return (
    <View style={styles.errorContainer}>
      <MaterialIcons
        name="error-outline"
        color={colors.danger.base}
        size={15}
      />
      <Text style={styles.errorMessage}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    position: "absolute",
    height: 15,
    bottom: -17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 3,
  },
  errorMessage: {
    bottom: 1,
    color: colors.danger.base,
    ...fontFamily.titleXs,
  },
});
