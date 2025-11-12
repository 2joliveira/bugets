import { StackRoutesProps } from "@/routes/StackRoutes";
import { fontFamily } from "@/theme";
import { Button, StyleSheet, Text, View } from "react-native";

export function Home({ navigation }: StackRoutesProps<"home">) {
  return (
    <View>
      <Text style={styles.title}>Home Screen</Text>

      <Button title="Budget" onPress={() => navigation.navigate("budget")} />

      <Button
        title="Budget"
        onPress={() => navigation.navigate("budgetDetails", { id: "123" })}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  title: fontFamily.titleLg
})