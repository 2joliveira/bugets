import { colors, fontFamily } from "@/theme";
import { formatPrice } from "@/utils/formatPrice";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ServiceInfosProps {
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
}

export function ServiceInfos({
  title,
  subtitle,
  price,
  quantity,
}: ServiceInfosProps) {
  return (
    <View style={styles.container}>
      <View style={styles.descriptions}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.subtitle}>
          {subtitle}
        </Text>
      </View>

      <View style={{ justifyContent: "center", gap: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 5 }}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.price}>{formatPrice(price)}</Text>
        </View>

        <Text style={styles.quantity}>{`Qt: ${quantity}`}</Text>
      </View>

      <TouchableOpacity>
        <AntDesign name="edit" color={colors.purple.base} size={20} />
      </TouchableOpacity>
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
