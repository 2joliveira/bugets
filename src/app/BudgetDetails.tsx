import { StackRoutesProps } from "@/routes/StackRoutes";
import { Button, Text, View } from "react-native";

export function BudgetDetails({
  navigation,
  route,
}: StackRoutesProps<"budgetDetails">) {
  return (
    <View>
      <Text>Budget Details Screen {route.params.id}</Text>

      <Button title="Home" onPress={() => navigation.goBack()} />
    </View>
  );
}
