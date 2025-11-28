import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, InputText } from "@/components";
import { StackRoutesList } from "@/routes/StackRoutes";
import { useBudgets } from "@/hooks/useBudgets";
import { colors } from "@/theme";
import { BudgetCard, FilterModal, MainHeader } from "./components";

export const STATUS_OPTIONS = ["draft", "sent", "success", "recused"] as const;

export function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<StackRoutesList, "home">>();

  function handleNavigate() {
    navigation.navigate("budgetDetails", { id: "123" });
  }

  const { loading, budgets } = useBudgets();

  return (
    <View style={styles.container}>
      <MainHeader />

      <View style={styles.filters}>
        <InputText icon="search" placeholder="Título ou Cliente" />
        <Button
          variant="secondary"
          icon="tune"
          onPress={() => setIsOpenModal(true)}
        />
      </View>

      <ScrollView>
        <View style={styles.budgetslist}>
          {budgets &&
            budgets.length > 0 &&
            budgets.map(() => (
              <TouchableOpacity onPress={handleNavigate}>
                <BudgetCard status="success" />
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>

      {isOpenModal && (
        <FilterModal
          visible={isOpenModal}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.white,
  },
  filters: {
    margin: 16,
    flexDirection: "row",
    gap: 8,
  },
  budgetslist: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: 10,
    gap: 12,
  },
});
