import { NavigationContainer } from "@react-navigation/native";
import { BudgetProvider, useBudgets } from "@/context/BudgetContext";
import { StackRoutes } from "./StackRoutes";

export function Routes() {
  const { selectedBudget } = useBudgets();
  return (
    <BudgetProvider>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </BudgetProvider>
  );
}
