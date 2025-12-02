import { ServiceType } from "@/app/Budget";
import { colors, fontFamily } from "@/theme";
import { formatPrice } from "@/utils/formatPrice";
import { StyleSheet, Text, View } from "react-native";

export function ServiceInfos({
  title,
  description,
  price,
  quantity,
}: ServiceType) {
  return (
    <View style={styles.container}>
      <View style={styles.descriptions}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{description}</Text>
      </View>

      <View style={{ justifyContent: "center", gap: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 5 }}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.price}>{formatPrice(price)}</Text>
        </View>

        <Text style={styles.quantity}>{`Qt: ${quantity}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  descriptions: {
    width: "60%",
    gap: 5,
  },
  title: {
    ...fontFamily.titleSm,
    color: colors.gray[700],
  },
  subtitle: {
    ...fontFamily.textXs,
    color: colors.gray[500],
  },
  currencySymbol: {
    ...fontFamily.textXs,
    color: colors.gray[700],
  },
  price: {
    ...fontFamily.titleMd,
    color: colors.gray[700],
  },
  quantity: {
    ...fontFamily.textXs,
    color: colors.gray[600],
    textAlign: "right",
  },
});
