import { StackRoutesProps } from "@/routes/StackRoutes";
import { Button, Text, View } from "react-native";

export function Budget({ navigation }: StackRoutesProps<"budget">) {
  return (
    <View>
      <Text>Budget Screen</Text>

      <Button title="Home" onPress={() => navigation.goBack()} />
    </View>
  )
}