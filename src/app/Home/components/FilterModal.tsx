import { Button, InputCheckBox, InputRadio, StatusTag } from "@/components";
import { colors, fontFamily } from "@/theme";
import React, { useState } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { ModalComponent } from "@/components/Modal";
import { ORDER_OPTIONS, STATUS_OPTIONS } from "@/context/BudgetContext";

const { height } = Dimensions.get("window");

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

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
        <View style={{ gap: 10 }}>
          {STATUS_OPTIONS.map((option) => (
            <InputCheckBox
              key={option}
              option={option}
              selectedOption={selectedStatus}
              setOption={setSelectedStatus}
            >
              <StatusTag status={option} />
            </InputCheckBox>
          ))}
        </View>

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
