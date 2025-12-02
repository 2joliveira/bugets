import { colors, fontFamily } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface DetailsProps {
  title: string;
  client: string;
  createdAt: Date;
  updatedAt: Date;
}

export function Details({ client, title, createdAt, updatedAt }: DetailsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="storefront"
            size={20}
            color={colors.purple.base}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.infoTitle}>Cliente</Text>
          <Text style={styles.infoContent}>{client}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%" }}>
            <Text style={styles.infoTitle}>Criado em</Text>
            <Text style={styles.infoContent}>
              {new Date(createdAt).toLocaleDateString("pt-BR")}
            </Text>
          </View>

          <View style={{ width: "50%" }}>
            <Text style={styles.infoTitle}>Atualizado em</Text>
            <Text style={styles.infoContent}>
              {new Date(updatedAt).toLocaleDateString("pt-BR")}
            </Text>
          </View>
        </View>
      </View>
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
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[200],
    borderBottomWidth: 1,
  },
  iconContainer: {
    height: 36,
    width: 36,
    backgroundColor: colors.purple.light,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    ...fontFamily.titleLg,
    color: colors.gray[700],
    width: "90%",
    flexWrap: "wrap",
  },
  content: {
    padding: 16,
    backgroundColor: colors.gray[100],
    gap: 8,
  },
  infoTitle: {
    ...fontFamily.textXs,
    color: colors.gray[600],
  },
  infoContent: {
    ...fontFamily.textSm,
    color: colors.gray[700],
  },
});
