import { BudgetType } from "@/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BUDGET_STORAGE_KEY = "@budgets";

export async function getBudgets(): Promise<BudgetType[]> {
  try {
    const storage = await AsyncStorage.getItem(BUDGET_STORAGE_KEY);

    if (!storage) return [];

    const parsed = JSON.parse(storage);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error reading budgets:", error);
    return [];
  }
}

export async function createBudget(budget: BudgetType): Promise<void> {
  try {
    const existingBudgets = await getBudgets();

    const updatedBudgets = [...existingBudgets, budget];

    await AsyncStorage.setItem(
      BUDGET_STORAGE_KEY,
      JSON.stringify(updatedBudgets)
    );
  } catch (error) {
    console.error("Error creating budget:", error);
  }
}
