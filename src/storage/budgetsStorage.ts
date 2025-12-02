import { BudgetType } from "@/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BUDGET_STORAGE_KEY = "@budgets";

export interface BudgetItem extends BudgetType {
  id: string;
}

export async function getBudgets(): Promise<BudgetItem[]> {
  try {
    const storage = await AsyncStorage.getItem(BUDGET_STORAGE_KEY);

    if (!storage) return [];

    const parsedBudgets = JSON.parse(storage);

    return Array.isArray(parsedBudgets) ? parsedBudgets : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBudget(id: string): Promise<BudgetItem | undefined> {
  try {
    const budgets = await getBudgets();

    const budget = budgets.find((budget) => budget.id === id);

    if (!budget) return undefined;

    return budget;
  } catch (error) {
    console.error(error);
  }
}

export async function createBudget(budget: BudgetItem): Promise<void> {
  try {
    const currentBudgets = await getBudgets();

    const updatedBudgets = [...currentBudgets, budget];

    await AsyncStorage.setItem(
      BUDGET_STORAGE_KEY,
      JSON.stringify(updatedBudgets)
    );
  } catch (error) {
    console.error(error);
  }
}

export async function removeBudget(id: string): Promise<void> {
  try {
    const currentBudgets = await getBudgets();
    const updatedBudgets = currentBudgets.filter((budget) => budget.id !== id);

    await AsyncStorage.setItem(
      BUDGET_STORAGE_KEY,
      JSON.stringify(updatedBudgets)
    );
  } catch (error) {
    console.error(error);
  }
}
