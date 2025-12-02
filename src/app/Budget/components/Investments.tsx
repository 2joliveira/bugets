import { colors, fontFamily } from "@/theme";
import { Controller, ControllerProps, UseFormSetValue } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { BudgetType, ServiceType } from "..";
import { useEffect, useMemo, useReducer, useState } from "react";
import { formatPrice } from "@/utils/formatPrice";

interface InvestimentsProps {
  control: ControllerProps<BudgetType>["control"];
  services: ServiceType[];
  onChangeValue: UseFormSetValue<BudgetType>;
}

export function Investments({
  services,
  control,
  onChangeValue,
}: InvestimentsProps) {
  const [total, setTotal] = useState(0);
  const [descount, setDescount] = useState(0);
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    const newTotal = services.reduce(
      (acc, service) => acc + service.price * service.quantity,
      0
    );

    const newDiscount = (currentPercentage / 100) * newTotal;

    setTotal(newTotal);
    setDescount(newDiscount);

    onChangeValue("discountValue", newDiscount);
    onChangeValue("budgetPrice", newTotal - newDiscount);
  }, [currentPercentage, services]);

  return (
    <View style={{ gap: 12, marginTop: 20 }}>
      <View style={[styles.infosContainer, { paddingHorizontal: 20 }]}>
        <Text style={styles.text}>Subtotal</Text>

        <View style={styles.subtotalValuesContainer}>
          <Text style={styles.quantity}>{`${services.length} itens`}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currencySymbol}>R$</Text>
            <Text style={styles.priceValue}>{formatPrice(total)}</Text>
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
                value={String(value)}
                onChangeText={(text) => {
                  const onlyNumbers = text.replace(/\D/g, "");
                  const limited = Math.min(Number(onlyNumbers), 100);

                  onChange(Number(limited));
                  setCurrentPercentage(Number(limited));
                }}
              />
            )}
          />

          <Text style={styles.percentage}>%</Text>
        </View>

        {descount > 0 && (
          <View style={styles.priceContainer}>
            <Text
              style={[styles.currencySymbol, { color: colors.danger.base }]}
            >
              - R$
            </Text>
            <Text style={[styles.priceValue, { color: colors.danger.base }]}>
              {formatPrice(descount)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Valor total</Text>

        <View>
          {descount > 0 && (
            <Text style={styles.totalPrice}>{`R$ ${formatPrice(total)}`}</Text>
          )}

          <View style={styles.priceContainer}>
            <Text style={styles.currencySymbol}>R$</Text>
            <Text style={styles.totalDiscount}>
              {formatPrice(total - descount)}
            </Text>
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
