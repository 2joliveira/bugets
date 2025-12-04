import { StyleSheet, View } from "react-native";
import { StackRoutesProps } from "@/routes/StackRoutes";
import { useBudgets } from "@/context/BudgetContext";
import { colors } from "@/theme";
import { Button } from "@/components";
import { Details, InfosCard, ServiceInfos, Total } from "./components";

export function BudgetDetails({
  navigation,
  route,
}: StackRoutesProps<"budgetDetails">) {
  const { onDeleteBudget, selectedBudget, onDuplicateBudget } = useBudgets();
  const { id } = route.params;

  function handleDeleteBudget() {
    onDeleteBudget(id);
    navigation.goBack();
  }

  function handleEditBudget() {
    navigation.navigate("budget");
  }

  function handleDuplicateBudget() {
    onDuplicateBudget(selectedBudget!);
    navigation.goBack();
  }

  if (!selectedBudget) return;

  const {
    client,
    title,
    createdAt,
    updatedAt,
    services,
    budgetPrice,
    descountValue,
    percentageDiscount,
  } = selectedBudget;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Details
          client={client}
          title={title}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />

        <InfosCard title="Serviços inclusos" icon="text-snippet">
          <View style={styles.serviceContent}>
            {services.map((service) => (
              <ServiceInfos key={service.id} {...service} />
            ))}
          </View>
        </InfosCard>

        <Total
          budgetPrice={budgetPrice}
          descountValue={descountValue}
          percentageDiscount={percentageDiscount}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.buttons}>
          <Button
            variant="destructive"
            icon="delete-outline"
            onPress={handleDeleteBudget}
          />
          <Button
            variant="secondary"
            icon="content-copy"
            onPress={handleDuplicateBudget}
          />
          <Button variant="secondary" icon="edit" onPress={handleEditBudget} />
        </View>

        <Button variant="primary" icon="send" text="Compartilhar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
  content: {
    padding: 20,
    gap: 20,
  },
  serviceContent: {
    padding: 20,
    gap: 12,
  },
  footer: {
    height: 110,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: colors.gray[200],
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
