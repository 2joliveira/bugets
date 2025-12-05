import AsyncStorage from "@react-native-async-storage/async-storage";
import { BudgetType } from "@/domain/budget.schema";

const BUDGET_STORAGE_KEY = "@budgets";

export async function getBudgets(): Promise<BudgetType[]> {
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

export async function getBudget(id: string): Promise<BudgetType | undefined> {
  try {
    const budgets = await getBudgets();

    const budget = budgets.find((budget) => budget.id === id);

    if (!budget) return undefined;

    return budget;
  } catch (error) {
    console.error(error);
  }
}

export async function createBudget(budget: BudgetType): Promise<void> {
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

export async function updateBudget(budget: BudgetType) {
  try {
    const currentBudgets = await getBudgets();

    if (!currentBudgets) return null;

    const filteredBudgets = currentBudgets.filter(
      (currentBudget) => currentBudget.id !== budget.id
    );

    await AsyncStorage.setItem(
      BUDGET_STORAGE_KEY,
      JSON.stringify([...filteredBudgets, budget])
    );
  } catch (error) {
    console.error(error);
  }
}
