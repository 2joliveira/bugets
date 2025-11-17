import { colors, fontFamily } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
  icon?: keyof typeof MaterialIcons.glyphMap;
  text?: string;
  variant: "primary" | "secondary" | "destructive";
};

export function Button({ icon, text, variant, ...props }: ButtonProps) {
  const variants = {
    primary: { ...styles.primary },
    secondary: { ...styles.secondary },
    destructive: {},
  };

  const variantsText = {
    primary: { ...styles.primaryText },
    secondary: { ...styles.secondaryText },
    destructive: {},
  };

  const iconColor = {
    primary: colors.white,
    secondary: colors.purple.base,
    destructive: colors.danger.base,
  };

  return (
    <TouchableOpacity
      {...props}
      style={{ ...styles.container, ...variants[variant] }}
    >
      {icon && (
        <MaterialIcons name={icon} size={24} color={iconColor[variant]} />
      )}
      {text && (
        <Text style={{ ...styles.text, ...variantsText[variant] }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  text: {
    ...fontFamily.titleSm,
    paddingRight: 5,
  },
  primary: {
    backgroundColor: colors.purple.base,
  },
  secondary: {
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.purple.base,
  },
});
