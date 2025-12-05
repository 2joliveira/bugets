import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { OrderOptionValue } from "@/app/Home/components/FilterModal";

interface InputCheckBoxProps {
  option: string;
  selectedOption: OrderOptionValue | null;
  setOption: (option: OrderOptionValue) => void;
  children: React.ReactNode;
}

export function InputRadio({
  option,
  selectedOption,
  setOption,
  children,
}: InputCheckBoxProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={() => setOption(option)}>
        <View
          style={[
            styles.radio,
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
            <MaterialIcons name="circle" color={colors.white} size={10} />
          )}
        </View>

        {children}
      </TouchableOpacity>
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
});
