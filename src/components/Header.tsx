import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, fontFamily } from "@/theme";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  budgetId?: string;
}

export function Header({ budgetId }: HeaderProps) {
  const navigation = useNavigation();

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
        {budgetId && <Text style={styles.headerTitle}>{`# ${budgetId}`}</Text>}
      </View>

      <View>
        <Text>status</Text>
      </View>
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
});
