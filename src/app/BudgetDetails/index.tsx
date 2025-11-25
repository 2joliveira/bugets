import { StyleSheet, View } from "react-native";
import { colors } from "@/theme";
import { Details } from "./components";

export function BudgetDetails() {
  return (
    <View style={styles.container}>
      <Details />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: colors.gray[300],
    backgroundColor: colors.white,
    padding: 20,
  },
});
