import { colors } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Input, { CurrencyInputProps } from 'react-native-currency-input'
import { Error } from "./Error";
import { useState } from "react";

type InputCurrencyProps = CurrencyInputProps & {
  icon?: keyof typeof MaterialIcons.glyphMap;
  error?: string;
};

export function InputCurrency({
  icon,
  placeholder,
  placeholderTextColor,
  style,
  error,
  ...props
}: InputCurrencyProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        style,
        isFocused && { borderColor: colors.purple.base },
        error && { borderColor: colors.danger.base },
      ]}
    >
      {icon && <MaterialIcons name={icon} size={20} color={colors.gray[500]} />}
      <Input
        placeholder={placeholder}
        placeholderTextColor={colors.gray[500]}
        style={{ width: icon ? "76%" : "100%" }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {error && <Error error={error} />}
    </View>
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
