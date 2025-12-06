import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { StackRoutesList } from "@/routes/StackRoutes";
import { useBudgets } from "@/context/BudgetContext";
import { colors, fontFamily } from "@/theme";
import { Button } from "@/components/Button";

export function MainHeader() {
  const { onSelectBudget } = useBudgets();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackRoutesList, "home">>();

  function handleNavigate() {
    onSelectBudget();
    
    navigation.navigate("budget");
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Orçamentos</Text>
        <Text style={styles.subtitle}>Você tem 1 item em rascunho</Text>
      </View>

      <Button
        variant="primary"
        icon="add"
        text="Novo"
        onPress={handleNavigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    ...fontFamily.titleLg,
    color: colors.purple.base,
  },
  subtitle: {
    ...fontFamily.textSm,
    color: colors.gray[500],
  },
});
