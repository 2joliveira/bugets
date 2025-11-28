import { Button, InputCheckBox, InputRadio } from "@/components";
import { colors, fontFamily } from "@/theme";
import React, { useState } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { STATUS_OPTIONS } from "..";
import { ModalComponent } from "@/components/Modal";

const { height } = Dimensions.get("window");

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ORDER_OPTIONS = {
  most_recent: "Mais recente",
  oldest: "Mais antigo",
  higher_value: "Maior valor",
  lowest_value: "Menor valor",
};

export type OrderOptionKeys = keyof typeof ORDER_OPTIONS;

export type OrderOptionValue = (typeof ORDER_OPTIONS)[OrderOptionKeys];

export function FilterModal({ visible, onClose }: FilterModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<
    (typeof STATUS_OPTIONS)[number] | null
  >(null);

  const [selectedOrder, setSelectedOrder] = useState<OrderOptionValue | null>(
    null
  );

  return (
    <ModalComponent
      visible={visible}
      onClose={onClose}
      title="Filtrar e ordenar"
      proportionalHeight={0.65}
    >
      <View style={styles.content}>
        <Text style={styles.section}>Status</Text>
        <InputCheckBox
          options={STATUS_OPTIONS}
          selectedOption={selectedStatus}
          setOption={setSelectedStatus}
        />

        <Text style={styles.section}>Ordenação</Text>
        <InputRadio
          options={ORDER_OPTIONS}
          selectedOption={selectedOrder}
          setOption={setSelectedOrder}
        />
      </View>

      <View style={styles.footer}>
        <Button variant="secondary" text="Resetar filtros" />

        <Button variant="primary" icon="check" text="Aplicar" />
      </View>
    </ModalComponent>
  );
}

const styles = StyleSheet.create({
  section: {
    ...fontFamily.textXs,
    color: colors.gray[500],
    marginVertical: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderColor: colors.gray[200],
  },
});
