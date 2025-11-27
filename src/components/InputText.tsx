import { colors, fontFamily } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Error } from "./Error";

type InputTextProps = TextInputProps & {
  icon?: keyof typeof MaterialIcons.glyphMap;
  error?: string;
};

export function InputText({
  icon,
  placeholder,
  placeholderTextColor,
  style,
  error,
  ...props
}: InputTextProps) {
  return (
    <>
      <View
        style={[
          styles.container,
          style,
          error && { borderColor: colors.danger.base },
        ]}
      >
        {icon && (
          <MaterialIcons name={icon} size={20} color={colors.gray[500]} />
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.gray[500]}
          style={{ width: icon ? "76%" : "100%" }}
          {...props}
        />

        {error && (
         <Error error={error} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
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
