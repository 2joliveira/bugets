import { StyleSheet, View } from "react-native";
import { colors } from "@/theme";
import { Details, InfosCard, ServiceInfos } from "./components";

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

export function BudgetDetails() {
  return (
    <View style={styles.container}>
      <Details />

      <InfosCard title="Serviços inclusos" icon="text-snippet">
        <View style={styles.serviceContent}>
          {serviceMock.map((service) => (
            <ServiceInfos key={`service-${service.title}`} {...service} />
          ))}
        </View>
      </InfosCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: colors.gray[300],
    backgroundColor: colors.white,
    padding: 20,
    gap: 20,
  },
  serviceContent: {
    padding: 20,
    gap: 12,
  },
});
