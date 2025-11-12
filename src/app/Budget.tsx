import { StackRoutesProps } from "@/routes/StackRoutes";
import { colors } from "@/theme";
import { Button, StyleSheet, Text, View } from "react-native";

export function Budget({ navigation }: StackRoutesProps<"budget">) {
  return (
    <View style={styles.container}>
      <Text>Budget Screen</Text>

      <Button title="Home" onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[300],
  },
});