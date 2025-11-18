import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { colors } from "@/theme";
import { InputCheckBox, InputText } from "@/components";
import { STATUS_OPTIONS } from "../Home";
import { InfosCard, Investments, ServiceInfos } from "./components";

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
  const [selectedStatus, setSelectedStatus] = useState<
    (typeof STATUS_OPTIONS)[number] | null
  >(null);

  return (
    <ScrollView>
      <View style={styles.container}>
        <InfosCard title="Informações gerais" icon="storefront">
          <View style={styles.content}>
            <InputText icon="search" placeholder="Título" />
            <InputText icon="search" placeholder="Cliente" />
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
        </InfosCard>

        <InfosCard title="Investimentos" icon="credit-card">
          <Investments />
        </InfosCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
