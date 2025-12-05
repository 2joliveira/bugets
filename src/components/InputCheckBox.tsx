import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { STATUS_OPTIONS } from "@/context/BudgetContext";
import { colors } from "@/theme";

interface InputCheckBoxProps {
  option: string;
  selectedOption: string | null;
  setOption: (option: string) => void;
  children: React.ReactNode;
}

export function InputCheckBox({
  option,
  selectedOption,
  setOption,
  children,
}: InputCheckBoxProps) {
  return (
    <TouchableOpacity
      style={styles.option}
      onPress={() => setOption(option)}
    >
      <View
        style={[
          styles.checkbox,
          selectedOption === option
            ? {
                backgroundColor: colors.purple.base,
                borderWidth: 0,
              }
            : {
                backgroundColor: colors.white,
                borderWidth: 1,
              },
        ]}
      >
        {selectedOption === option && (
          <MaterialIcons name="check" color={colors.white} size={16} />
        )}
      </View>

      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderColor: colors.gray[400],
    alignItems: "center",
    justifyContent: "center",
  },
});
