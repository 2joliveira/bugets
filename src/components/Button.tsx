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

export function Button({ icon, text, variant }: ButtonProps) {
  const variants = {
    primary: { ...styles.primary },
    secondary: {},
    destructive: {},
  };

  const variantsText = {
    primary: { ...styles.primaryText },
    secondary: {},
    destructive: {},
  };

  return (
    <TouchableOpacity style={{ ...styles.container, ...variants[variant] }}>
      {icon && <MaterialIcons name={icon} size={24} color={colors.white} />}
      {text && (
        <Text style={{ ...styles.text, ...variantsText[variant] }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    display: "flex",
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
  primaryText: {
    color: colors.white,
  },
});
