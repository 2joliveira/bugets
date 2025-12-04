import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, fontFamily } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { useBudgets } from "@/context/BudgetContext";
import { StatusTag } from "./StatusTag";

interface HeaderProps {
  params?: {
    id?: string;
  };
}

export function Header({ params }: HeaderProps) {
  const navigation = useNavigation();
  const { selectedBudget } = useBudgets();

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={20}
            color={colors.gray[600]}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Orçamento</Text>
        {params && params.id && (
          <Text
            style={[styles.headerTitle, styles.budgteId]}
            numberOfLines={1}
          >{`# ${params.id}`}</Text>
        )}
      </View>

      {selectedBudget && <StatusTag status={selectedBudget.status} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
    backgroundColor: colors.white,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  headerTitle: {
    ...fontFamily.titleSm,
    color: colors.gray[700],
  },
  budgteId: {
    width: 80,
  },
});
