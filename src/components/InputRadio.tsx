import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fontFamily } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ORDER_OPTIONS,
  OrderOptionValue,
} from "@/app/Home/components/FilterModal";

interface InputCheckBoxProps {
  options: typeof ORDER_OPTIONS;
  selectedOption: OrderOptionValue | null;
  setOption: (option: OrderOptionValue) => void;
}

export function InputRadio({
  options,
  selectedOption,
  setOption,
}: InputCheckBoxProps) {
  return (
    <View style={styles.container}>
      {Object.entries(options).map(([key, value]) => (
        <TouchableOpacity
          key={key}
          style={styles.option}
          onPress={() => setOption(value)}
        >
          <View
            style={[
              styles.radio,
              selectedOption === value
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
            {selectedOption === value && (
              <MaterialIcons name="circle" color={colors.white} size={10} />
            )}
          </View>
          <Text style={styles.text}>{value}</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderColor: colors.gray[400],
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...fontFamily.textMd,
    color: colors.gray[600],
  }
});
