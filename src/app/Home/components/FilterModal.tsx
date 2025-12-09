import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { colors, fontFamily } from "@/theme";
import {
  Button,
  InputCheckBox,
  InputRadio,
  ModalComponent,
  StatusTag,
} from "@/components";
import { ORDER_OPTIONS, STATUS_OPTIONS } from "@/types";
import { useBudgets } from "@/context/BudgetContext";
import { filtersSchema, FiltersType } from "@/domain/filters.schema";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export function FilterModal({ visible, onClose }: FilterModalProps) {
  const { onApplyFilters, selectedFilters, onResetFilters } = useBudgets();
  const { control, handleSubmit, reset } = useForm<FiltersType>({
    resolver: zodResolver(filtersSchema),
    defaultValues: selectedFilters ?? {
      search: "",
      order: undefined,
      status: undefined,
    },
  });

  function onHandleSubmit(data: FiltersType) {
    onApplyFilters(data);
    onClose();
  }

  function onHandleReset() {
    reset();
    onResetFilters();
    onClose();
  }

  return (
    <ModalComponent
      visible={visible}
      onClose={onClose}
      title="Filtrar e ordenar"
      proportionalHeight={0.62}
    >
      <View style={styles.content}>
        <Text style={styles.section}>Status</Text>
        <View style={{ gap: 10 }}>
          <Controller
            control={control}
            name="status"
            render={({ field: { value = [], onChange } }) => (
              <>
                {STATUS_OPTIONS.map((option) => (
                  <InputCheckBox<(typeof STATUS_OPTIONS)[number]>
                    key={option}
                    option={option}
                    selectedOption={value}
                    setOption={(clicked) => {
                      if (value.includes(clicked)) {
                        onChange(value.filter((item) => item !== clicked));
                      } else {
                        onChange([...value, clicked]);
                      }
                    }}
                  >
                    <StatusTag status={option} />
                  </InputCheckBox>
                ))}
              </>
            )}
          />
        </View>

        <Text style={styles.section}>Ordenação</Text>

        <View style={{ gap: 10 }}>
          <Controller
            control={control}
            name="order"
            render={({ field: { value, onChange } }) => (
              <>
                {Object.entries(ORDER_OPTIONS).map(([key, option]) => (
                  <InputRadio
                    key={key}
                    selectedOption={value}
                    setOption={onChange}
                    option={key}
                  >
                    <Text style={styles.textOption}>{option}</Text>
                  </InputRadio>
                ))}
              </>
            )}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          variant="secondary"
          text="Resetar filtros"
          onPress={handleSubmit(onHandleReset)}
        />

        <Button
          variant="primary"
          icon="check"
          text="Aplicar"
          onPress={handleSubmit(onHandleSubmit)}
        />
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderColor: colors.gray[200],
  },
  textOption: {
    ...fontFamily.textMd,
    color: colors.gray[600],
  },
});
