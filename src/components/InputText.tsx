import { colors } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

type InputTextProps = TextInputProps & {
  icon?: keyof typeof MaterialIcons.glyphMap;
};

export function InputText({
  icon,
  placeholder,
  placeholderTextColor,
  ...props
}: InputTextProps) {
  return (
    <View style={styles.container}>
      {icon && <MaterialIcons name={icon} size={20} color={colors.gray[500]} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.gray[500]}
        style={{ width: icon ? "76%" : "100%" }}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
    paddingHorizontal: 15,
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
});
