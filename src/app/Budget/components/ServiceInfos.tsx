import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UseFieldArrayRemove, UseFieldArrayUpdate } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import { formatPrice } from "@/utils/formatPrice";
import { colors, fontFamily } from "@/theme";
import { ServiceModal } from "./ServiceModal";
import { BudgetType, ServiceType } from "..";

interface ServiceInfosProps {
  service: ServiceType;
  index: number;
  onUpdateServices: UseFieldArrayUpdate<BudgetType, "services">;
  onRemoveServices: UseFieldArrayRemove;
}

export function ServiceInfos({
  service,
  index,
  onRemoveServices,
  onUpdateServices,
}: ServiceInfosProps) {
  const { title, description, price, quantity } = service;
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.descriptions}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>
          {description}
        </Text>
      </View>

      <View style={{ justifyContent: "center", gap: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 5 }}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.price}>{formatPrice(Number(price))}</Text>
        </View>

        <Text style={styles.quantity}>{`Qt: ${quantity}`}</Text>
      </View>

      <TouchableOpacity onPress={() => setIsOpenModal(true)}>
        <AntDesign name="edit" color={colors.purple.base} size={20} />
      </TouchableOpacity>

      {isOpenModal && (
        <ServiceModal
          visible={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          service={service}
          serviceIndex={index}
          onUpdateServices={onUpdateServices}
          onRemoveServices={onRemoveServices}
        />
      )}
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
  description: {
    ...fontFamily.textXs,
    color: colors.gray[500],
    width: 175,
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
