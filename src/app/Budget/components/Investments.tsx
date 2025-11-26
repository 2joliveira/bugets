import { colors, fontFamily } from "@/theme";
import { Controller, ControllerProps } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InvestimentsProps {
  control: ControllerProps["control"];
}

export function Investments({ control }: InvestimentsProps) {
  return (
    <View style={{ gap: 12, marginTop: 20 }}>
      <View style={[styles.infosContainer, { paddingHorizontal: 20 }]}>
        <Text style={styles.text}>Subtotal</Text>

        <View style={styles.subtotalValuesContainer}>
          <Text style={styles.quantity}>8 itens</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currencySymbol}>R$</Text>
            <Text style={styles.priceValue}>3.847,5</Text>
          </View>
        </View>
      </View>

      <View style={[styles.infosContainer, { paddingHorizontal: 20 }]}>
        <View
          style={[
            styles.infosContainer,
            { gap: 8, alignItems: "center", justifyContent: "space-around" },
          ]}
        >
          <Text style={styles.text}>Desconto</Text>

          <Controller
            control={control}
            name="percentageDiscount"
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={styles.percentageInput}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Text style={styles.percentage}>%</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={[styles.currencySymbol, { color: colors.danger.base }]}>
            - R$
          </Text>
          <Text style={[styles.priceValue, { color: colors.danger.base }]}>
            200,00
          </Text>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Valor total</Text>

        <View>
          <Text style={styles.totalPrice}>R$ 4.050,00</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.currencySymbol}>R$</Text>
            <Text style={styles.totalDiscount}>3.847,50</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    ...fontFamily.textSm,
    color: colors.gray[700],
  },
  infosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtotalValuesContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  priceContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    ...fontFamily.textXs,
    color: colors.gray[600],
  },
  currencySymbol: {
    ...fontFamily.textXs,
    color: colors.gray[700],
  },
  priceValue: {
    ...fontFamily.textSm,
    color: colors.gray[700],
  },
  percentageInput: {
    height: 40,
    width: 75,
    paddingHorizontal: 15,
    flexDirection: "row",
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.gray[300],
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  percentage: {
    ...fontFamily.textMd,
    color: colors.gray[700],
    position: "absolute",
    right: 15,
  },
  totalContainer: {
    height: 75,
    marginTop: 10,
    backgroundColor: colors.gray[100],
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: colors.gray[200],
  },
  totalText: {
    ...fontFamily.titleSm,
    color: colors.gray[700],
  },
  totalPrice: {
    ...fontFamily.textXs,
    color: colors.gray[600],
    textAlign: "right",
    textDecorationLine: "line-through",
  },
  totalDiscount: {
    ...fontFamily.titleLg,
    color: colors.gray[700],
  },
});
