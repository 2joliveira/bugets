import { colors, fontFamily } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export function Total() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="storefront" size={20} color={colors.purple.base} />
      </View>

      <View style={{ flex: 1, padding: 5, gap: 8 }}>
        <View style={styles.line}>
          <Text style={styles.infoTitle}>Subtotal</Text>
          <Text
            style={[
              styles.price,
              { color: colors.gray[600], textDecorationLine: "line-through" },
            ]}
          >
            R$ 4.050,00
          </Text>
        </View>

        <View style={styles.line}>
          <View style={[styles.line, { gap: 8 }]}>
            <Text style={styles.infoTitle}>Desconto</Text>
            <Text style={styles.percentage}>5% off</Text>
          </View>
          <Text style={[styles.price, { color: colors.success.dark }]}>
            - R$ 200,00
          </Text>
        </View>

        <View
          style={[
            styles.line,
            {
              paddingTop: 16,
              borderTopWidth: 1,
              borderColor: colors.gray[200],
            },
          ]}
        >
          <Text style={styles.totalText}>Investimento total</Text>
          <View
            style={[
              styles.line,
              { alignItems: "baseline", gap: 5 },
            ]}
          >
            <Text style={styles.currencySymbol}>R$</Text>
            <Text style={styles.totalPrice}>3.847,50</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    gap: 16,
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 10,
  },
  iconContainer: {
    height: 36,
    width: 36,
    backgroundColor: colors.purple.light,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoTitle: {
    ...fontFamily.textSm,
    color: colors.gray[600],
  },
  price: {
    ...fontFamily.titleXs,
  },
  percentage: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: colors.success.light,
    textAlign: "center",
    borderRadius: 8,
    color: colors.success.dark,
  },
  totalText: {
    ...fontFamily.titleSm,
    color: colors.gray[700],
  },
  currencySymbol: {
    ...fontFamily.textXs,
    color: colors.gray[700],
  },
  totalPrice: {
    ...fontFamily.titleLg,
    color: colors.gray[700],
  },
});
