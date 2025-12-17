import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, fontFamily } from "@/theme";
import { StatusType } from "@/types";

export function StatusTag({ status }: { status: StatusType }) {
  const status_info = {
    success: {
      text: "Aprovado",
      color: colors.success.dark,
      iconColor: colors.success.base,
      backgroundColor: colors.success.light,
    },
    recused: {
      text: "Recusado",
      color: colors.danger.dark,
      iconColor: colors.danger.base,
      backgroundColor: colors.danger.light,
    },
    draft: {
      text: "Rascunho",
      color: colors.gray[500],
      iconColor: colors.gray[400],
      backgroundColor: colors.gray[300],
    },
    sent: {
      text: "Enviado",
      color: colors.info.dark,
      iconColor: colors.info.base,
      backgroundColor: colors.info.light,
    },
  };

  return (
    <View style={[styles.container, status_info[status]]}>
      <MaterialIcons
        name="circle"
        size={10}
        color={status_info[status].iconColor}
      />

      <Text style={[styles.title, status_info[status]]}>
        {status_info[status].text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    borderRadius: 6,
  },
  title: {
    ...fontFamily.titleXs,
  },
});
