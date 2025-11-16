import { StyleSheet, View } from "react-native";
import { StackRoutesProps } from "@/routes/StackRoutes";
import { Button, InputText, MainHeader } from "@/components";
import { colors } from "@/theme";
import { BudgetCard } from "./components";

export function Home(props: StackRoutesProps<"home">) {
  return (
    <View style={styles.container}>
      <MainHeader />

      <View style={styles.filters}>
        <InputText icon="search" placeholder="Título ou Cliente" />
        <Button variant="secondary" icon="tune" />
      </View>

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
  filters: {
    margin: 16,
    flexDirection: "row",
    gap: 8,
  },
  budgetslist: {
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 12,
  },
});
