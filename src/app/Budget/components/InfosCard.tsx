import { colors, fontFamily } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface InfosCardProps {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  children: React.ReactNode;
}

export function InfosCard({ title, icon, children }: InfosCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name={icon} color={colors.purple.base} size={20} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 10,
  },
  header: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    borderBottomWidth: 1,
    borderColor: colors.gray[200],
  },
  title: {
    ...fontFamily.textXs,
    color: colors.gray[500],
  },
});
