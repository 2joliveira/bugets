import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputCheckBox, InputText } from "@/components";
import { colors } from "@/theme";
import { STATUS_OPTIONS } from "../Home";
import {
  InfosCard,
  Investments,
  ServiceInfos,
  ServiceModal,
} from "./components";

export const serviceSchema = z.object({
  title: z.string().min(2, "Título do serviço é obrigatório."),
  description: z.string().min(2, "Adicione uma descrição."),
  quantity: z.number().min(1, "informe a quantidade."),
  price: z.string().min(1, "Informe o valor do serviço"),
});

const budgetSchema = z.object({
  client: z.string({ error: "Nome do cliente é obrigatório." }),
  title: z.string({ error: "Título do orçamento é obrigatório." }),
  services: z.array(serviceSchema).min(1, "Adicione ao menos um serviço"),
  status: z.enum(STATUS_OPTIONS, { error: "Status é obrigatório." }),
  percentageDiscount: z.string(),
});

export type ServiceType = z.infer<typeof serviceSchema>;

export type BudgetType = z.infer<typeof budgetSchema>;

export function Budget() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetType>({
    resolver: zodResolver(budgetSchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: "services",
  });

  function onSubmit(data: any) {
    console.log("FORM DATA:", data);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <InfosCard title="Informações gerais" icon="storefront">
            <View style={styles.content}>
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
                name="client"
                render={({ field: { value, onChange } }) => (
                  <InputText
                    placeholder="Cliente"
                    value={value}
                    onChangeText={onChange}
                    error={errors.client?.message}
                  />
                )}
              />
            </View>
          </InfosCard>

          <InfosCard
            title="Status"
            icon="local-offer"
            error={errors.status?.message}
          >
            <View style={styles.content}>
              <Controller
                control={control}
                name="status"
                render={({ field: { value, onChange } }) => (
                  <InputCheckBox
                    options={STATUS_OPTIONS}
                    selectedOption={value}
                    setOption={onChange}
                  />
                )}
              />
            </View>
          </InfosCard>

          <InfosCard title="Serviços inclusos" icon="text-snippet" error={errors.services?.message}>
            <View style={styles.content}>
              {fields.map((service) => (
                <ServiceInfos key={`service-${service.title}`} {...service} />
              ))}
            </View>

            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              <Button
                variant="secondary"
                text="Adicionar serviço"
                icon="add"
                onPress={() => setIsOpenModal(true)}
              />
            </View>
          </InfosCard>

          <InfosCard title="Investimentos" icon="credit-card">
            <Investments control={control} />
          </InfosCard>
        </View>

        <View style={styles.footer}>
          <Button variant="secondary" text="Cancelar" />
          <Button
            variant="primary"
            text="Salvar"
            icon="check"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          height: 25,
          width: "100%",
          backgroundColor: colors.white,
        }}
      />

      {isOpenModal && (
        <ServiceModal
          visible={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          onAddService={append}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.gray[300],
    backgroundColor: colors.white,
    gap: 22,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  footer: {
    height: 100,
    paddingBottom: 20,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderColor: colors.gray[200],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
});
