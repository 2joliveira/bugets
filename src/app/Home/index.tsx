import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, InputText } from "@/components";
import { colors } from "@/theme";
import { BudgetCard, FilterModal, MainHeader } from "./components";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackRoutesList } from "@/routes/StackRoutes";

export const STATUS_OPTIONS = ["draft", "sent", "success", "recused"] as const;

export function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<StackRoutesList, "home">>();

  function handleNavigate() {
    navigation.navigate("budgetDetails", { id: "123" });
  }

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

      <View style={styles.budgetslist}>
        <TouchableOpacity onPress={handleNavigate}>
          <BudgetCard status="success" />
        </TouchableOpacity>
        <BudgetCard status="recused" />
        <BudgetCard status="sent" />
        <BudgetCard status="draft" />
        <BudgetCard status="success" />
      </View>

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
    marginTop: 10,
    gap: 12,
  },
});
