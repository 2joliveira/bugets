import { colors, fontFamily } from "@/theme";
import { Button, StyleSheet, Text, View } from "react-native";

export function MainHeader() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Orçamentos</Text>
        <Text style={styles.subtitle}>Você tem 1 item em rascunho</Text>
      </View>

      <Button title="Novo" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  title: {
    ...fontFamily.titleLg,
    color: colors.purple.base,
  },
  subtitle: {
    ...fontFamily.textSm,
    color: colors.gray[500],
  },
});
