import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { OrderOptionValue } from "@/app/Home/components/FilterModal";

interface InputCheckBoxProps {
  option: string;
  selectedOption: string | null;
  setOption: (option: string) => void;
  children: React.ReactNode;
}

export function InputRadio({
  option,
  selectedOption,
  setOption,
  children,
}: InputCheckBoxProps) {
  return (
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
  );
}

const styles = StyleSheet.create({
  radio: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderColor: colors.gray[400],
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },
});
