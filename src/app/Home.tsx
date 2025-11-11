import { StackRoutesProps } from "@/routes/StackRoutes";
import { Button, Text, View } from "react-native";

export function Home({ navigation }: StackRoutesProps<"home">) {
  return (
    <View>
      <Text>Home Screen</Text>

      <Button title="Budget" onPress={() => navigation.navigate("budget")} />

      <Button
        title="Budget"
        onPress={() => navigation.navigate("budgetDetails", { id: "123" })}
      />
    </View>
  );
}
