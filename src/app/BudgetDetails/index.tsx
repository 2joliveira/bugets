import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StackRoutesProps } from "@/routes/StackRoutes";
import { BudgetItem } from "@/storage/budgetsStorage";
import { useBudgets } from "@/context/BudgetContext";
import { colors } from "@/theme";
import { Button } from "@/components";
import { Details, InfosCard, ServiceInfos, Total } from "./components";

export function BudgetDetails({
  navigation,
  route,
}: StackRoutesProps<"budgetDetails">) {
  const [currentBudget, setCurrentBudget] = useState<BudgetItem | undefined>(
    undefined
  );
  const { deleteBudget, getBudgetById } = useBudgets();
  const { id } = route.params;

  function handleDeleteBudget() {
    deleteBudget(id);
    navigation.goBack();
  }

  async function loadBudget() {
    const budget = await getBudgetById(id);

    if (budget) {
      setCurrentBudget(budget);
    }
  }

  useEffect(() => {
    loadBudget();
  }, []);

  if (!currentBudget) return;

  const {
    client,
    title,
    createdAt,
    updatedAt,
    services,
    budgetPrice,
    descountValue,
    percentageDiscount,
  } = currentBudget;

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
          <Button variant="secondary" icon="content-copy" />
          <Button variant="secondary" icon="edit" />
        </View>

        <Button variant="primary" icon="send" text="Compartilhar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: colors.gray[300],
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
