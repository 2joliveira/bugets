import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusTag } from "./StatusTag";
import { colors } from "@/theme";
import { STATUS_OPTIONS } from "@/app";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

interface InputCheckBoxProps {
  options: readonly (typeof STATUS_OPTIONS)[number][];
  selectedOption: (typeof STATUS_OPTIONS)[number] | null;
  setOption: (option: (typeof STATUS_OPTIONS)[number]) => void;
}

export function InputCheckBox({
  options,
  selectedOption,
  setOption,
}: InputCheckBoxProps) {
  const { name } = useRoute();
  return (
    <View
      style={[
        styles.container,
        name === "budget" && {
          height: 80,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
        },
      ]}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option}
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
          <StatusTag status={option} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
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
