import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Controller, UseFieldArrayAppend, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Error, InputText, ModalComponent } from "@/components";
import { colors, fontFamily } from "@/theme";
import { BudgetType, serviceSchema, ServiceType } from "..";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onAddService: UseFieldArrayAppend<BudgetType, "services">;
}

export function ServiceModal({
  visible,
  onClose,
  onAddService,
}: FilterModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      quantity: 0,
    },
  });

  function handleAddService(data: any) {
    onAddService(data);
    reset();
    onClose();
  }

  return (
    <ModalComponent
      visible={visible}
      onClose={onClose}
      title="Serviço"
      proportionalHeight={0.5}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.modalContent}>
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange } }) => (
              <InputText
                placeholder="Título"
                value={value}
                onChangeText={onChange}
                error={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <InputText
                placeholder="Descrição"
                multiline
                numberOfLines={10}
                style={{
                  minHeight: 120,
                  borderRadius: 20,
                  alignItems: "flex-start",
                }}
                value={value}
                onChangeText={onChange}
                error={errors.description?.message}
              />
            )}
          />

          <View style={styles.priceQuantityContainer}>
            <Controller
              control={control}
              name="price"
              render={({ field: { value, onChange } }) => (
                <InputText
                  placeholder="Preço"
                  keyboardType="decimal-pad"
                  inputMode="decimal"
                  style={{ width: 250 }}
                  value={String(value)}
                  onChangeText={(text) => onChange(Number(text.replace(/\D/g, "")))}
                  error={errors.price?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="quantity"
              render={({ field: { value, onChange } }) => (
                <View
                  style={[
                    styles.counter,
                    errors.quantity?.message && {
                      borderColor: colors.danger.base,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => onChange(Math.max(1, value - 1))}
                  >
                    <MaterialIcons
                      name="remove"
                      size={20}
                      color={colors.purple.base}
                    />
                  </TouchableOpacity>

                  <Text>{value}</Text>

                  <TouchableOpacity onPress={() => onChange(value + 1)}>
                    <MaterialIcons
                      name="add"
                      size={20}
                      color={colors.purple.base}
                    />
                  </TouchableOpacity>

                  {errors.quantity?.message && (
                    <Error error={errors.quantity?.message} />
                  )}
                </View>
              )}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button variant="destructive" icon="delete-outline" />

          <Button
            variant="primary"
            icon="check"
            text="Salvar"
            onPress={handleSubmit(handleAddService)}
          />
        </View>
      </View>
    </ModalComponent>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    gap: 20,
  },
  priceQuantityContainer: {
    flexDirection: "row",
    gap: 8,
  },
  counter: {
    height: 50,
    width: 112,
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  quantity: {
    ...fontFamily.textMd,
    color: colors.gray[700],
  },
  footer: {
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderColor: colors.gray[200],
  },
});
