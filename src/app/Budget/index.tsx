import { useState } from "react";
import { StyleSheet, View, ScrollView, Image, Text } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import uuid from "react-native-uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackRoutesList } from "@/routes/StackRoutes";
import { useBudgets } from "@/context/BudgetContext";
import { colors, fontFamily } from "@/theme";
import { Button, InputRadio, InputText, StatusTag } from "@/components";
import {
  InfosCard,
  Investments,
  ServiceInfos,
  ServiceModal,
} from "./components";
import { budgetSchema, BudgetType } from "@/domain/budget.schema";
import { STATUS_OPTIONS } from "@/types";

export function Budget() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { onAddBudget, onUpdateBudget, selectedBudget } = useBudgets();
  const { name } = useRoute();

  const navigation =
    useNavigation<NativeStackNavigationProp<StackRoutesList, "budget">>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<BudgetType>({
    resolver: zodResolver(budgetSchema),
    defaultValues: selectedBudget
      ? {
          ...selectedBudget,
          createdAt: new Date(selectedBudget.createdAt),
          updatedAt: new Date(),
        }
      : {
          id: uuid.v4(),
          client: "",
          title: "",
          services: [],
          status: undefined,
          percentageDiscount: 0,
          descountValue: 0,
          budgetPrice: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "services",
  });

  function onSubmit(data: BudgetType) {
    if (selectedBudget) {
      onUpdateBudget(data);

      navigation.goBack();
    } else {
      onAddBudget(data);

      reset();
      navigation.navigate("home");
    }
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
                  <View
                    style={[
                      name === "budget" && {
                        height: 80,
                        gap: 10,
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-around",
                      },
                    ]}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <InputRadio
                        key={option}
                        option={option}
                        selectedOption={value}
                        setOption={onChange}
                      >
                        <StatusTag status={option} />
                      </InputRadio>
                    ))}
                  </View>
                )}
              />
            </View>
          </InfosCard>

          <InfosCard
            title="Serviços inclusos"
            icon="text-snippet"
            error={errors.services?.message}
          >
            <View style={styles.content}>
              {!fields.length && (
                <View>
                  <Image
                    source={require("../../assets/no-results.jpg")}
                    style={{ width: "100%", height: 100 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      ...fontFamily.textXs,
                      color: colors.gray[500],
                    }}
                  >
                    Adicione um serviço
                  </Text>
                </View>
              )}

              {fields.map((service, index) => (
                <ServiceInfos
                  key={service.id}
                  index={index}
                  service={service}
                  setIsOpenModal={setIsOpenModal}
                />
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
            <Investments
              control={control}
              services={getValues("services")}
              onChangeValue={setValue}
            />
          </InfosCard>
        </View>

        <View style={styles.footer}>
          <Button
            variant="secondary"
            text="Cancelar"
            onPress={() => navigation.goBack()}
          />
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
          onUpdateServices={update}
          onRemoveServices={remove}
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
