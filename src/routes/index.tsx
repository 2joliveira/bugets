import { NavigationContainer } from "@react-navigation/native";
import { BudgetProvider } from "@/context/BudgetContext";
import { StackRoutes } from "./StackRoutes";

export function Routes() {
  return (
    <BudgetProvider>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </BudgetProvider>
  );
}
