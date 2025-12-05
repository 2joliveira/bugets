import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/theme";

interface InputCheckBoxProps<T extends string> {
  option: T;
  selectedOption: T[] | null;
  setOption: (option: T) => void;
  children: React.ReactNode;
}

export function InputCheckBox<T extends string>({
  option,
  selectedOption,
  setOption,
  children,
}: InputCheckBoxProps<T>) {
  return (
    <TouchableOpacity style={styles.option} onPress={() => setOption(option)}>
      <View
        style={[
          styles.checkbox,
          selectedOption?.includes(option)
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
        {selectedOption?.includes(option) && (
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
