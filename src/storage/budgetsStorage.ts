import AsyncStorage from "@react-native-async-storage/async-storage";
import { BudgetType } from "@/domain/budget.schema";
import { BudgetStorageType } from "@/types";
import { FiltersType } from "@/domain/filters.schema";

const BUDGET_STORAGE_KEY = "@budgets";

async function getStorage(): Promise<BudgetStorageType | undefined> {
  try {
    const storage = await AsyncStorage.getItem(BUDGET_STORAGE_KEY);

    const parsedStorage = storage ? JSON.parse(storage) : undefined;

    return parsedStorage as BudgetStorageType;
  } catch (error) {
    console.error(error);
  }
}

export async function getBudgets(): Promise<BudgetType[]> {
  try {
    const storage = await getStorage();

    if (!storage?.budgets) return [];

    let acc = [...storage.budgets];

    if (storage?.filters?.status && storage?.filters?.status?.length > 0) {
      acc = acc?.filter?.((budget) =>
        storage.filters.status?.includes(budget.status)
      );
    }

    switch (storage?.filters?.order) {
      case "higher_value":
        return acc.sort?.((a, b) => b.budgetPrice - a.budgetPrice);
      case "lowest_value":
        return acc.sort?.((a, b) => a.budgetPrice - b.budgetPrice);
      case "oldest":
        return acc.sort?.(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return acc.sort?.(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBudget(id: string): Promise<BudgetType | undefined> {
  try {
    const budgets = await getBudgets();

    const budget = budgets?.find((budget: any) => budget.id === id);

    if (!budget) return undefined;

    return budget;
  } catch (error) {
    console.error(error);
  }
}

export async function createBudget(budget: BudgetType): Promise<void> {
  try {
    const storage = await getStorage();

    const updatedBudgets = [...(storage?.budgets ?? []), budget];

    await AsyncStorage.setItem(
      BUDGET_STORAGE_KEY,
      JSON.stringify({
        ...storage,
        budgets: updatedBudgets,
      })
    );
  } catch (error) {
    console.error(error);
  }
}

export async function removeBudget(id: string): Promise<void> {
  try {
    const storage = await getStorage();
    const updatedBudgets = storage?.budgets.filter(
      (budget) => budget.id !== id
    );
    await AsyncStorage.setItem(
      BUDGET_STORAGE_KEY,
      JSON.stringify({
        ...storage,
        budgets: updatedBudgets,
      })
    );
  } catch (error) {
    console.error(error);
  }
}

export async function updateBudget(budget: BudgetType) {
  try {
    const storage = await getStorage();

    if (!storage?.budgets) return null;

    const filteredBudgets = storage.budgets.filter(
      (currentBudget) => currentBudget.id !== budget.id
    );

    await AsyncStorage.setItem(
      BUDGET_STORAGE_KEY,
      JSON.stringify({
        ...storage,
        budgets: [...filteredBudgets, budget],
      })
    );
  } catch (error) {
    console.error(error);
  }
}

export async function setFilters(filters: FiltersType | undefined) {
  try {
    const storage = await getStorage();

    await AsyncStorage.setItem(
      BUDGET_STORAGE_KEY,
      JSON.stringify({
        ...storage,
        filters,
      })
    );
  } catch (error) {
    console.error(error);
  }
}
