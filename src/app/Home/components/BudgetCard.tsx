import { StyleSheet, Text, View } from "react-native";
import { colors, fontFamily } from "@/theme";
import { StatusTag } from "@/components/StatusTag";
import { formatPrice } from "@/utils/formatPrice";
import { BudgetType } from "@/domain/budget.schema";

export function BudgetCard({
  client,
  title,
  status,
  budgetPrice,
  descountValue,
}: BudgetType) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.status}>
        <StatusTag status={status} />
      </View>
      <View style={styles.infos}>
        <Text style={styles.subtitle}>{client}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.price}>
            {formatPrice(
              descountValue ? budgetPrice - descountValue : budgetPrice
            )}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 10,
    backgroundColor: colors.gray[100],
    justifyContent: "space-between",
    gap: 10,
  },
  title: {
    maxWidth: "65%",
    flexWrap: "wrap",
    color: colors.gray[700],
    ...fontFamily.titleMd,
  },
  subtitle: {
    color: colors.gray[600],
    ...fontFamily.textSm,
  },
  infos: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  status: {
    position: "absolute",
    right: 6,
    top: 6,
  },
  priceContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "flex-end",
  },
  currencySymbol: {
    ...fontFamily.textXs,
    justifyContent: "flex-end",
    color: colors.gray[700],
  },
  price: {
    ...fontFamily.titleMd,
    color: colors.gray[700],
  },
});
