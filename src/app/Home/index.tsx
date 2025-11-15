import { Button, StyleSheet, Text, View } from "react-native";
import { StackRoutesProps } from "@/routes/StackRoutes";
import { MainHeader } from "@/components";
import { colors, fontFamily } from "@/theme";
import { BudgetCard } from "./components";

export function Home(props: StackRoutesProps<"home">) {
  return (
    <View style={styles.container}>
      <MainHeader />

      <View style={styles.budgetslist}>
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.white,
  },
  budgetslist: {
    padding: 20,
    gap: 12,
  },
});
