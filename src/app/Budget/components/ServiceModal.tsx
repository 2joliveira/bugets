import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Controller,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  useForm,
} from "react-hook-form";
import uuid from "react-native-uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Error, InputText, ModalComponent } from "@/components";
import { colors, fontFamily } from "@/theme";
import { useBudgets } from "@/context/BudgetContext";
import { BudgetType } from "@/domain/budget.schema";
import { serviceSchema, ServiceType } from "@/domain/service.schema";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onAddService?: UseFieldArrayAppend<BudgetType, "services">;
  onUpdateServices?: UseFieldArrayUpdate<BudgetType, "services">;
  onRemoveServices?: UseFieldArrayRemove;
  service?: ServiceType;
  serviceIndex?: number;
}

export function ServiceModal({
  visible,
  onClose,
  onAddService,
  onUpdateServices,
  onRemoveServices,
}: FilterModalProps) {
  const { selectedService } = useBudgets();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: selectedService ?? {
      id: uuid.v4(),
      title: "",
      description: "",
      price: 0,
      quantity: 0,
    },
  });

  function handleAddService(data: ServiceType) {
    if (onAddService) onAddService(data);
    reset();
    onClose();
  }

  function handleCancel() {
    reset();
    onClose();
  }

  function handleUpdateService(data: ServiceType) {
    if (onUpdateServices && typeof selectedService?.index === "number")
      onUpdateServices(selectedService?.index, data);

    onClose();
  }

  function handleRemoveService() {
    if (onRemoveServices && typeof selectedService?.index === "number")
      onRemoveServices(selectedService?.index);

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
                  onChangeText={(text) =>
                    onChange(Number(text.replace(/\D/g, "")))
                  }
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
          {selectedService ? (
            <Button
              variant="destructive"
              icon="delete-outline"
              onPress={handleRemoveService}
            />
          ) : (
            <Button
              variant="secondary"
              text="Cancelar"
              onPress={handleCancel}
            />
          )}

          <Button
            variant="primary"
            icon="check"
            text={selectedService ? "Editar" : "Salvar"}
            onPress={
              selectedService
                ? handleSubmit(handleUpdateService)
                : handleSubmit(handleAddService)
            }
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
