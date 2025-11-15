import { colors, fontFamily } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export function StatusTag() {
  return (
    <View style={styles.container}>
      <MaterialIcons name="circle" size={10} color={colors.success.base} />

      <Text style={styles.title}>Aprovado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    backgroundColor: colors.success.light,
    borderRadius: 6,
  },
  title: {
    ...fontFamily.titleXs,
    color: colors.success.dark,
  },
});
