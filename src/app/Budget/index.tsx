import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { colors } from "@/theme";
import { Button, InputCheckBox, InputText } from "@/components";
import { STATUS_OPTIONS } from "../Home";
import { InfosCard, Investments, ServiceInfos, ServiceModal } from "./components";

const serviceMock = [
  {
    title: "Design de interfaces",
    subtitle: "Criação de wireframes e protótipos de alta fidelidade",
    price: 3847.5,
    quantity: 1,
  },
  {
    title: "Implantação e suporte",
    subtitle: "Publicação nas lojas de aplicativos e suporte técnico",
    price: 2200,
    quantity: 1,
  },
];

export function Budget() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState<
    (typeof STATUS_OPTIONS)[number] | null
  >(null);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <InfosCard title="Informações gerais" icon="storefront">
            <View style={styles.content}>
              <InputText placeholder="Título" />
              <InputText placeholder="Cliente" />
            </View>
          </InfosCard>

          <InfosCard title="Status" icon="local-offer">
            <View style={styles.content}>
              <InputCheckBox
                options={STATUS_OPTIONS}
                selectedOption={selectedStatus}
                setOption={setSelectedStatus}
              />
            </View>
          </InfosCard>

          <InfosCard title="Serviços inclusos" icon="text-snippet">
            <View style={styles.content}>
              {serviceMock.map((service) => (
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
            <Investments />
          </InfosCard>
        </View>

        <View style={styles.footer}>
          <Button variant="secondary" text="Cancelar" />
          <Button variant="primary" text="Salvar" icon="check" />
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
    gap: 20,
  },
  content: {
    padding: 20,
    gap: 12,
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
